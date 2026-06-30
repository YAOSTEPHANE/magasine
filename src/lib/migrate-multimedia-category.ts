import { connectDB } from "@/lib/mongodb";
import { Category } from "@/models/Category";

let migrationDone = false;

const MULTIMEDIA_CATEGORY = {
  name: "Multimedia",
  slug: "multimedia",
  color: "#1a3896",
  order: 9,
  description: "Video reports, podcasts, and visual storytelling",
};

/** Reactivates the Multimedia category after legacy retirement (idempotent). */
export async function restoreMultimediaCategory(): Promise<void> {
  if (migrationDone) return;
  migrationDone = true;

  try {
    await connectDB();

    const existing = await Category.findOne({ slug: "multimedia" });
    if (!existing) {
      await Category.create({ ...MULTIMEDIA_CATEGORY, isActive: true });
      return;
    }

    existing.isActive = true;
    existing.name = MULTIMEDIA_CATEGORY.name;
    if (!existing.description) {
      existing.description = MULTIMEDIA_CATEGORY.description;
    }
    if (!existing.color) {
      existing.color = MULTIMEDIA_CATEGORY.color;
    }
    await existing.save();
  } catch {
    migrationDone = false;
  }
}
