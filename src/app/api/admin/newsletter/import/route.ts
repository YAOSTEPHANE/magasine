import { NextRequest, NextResponse } from "next/server";
import { requireAdminApi } from "@/lib/admin-api";
import { connectDB } from "@/lib/mongodb";
import { importMailchimpSubscribers } from "@/lib/newsletter-mailchimp-import";

const MAX_FILE_BYTES = 5 * 1024 * 1024;

export async function POST(request: NextRequest) {
  const guard = await requireAdminApi("editorial");
  if (guard.error) return guard.error;

  let csvText: string;

  try {
    const contentType = request.headers.get("content-type") ?? "";

    if (contentType.includes("multipart/form-data")) {
      const form = await request.formData();
      const file = form.get("file");

      if (!(file instanceof File)) {
        return NextResponse.json({ error: "Upload a Mailchimp CSV export (field: file)." }, { status: 400 });
      }

      if (file.size > MAX_FILE_BYTES) {
        return NextResponse.json({ error: "CSV file is too large (max 5 MB)." }, { status: 400 });
      }

      csvText = await file.text();
    } else {
      const body = (await request.json()) as { csv?: string };
      if (!body.csv?.trim()) {
        return NextResponse.json({ error: "Provide a CSV file or JSON body { csv }." }, { status: 400 });
      }
      csvText = body.csv;
    }
  } catch {
    return NextResponse.json({ error: "Unable to read upload." }, { status: 400 });
  }

  try {
    await connectDB();
    const result = await importMailchimpSubscribers(csvText);

    if (result.errors.length > 0 && result.added === 0 && result.updated === 0 && result.reactivated === 0) {
      return NextResponse.json(
        {
          error: result.errors[0] ?? "Import failed.",
          ...result,
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
