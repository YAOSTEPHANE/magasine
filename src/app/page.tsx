import { getHomePageData } from "@/lib/data";
import { mapHomePageData } from "@/lib/map-home-data";
import { HomeBackdrop } from "@/components/presse-ivoire/HomeBackdrop";
import { HomeMasthead } from "@/components/presse-ivoire/HomeMasthead";
import { HomePulseStrip } from "@/components/presse-ivoire/HomePulseStrip";
import { RevolutionShell } from "@/components/presse-ivoire/RevolutionShell";
import { TrustStrip } from "@/components/presse-ivoire/TrustStrip";
import { UrgentSection } from "@/components/presse-ivoire/UrgentSection";
import { HeroHome } from "@/components/presse-ivoire/HeroHome";
import { MegaAd } from "@/components/presse-ivoire/MegaAd";
import { EditorsChoiceSection } from "@/components/presse-ivoire/EditorsChoiceSection";
import { LatestSection } from "@/components/presse-ivoire/LatestSection";
import { VideoSectionHome } from "@/components/presse-ivoire/VideoSectionHome";
import { HomeInsightsBand } from "@/components/presse-ivoire/HomeInsightsBand";
import { HomeRubriquesBand } from "@/components/presse-ivoire/HomeRubriquesBand";
import { HomeClosingBand } from "@/components/presse-ivoire/HomeClosingBand";

export const revalidate = 60;

export default async function HomePage() {
  const raw = await getHomePageData();
  const data = mapHomePageData(raw);

  return (
    <div className="home-page home-page--revolution">
      <HomeBackdrop />
      <RevolutionShell />

      <header className="home-band home-band--intro">
        <HomeMasthead />
        <HomePulseStrip />
        <TrustStrip />
      </header>

      <UrgentSection data={data.urgent} />

      <section className="home-band home-band--hero">
        <HeroHome data={data} />
      </section>

      <section className="home-band home-band--ad">
        <MegaAd />
      </section>

      <section className="home-band home-band--editorial">
        <EditorsChoiceSection data={data.editorsChoice} />
      </section>

      <section className="home-band home-band--live">
        <LatestSection data={data.latest} />
      </section>

      <section className="home-band home-band--media">
        <VideoSectionHome data={data.videos} />
      </section>

      <HomeInsightsBand opinions={data.opinions} thematic={data.thematic} />

      <HomeRubriquesBand rubriques={data.rubriques} />

      <HomeClosingBand />
    </div>
  );
}
