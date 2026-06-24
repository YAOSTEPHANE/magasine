const CATEGORY_COLORS: Record<string, string> = {
  économie: "var(--amber)",
  economie: "var(--amber)",
  politique: "var(--cms-red)",
  technologie: "var(--blue)",
  sports: "var(--amber)",
  local: "var(--green)",
  investigations: "var(--purple)",
  finance: "var(--green)",
  santé: "var(--t3)",
  sante: "var(--t3)",
};

export function categoryAccent(name: string) {
  const key = name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
  return CATEGORY_COLORS[key] ?? "var(--t2)";
}

export function authorInitials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "—";
  if (parts.length === 1) return parts[0]!.slice(0, 2).toUpperCase();
  return `${parts[0]![0] ?? ""}${parts[parts.length - 1]![0] ?? ""}`.toUpperCase();
}

export function authorAvatarGradient(name: string) {
  const hues = ["#1A3896", "#22C55E", "#C9A227", "#60A5FA", "#8B5CF6", "#EC4899"];
  const code = name.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0);
  const hue = hues[code % hues.length]!;
  return `linear-gradient(135deg, ${hue}, #141829)`;
}

export function formatRelativeFr(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const minutes = Math.floor(diff / 60_000);
  if (minutes < 1) return "À l'instant";
  if (minutes < 60) return `Il y a ${minutes} min`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `Il y a ${hours}h`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `Il y a ${days}j`;
  return new Date(iso).toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

export function formatArticleDate(iso: string) {
  const date = new Date(iso);
  return `${date.toLocaleDateString("fr-FR", { day: "2-digit", month: "2-digit" })} ${date.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })}`;
}

export function CmsStatusBadge({
  status,
  scheduledAt,
}: {
  status: string;
  scheduledAt?: string;
}) {
  if (status === "published") return <span className="badge b-pub">Publié</span>;
  if (status === "review") return <span className="badge b-rev">En révision</span>;
  if (status === "scheduled") {
    const label = scheduledAt
      ? `Planifié — ${new Date(scheduledAt).toLocaleDateString("fr-FR", { day: "2-digit", month: "2-digit" })} ${new Date(scheduledAt).toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })}`
      : "Planifié";
    return <span className="badge b-plan">{label}</span>;
  }
  if (status === "draft") return <span className="badge b-draft">Brouillon</span>;
  if (status === "archived") return <span className="badge b-arch">Archivé</span>;
  return <span className="badge b-draft">{status}</span>;
}
