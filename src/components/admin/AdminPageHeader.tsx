import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export function AdminPageHeader({
  title,
  backHref = "/admin",
}: {
  title: string;
  backHref?: string;
}) {
  return (
    <div className="bg-charcoal text-white">
      <div className="max-w-7xl mx-auto px-6 py-6 flex items-center gap-4">
        <Link href={backHref} className="text-white/60 hover:text-white transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="font-serif text-xl font-bold">{title}</h1>
      </div>
    </div>
  );
}
