import { connectDB } from "@/lib/mongodb";
import { Article } from "@/models/Article";
import { Category } from "@/models/Category";

const WORLD_SLUGS = ["world", "monde"] as const;

const FEATURE_DEFAULTS = {
  name: "Feature",
  slug: "feature",
  color: "#F77F00",
  order: 7,
  description: "International affairs from the Global South",
  isActive: true,
};

let migrationDone = false;

/**
 * Replaces World/Monde with Feature: rename in place when alone, merge articles otherwise.
 * Does not retire or hide content — articles stay published under Feature.
 */
export async function migrateWorldToFeature(): Promise<void> {
  if (migrationDone) return;
  migrationDone = true;

  try {
    await connectDB();

    let feature = await Category.findOne({ slug: "feature" });

    for (const legacySlug of WORLD_SLUGS) {
      const legacy = await Category.findOne({ slug: legacySlug });
      if (!legacy) continue;

      if (!feature) {
        legacy.slug = FEATURE_DEFAULTS.slug;
        legacy.name = FEATURE_DEFAULTS.name;
        legacy.isActive = true;
        if (!legacy.description) legacy.description = FEATURE_DEFAULTS.description;
        if (!legacy.color) legacy.color = FEATURE_DEFAULTS.color;
        await legacy.save();
        feature = legacy;
        continue;
      }

      if (String(legacy._id) === String(feature._id)) continue;

      await Article.updateMany(
        { category: legacy._id },
        { $set: { category: feature._id } }
      );

      await Category.deleteOne({ _id: legacy._id });
    }

    if (!feature) {
      await Category.create(FEATURE_DEFAULTS);
      return;
    }

    feature.name = FEATURE_DEFAULTS.name;
    feature.isActive = true;
    if (!feature.description) feature.description = FEATURE_DEFAULTS.description;
    await feature.save();
  } catch {
    migrationDone = false;
  }
}
