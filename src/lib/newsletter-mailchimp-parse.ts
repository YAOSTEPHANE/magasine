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
  "adresse electronique",
  "adresse électronique",
  "courriel",
  "mail",
]);

const STATUS_HEADERS = new Set([
  "status",
  "member status",
  "email marketing status",
  "marketing permissions",
  "statut",
  "statut de l'abonnement",
  "statut de labonnement",
  "marketing par e-mail",
  "marketing par email",
  "subscription status",
]);

const OPTIN_HEADERS = new Set([
  "optin_time",
  "opt-in time",
  "optin time",
  "confirm_time",
  "confirm time",
  "subscribe date",
  "date subscribed",
  "date d'inscription",
  "date dinscription",
]);

const TAG_HEADERS = new Set(["tags", "interests", "segment tags", "etiquettes", "étiquettes"]);

const SUBSCRIBED_STATUSES = new Set([
  "subscribed",
  "active",
  "abonne",
  "abonné",
  "abonnee",
  "abonnée",
  "yes",
  "oui",
]);

const INACTIVE_STATUSES = new Set([
  "unsubscribed",
  "cleaned",
  "nonsubscribed",
  "non-subscribed",
  "non subscribed",
  "archived",
  "complained",
  "desabonne",
  "désabonné",
  "desabonnee",
  "désabonnée",
  "non-abonne",
  "non-abonné",
  "non abonne",
  "non abonné",
  "nettoye",
  "nettoyé",
  "archive",
  "archivé",
]);

export interface ParsedSubscriberRow {
  email: string;
  isActive: boolean;
  preferences: NewsletterTopicId[];
  subscribedAt?: Date;
}

function normalizeHeader(value: string): string {
  return value
    .replace(/^\uFEFF/, "")
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, " ");
}

function normalizeStatus(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function detectDelimiter(headerLine: string): "," | ";" | "\t" {
  const commaCount = (headerLine.match(/,/g) ?? []).length;
  const semiCount = (headerLine.match(/;/g) ?? []).length;
  const tabCount = (headerLine.match(/\t/g) ?? []).length;
  if (tabCount > commaCount && tabCount > semiCount) return "\t";
  if (semiCount > commaCount) return ";";
  return ",";
}

export function parseCsvRows(text: string): string[][] {
  const normalized = text.replace(/^\uFEFF/, "").replace(/\r\n/g, "\n").replace(/\r/g, "\n");
  const firstLineEnd = normalized.indexOf("\n");
  const headerLine = firstLineEnd >= 0 ? normalized.slice(0, firstLineEnd) : normalized;
  const delimiter = detectDelimiter(headerLine);
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
    } else if (char === delimiter) {
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

function resolveColumnIndex(headers: string[], candidates: Set<string>): number {
  return headers.findIndex((header) => candidates.has(header));
}

function findEmailColumnIndex(headers: string[]): number {
  const exact = resolveColumnIndex(headers, EMAIL_HEADERS);
  if (exact >= 0) return exact;

  return headers.findIndex((header) => {
    if (!header) return false;
    if (header.includes("email") || header.includes("e-mail") || header.includes("courriel")) {
      return true;
    }
    return header === "mail" || header.endsWith(" mail");
  });
}

export function isZipArchive(text: string): boolean {
  return text.length >= 2 && text.charCodeAt(0) === 0x50 && text.charCodeAt(1) === 0x4b;
}

export function parseMailchimpCsv(csvText: string): {
  rows: ParsedSubscriberRow[];
  invalid: number;
  skipped: number;
  errors: string[];
  detectedHeaders: string[];
} {
  if (isZipArchive(csvText)) {
    return {
      rows: [],
      invalid: 0,
      skipped: 0,
      detectedHeaders: [],
      errors: [
        "This looks like a ZIP file. Unzip the Mailchimp export and upload the subscribed contacts CSV (not the whole archive).",
      ],
    };
  }

  const table = parseCsvRows(csvText);
  if (table.length === 0) {
    return {
      rows: [],
      invalid: 0,
      skipped: 0,
      detectedHeaders: [],
      errors: ["CSV file is empty."],
    };
  }

  const headers = table[0]!.map(normalizeHeader);
  const emailIdx = findEmailColumnIndex(headers);
  if (emailIdx < 0) {
    const preview = headers.filter(Boolean).slice(0, 8).join(", ") || "(none)";
    return {
      rows: [],
      invalid: 0,
      skipped: 0,
      detectedHeaders: headers,
      errors: [
        `Missing email column (found: ${preview}). Use Mailchimp Audience → Export → open the ZIP → upload the subscribed contacts CSV.`,
      ],
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

    const statusRaw = statusIdx >= 0 ? (cells[statusIdx] ?? "").trim() : "";
    const status = statusRaw ? normalizeStatus(statusRaw) : "subscribed";
    const isSubscribed = status === "subscribed" || SUBSCRIBED_STATUSES.has(status);
    const isInactive = INACTIVE_STATUSES.has(status);

    if (statusRaw && !isSubscribed && !isInactive) {
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

  if (rows.length === 0) {
    if (skipped > 0 && errors.length === 0) {
      errors.push(
        `No subscribed contacts found (${skipped} row(s) skipped). In Mailchimp's ZIP export, open the file named like "subscribed_members_*.csv" — not unsubscribed or cleaned.`,
      );
    } else if (invalid > 0 && errors.length === 0) {
      errors.push(`${invalid} row(s) had invalid email addresses.`);
    }
  }

  return { rows, invalid, skipped, errors, detectedHeaders: headers };
}
