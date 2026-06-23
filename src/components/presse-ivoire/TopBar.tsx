import { TICKER_ITEMS } from "@/data/presse-ivoire-home";
import { format } from "date-fns";
import { enUS } from "date-fns/locale";
import { SocialLinks } from "@/components/ui/SocialIcons";

interface TopBarProps {
  alerts?: { text: string; link?: string }[];
}

export function TopBar({ alerts }: TopBarProps) {
  const items = alerts?.length
    ? alerts.map((a) => a.text)
    : TICKER_ITEMS;

  const doubled = [...items, ...items];
  const today = format(new Date(), "EEEE, MMMM d, yyyy", { locale: enUS });
  const formattedDate = today.charAt(0).toUpperCase() + today.slice(1);

  return (
    <div className="top-bar">
      <div className="top-bar-inner container">
        <div className="top-bar-label">
          <span className="breaking-dot" />
          Live
        </div>
        <div className="ticker-wrap">
          <div className="ticker-track">
            {doubled.map((text, i) => (
              <span key={`${text}-${i}`} className="ticker-item">
                <span className="ticker-dot" />
                {text}
              </span>
            ))}
          </div>
        </div>
        <SocialLinks
          variant="topbar"
          networks={["facebook", "twitter", "instagram", "youtube"]}
          iconClassName="w-3.5 h-3.5"
        />
        <div className="top-bar-date">{formattedDate}</div>
      </div>
    </div>
  );
}
