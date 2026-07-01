import { Newsletter } from "@/models/Newsletter";
import {
  DEFAULT_NEWSLETTER_TOPICS,
  NEWSLETTER_TOPICS,
  type NewsletterTopicId,
} from "@/lib/newsletter-topics";

const TOPIC_IDS = new Set<string>(NEWSLETTER_TOPICS.map((t) => t.id));

const EMAIL_HEADERS = new Set([
  "email",
  "email address",
  "e-mail",
  "e-mail address",
  "adresse e-mail",
  "adresse email",
]);

const STATUS_HEADERS = new Set(["status", "member status", "email marketing status"]);

const OPTIN_HEADERS = new Set([
  "optin_time",
  "opt-in time",
  "optin time",
  "confirm_time",
  "confirm time",
  "subscribe date",
  "date subscribed",
]);

const TAG_HEADERS = new Set(["tags", "interests", "segment tags"]);

const SUBSCRIBED_STATUSES = new Set(["subscribed", "active"]);

const INACTIVE_STATUSES = new Set([
  "unsubscribed",
  "cleaned",
  "nonsubscribed",
  "archived",
  "complained",
]);

export interface MailchimpImportOptions {
  /** Import rows marked unsubscribed/cleaned as inactive (default: skip them). */
  includeInactive?: boolean;
}

export interface MailchimpImportResult {
  added: number;
  updated: number;
  reactivated: number;
  skipped: number;
  invalid: number;
  inactiveImported: number;
  totalRows: number;
  errors: string[];
}

function normalizeHeader(value: string): string {
  return value
    .replace(/^\uFEFF/, "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ");
}

function parseCsvRows(text: string): string[][] {
  const normalized = text.replace(/^\uFEFF/, "").replace(/\r\n/g, "\n").replace(/\r/g, "\n");
  const rows: string[][] = [];
  let row: string[] = [];
  let field = "";
  let inQuotes = false;

  for (let i = 0; i < normalized.length; i += 1) {
    const char = normalized[i];
    const next = normalized[i + 1];

    if (inQuotes) {
      if (char === '"' && next === '"') {
        field += '"';
        i += 1;
      } else if (char === '"') {
        inQuotes = false;
      } else {
        field += char;
      }
      continue;
    }

    if (char === '"') {
      inQuotes = true;
    } else if (char === ",") {
      row.push(field);
      field = "";
    } else if (char === "\n") {
      row.push(field);
      if (row.some((cell) => cell.trim() !== "")) {
        rows.push(row);
      }
      row = [];
      field = "";
    } else {
      field += char;
    }
  }

  if (field.length > 0 || row.length > 0) {
    row.push(field);
    if (row.some((cell) => cell.trim() !== "")) {
      rows.push(row);
    }
  }

  return rows;
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function slugifyTag(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function mapTagsToPreferences(raw: string | undefined): NewsletterTopicId[] {
  if (!raw?.trim()) {
    return [...DEFAULT_NEWSLETTER_TOPICS];
  }

  const parts = raw.split(/[,;|]/).map((part) => part.trim()).filter(Boolean);
  const prefs = new Set<NewsletterTopicId>();

  for (const part of parts) {
    const slug = slugifyTag(part);
    if (TOPIC_IDS.has(slug)) {
      prefs.add(slug as NewsletterTopicId);
    }
  }

  return prefs.size > 0 ? [...prefs] : [...DEFAULT_NEWSLETTER_TOPICS];
}

function parseMailchimpDate(value: string | undefined): Date | undefined {
  if (!value?.trim()) return undefined;
  const parsed = new Date(value.trim());
  return Number.isNaN(parsed.getTime()) ? undefined : parsed;
}

interface ParsedSubscriberRow {
  email: string;
  isActive: boolean;
  preferences: NewsletterTopicId[];
  subscribedAt?: Date;
}

function resolveColumnIndex(headers: string[], candidates: Set<string>): number {
  return headers.findIndex((header) => candidates.has(header));
}

export function parseMailchimpCsv(csvText: string): {
  rows: ParsedSubscriberRow[];
  invalid: number;
  skipped: number;
  errors: string[];
} {
  const table = parseCsvRows(csvText);
  if (table.length === 0) {
    return { rows: [], invalid: 0, skipped: 0, errors: ["CSV file is empty."] };
  }

  const headers = table[0]!.map(normalizeHeader);
  const emailIdx = resolveColumnIndex(headers, EMAIL_HEADERS);
  if (emailIdx < 0) {
    return {
      rows: [],
      invalid: 0,
      skipped: 0,
      errors: ['Missing email column. Mailchimp exports use "Email Address".'],
    };
  }

  const statusIdx = resolveColumnIndex(headers, STATUS_HEADERS);
  const optinIdx = resolveColumnIndex(headers, OPTIN_HEADERS);
  const tagsIdx = resolveColumnIndex(headers, TAG_HEADERS);

  const rows: ParsedSubscriberRow[] = [];
  let invalid = 0;
  let skipped = 0;
  const errors: string[] = [];

  for (let line = 1; line < table.length; line += 1) {
    const cells = table[line]!;
    const rawEmail = (cells[emailIdx] ?? "").trim().toLowerCase();
    if (!rawEmail) {
      skipped += 1;
      continue;
    }

    if (!isValidEmail(rawEmail)) {
      invalid += 1;
      if (errors.length < 5) {
        errors.push(`Line ${line + 1}: invalid email "${rawEmail}"`);
      }
      continue;
    }

    const status = statusIdx >= 0 ? (cells[statusIdx] ?? "").trim().toLowerCase() : "subscribed";
    const isSubscribed = status === "" || SUBSCRIBED_STATUSES.has(status);
    const isInactive = INACTIVE_STATUSES.has(status);

    if (!isSubscribed && !isInactive) {
      skipped += 1;
      continue;
    }

    if (isInactive) {
      skipped += 1;
      continue;
    }

    const preferences = mapTagsToPreferences(tagsIdx >= 0 ? cells[tagsIdx] : undefined);
    const subscribedAt = parseMailchimpDate(optinIdx >= 0 ? cells[optinIdx] : undefined);

    rows.push({
      email: rawEmail,
      isActive: true,
      preferences,
      subscribedAt,
    });
  }

  return { rows, invalid, skipped, errors };
}

export async function importMailchimpSubscribers(
  csvText: string,
  options: MailchimpImportOptions = {}
): Promise<MailchimpImportResult> {
  const { rows, invalid, skipped, errors } = parseMailchimpCsv(csvText);

  const result: MailchimpImportResult = {
    added: 0,
    updated: 0,
    reactivated: 0,
    skipped,
    invalid,
    inactiveImported: 0,
    totalRows: rows.length,
    errors: [...errors],
  };

  if (rows.length === 0) {
    return result;
  }

  const emails = rows.map((row) => row.email);
  const existingDocs = await Newsletter.find({ email: { $in: emails } }).lean();
  const existingByEmail = new Map(existingDocs.map((doc) => [doc.email, doc]));

  for (const row of rows) {
    const existing = existingByEmail.get(row.email);

    if (!existing) {
      await Newsletter.create({
        email: row.email,
        preferences: row.preferences,
        isActive: row.isActive,
        subscribedAt: row.subscribedAt ?? new Date(),
      });
      result.added += 1;
      continue;
    }

    const wasInactive = !existing.isActive;
    const update: Record<string, unknown> = {
      isActive: row.isActive,
      preferences: row.preferences,
    };
    if (row.subscribedAt && !existing.subscribedAt) {
      update.subscribedAt = row.subscribedAt;
    }

    await Newsletter.updateOne({ _id: existing._id }, { $set: update });

    if (wasInactive && row.isActive) {
      result.reactivated += 1;
    } else {
      result.updated += 1;
    }
  }

  if (options.includeInactive) {
    // Reserved for a future option; inactive rows are skipped in parseMailchimpCsv today.
  }

  return result;
}
