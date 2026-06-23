import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getAllAuthors } from "@/lib/data";

export const metadata: Metadata = {
  title: "Notre équipe",
  description: "Les journalistes, correspondants et chroniqueurs de Global South Watch.",
};

export default async function EquipePage() {
  const authors = await getAllAuthors();

  return (
    <div className="max-w-[1320px] mx-auto px-4 lg:px-6 py-16">
      <div className="text-center mb-14">
        <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-gold">Rédaction</span>
        <h1 className="font-serif text-4xl font-bold text-charcoal mt-2 mb-4">Notre équipe</h1>
        <p className="text-muted max-w-2xl mx-auto">
          Des journalistes passionnés, ancrés sur le terrain, au service d&apos;une information
          fiable et engagée pour le Sud global.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {authors.map((author) => (
          <Link
            key={author._id}
            href={`/auteur/${author.slug}`}
            className="group bg-surface border border-border rounded-sm p-6 hover:shadow-card transition-all"
          >
            <div className="relative w-20 h-20 rounded-full overflow-hidden mb-4 bg-gold-light">
              {author.avatar && (
                <Image
                  src={author.avatar}
                  alt={author.name}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              )}
            </div>
            <h2 className="font-serif text-xl font-bold text-charcoal group-hover:text-accent transition-colors">
              {author.name}
            </h2>
            {author.bio && (
              <p className="text-sm text-muted mt-2 line-clamp-3 leading-relaxed">{author.bio}</p>
            )}
            <span className="inline-block mt-4 text-xs font-bold tracking-wider uppercase text-accent">
              Voir les articles →
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
