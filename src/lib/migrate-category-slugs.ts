import { connectDB } from "@/lib/mongodb";
import { Category } from "@/models/Category";
import { LEGACY_CATEGORY_SLUG_MAP } from "@/lib/category-slugs";

let migrationDone = false;

/** Renames legacy French category slugs in MongoDB (idempotent). */
export async function migrateCategorySlugs(): Promise<number> {
  await connectDB();
  let updated = 0;

  for (const [legacySlug, newSlug] of Object.entries(LEGACY_CATEGORY_SLUG_MAP)) {
    const legacy = await Category.findOne({ slug: legacySlug });
    if (!legacy) continue;

    const targetExists = await Category.findOne({ slug: newSlug });
    if (targetExists && String(targetExists._id) !== String(legacy._id)) {
      continue;
    }

    legacy.slug = newSlug;
    await legacy.save();
    updated += 1;
  }

  return updated;
}

export async function migrateCategorySlugsOnce(): Promise<void> {
  if (migrationDone) return;
  migrationDone = true;

  try {
    await migrateCategorySlugs();
  } catch {
    migrationDone = false;
  }
}
