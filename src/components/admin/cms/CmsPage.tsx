import { cn } from "@/lib/utils";

interface CmsPageProps {
  children: React.ReactNode;
  className?: string;
}

/** Conteneur standard des vues CMS (équivalent `.view.on` de la maquette HTML). */
export function CmsPage({ children, className }: CmsPageProps) {
  return (
    <div className={cn("view on", className)}>
      <div className="cms-page-inner">{children}</div>
    </div>
  );
}
