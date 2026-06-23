import Link from "next/link";
import type { ReactNode } from "react";

interface AdminPageTitleProps {
  title: string;
  description?: string;
  actions?: ReactNode;
  backHref?: string;
}

export function AdminPageTitle({ title, description, actions, backHref }: AdminPageTitleProps) {
  return (
    <header className="admin-page-header">
      <div className="admin-page-header-inner">
        <div>
          {backHref && (
            <Link href={backHref} className="admin-page-back">
              ← Back
            </Link>
          )}
          <h1 className="admin-page-title">{title}</h1>
          {description && <p className="admin-page-desc">{description}</p>}
        </div>
        {actions && <div className="admin-page-actions">{actions}</div>}
      </div>
    </header>
  );
}
