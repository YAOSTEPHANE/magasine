import { Newsletter } from "@/models/Newsletter";
import {
  parseMailchimpCsv,
  type ParsedSubscriberRow,
} from "@/lib/newsletter-mailchimp-parse";

export type { ParsedSubscriberRow };
export { parseMailchimpCsv, parseCsvRows, isZipArchive } from "@/lib/newsletter-mailchimp-parse";

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
  detectedHeaders?: string[];
}

export async function importMailchimpSubscribers(
  csvText: string,
  options: MailchimpImportOptions = {}
): Promise<MailchimpImportResult> {
  const { rows, invalid, skipped, errors, detectedHeaders } = parseMailchimpCsv(csvText);

  const result: MailchimpImportResult = {
    added: 0,
    updated: 0,
    reactivated: 0,
    skipped,
    invalid,
    inactiveImported: 0,
    totalRows: rows.length,
    errors: [...errors],
    detectedHeaders,
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
