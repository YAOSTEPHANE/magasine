import { connectDB } from "@/lib/mongodb";
import { Article } from "@/models/Article";
import { resolveFeaturedImage } from "@/lib/images";

const BROKEN_UNSPLASH_PATTERN =
  /photo-(1509316785289|1524492412937|1574943325722|1611162617474)/;

let repairDone = false;

/** Corrige en base les URLs Unsplash retirées (une fois par instance serveur). */
export async function repairBrokenArticleImagesOnce() {
  if (repairDone) return;
  repairDone = true;

  try {
    await connectDB();
    const articles = await Article.find({
      $or: [
        { featuredImage: BROKEN_UNSPLASH_PATTERN },
        { "gallery.url": BROKEN_UNSPLASH_PATTERN },
      ],
    });

    for (const article of articles) {
      let dirty = false;

      const fixedFeatured = resolveFeaturedImage(article.featuredImage);
      if (fixedFeatured !== article.featuredImage) {
        article.featuredImage = fixedFeatured;
        dirty = true;
      }

      if (article.gallery?.length) {
        for (const item of article.gallery) {
          const fixed = resolveFeaturedImage(item.url);
          if (fixed !== item.url) {
            item.url = fixed;
            dirty = true;
          }
        }
      }

      if (dirty) {
        await article.save();
      }
    }
  } catch (error) {
    console.error("repairBrokenArticleImages:", error);
  }
}
