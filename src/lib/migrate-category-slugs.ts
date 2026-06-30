import { connectDB } from "@/lib/mongodb";
import { Article } from "@/models/Article";
import { Category } from "@/models/Category";
import { LEGACY_CATEGORY_SLUG_MAP } from "@/lib/category-slugs";

let migrationDone = false;

const CANONICAL_CATEGORY_NAMES: Record<string, string> = {
  feature: "Feature",
  commentary: "Commentary",
  news: "News",
  health: "Health",
  politics: "Politics",
  culture: "Culture",
  "special-reports": "Special Reports",
};

/** Renames legacy category slugs in MongoDB and merges duplicates (idempotent). */
export async function migrateCategorySlugs(): Promise<number> {
  await connectDB();
  let updated = 0;

  for (const [legacySlug, newSlug] of Object.entries(LEGACY_CATEGORY_SLUG_MAP)) {
    if (legacySlug === "world" || legacySlug === "monde") continue;

    const legacy = await Category.findOne({ slug: legacySlug });
    if (!legacy) continue;

    const target = await Category.findOne({ slug: newSlug });
    if (target && String(target._id) !== String(legacy._id)) {
      await Article.updateMany(
        { category: legacy._id },
        { $set: { category: target._id } }
      );
      legacy.isActive = false;
      await legacy.save();
      updated += 1;
      continue;
    }

    legacy.slug = newSlug;
    const canonicalName = CANONICAL_CATEGORY_NAMES[newSlug];
    if (canonicalName) {
      legacy.name = canonicalName;
    }
    await legacy.save();
    updated += 1;
  }

  const feature = await Category.findOne({ slug: "feature" });
  if (feature && feature.name !== "Feature") {
    feature.name = "Feature";
    await feature.save();
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
