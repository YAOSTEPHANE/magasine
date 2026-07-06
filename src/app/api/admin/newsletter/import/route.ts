import { NextRequest, NextResponse } from "next/server";
import { requireAdminApi } from "@/lib/admin-api";
import { connectDB } from "@/lib/mongodb";
import { importMailchimpSubscribers, isZipArchive } from "@/lib/newsletter-mailchimp-import";

const MAX_FILE_BYTES = 5 * 1024 * 1024;

async function readCsvFromRequest(request: NextRequest): Promise<
  | { ok: true; csvText: string }
  | { ok: false; error: string; status: number }
> {
  const contentType = request.headers.get("content-type") ?? "";

  if (contentType.includes("application/json")) {
    try {
      const body = (await request.json()) as { csv?: string };
      if (!body.csv?.trim()) {
        return { ok: false, error: "Provide a CSV file or JSON body { csv }.", status: 400 };
      }
      return { ok: true, csvText: body.csv };
    } catch {
      return { ok: false, error: "Unable to read JSON body.", status: 400 };
    }
  }

  try {
    const form = await request.formData();
    const file = form.get("file");

    if (!(file instanceof File)) {
      return {
        ok: false,
        error: "Upload a Mailchimp CSV export (field: file).",
        status: 400,
      };
    }

    if (file.size > MAX_FILE_BYTES) {
      return { ok: false, error: "CSV file is too large (max 5 MB).", status: 400 };
    }

    const csvText = await file.text();
    if (!csvText.trim()) {
      return { ok: false, error: "The uploaded file is empty.", status: 400 };
    }

    if (file instanceof File && file.name.toLowerCase().endsWith(".zip")) {
      return {
        ok: false,
        error:
          "Upload a CSV file, not the ZIP. In Mailchimp: unzip the export and choose subscribed_members_*.csv.",
        status: 400,
      };
    }

    if (isZipArchive(csvText)) {
      return {
        ok: false,
        error:
          "This is a ZIP archive. Unzip it and upload the subscribed contacts CSV inside.",
        status: 400,
      };
    }

    return { ok: true, csvText };
  } catch (error) {
    console.error("[newsletter/import] read upload failed", error);
    return { ok: false, error: "Unable to read upload.", status: 400 };
  }
}

export async function POST(request: NextRequest) {
  const guard = await requireAdminApi("editorial");
  if (guard.error) return guard.error;

  const payload = await readCsvFromRequest(request);
  if (!payload.ok) {
    return NextResponse.json({ error: payload.error }, { status: payload.status });
  }

  try {
    await connectDB();
    const result = await importMailchimpSubscribers(payload.csvText);

    const nothingChanged =
      result.added === 0 && result.updated === 0 && result.reactivated === 0;

    if (nothingChanged) {
      return NextResponse.json(
        {
          ...result,
          error:
            result.errors[0] ??
            "No contacts imported. Export your Mailchimp audience as CSV with subscribed contacts.",
        },
        { status: 400 }
      );
    }

    return NextResponse.json({
      message: `Import complete: ${result.added} added, ${result.updated} updated, ${result.reactivated} reactivated.`,
      ...result,
    });
  } catch (error) {
    console.error("[newsletter] mailchimp import failed", error);
    return NextResponse.json({ error: "Import failed." }, { status: 500 });
  }
}
