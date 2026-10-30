import { BottomNavigationSection } from "./sections/BottomNavigationSection";
import { CessationProgressSection } from "./sections/CessationProgressSection";
import { CessationRewardsRoadmapSection } from "./sections/CessationRewardsRoadmapSection";
import { CessationSupportToolsSection } from "./sections/CessationSupportToolsSection/CessationSupportToolsSection";
import { HomeHeaderSection } from "./sections/HomeHeaderSection";
import { NearbyCessationClinicsSection } from "./sections/NearbyCessationClinicsSection";
import { RecommendedCessationProgramsSection } from "./sections/RecommendedCessationProgramsSection";
import { SmokingCessationFundingSection } from "./sections/SmokingCessationFundingSection";
import { TobaccoTaxPolicySection } from "./sections/TobaccoTaxPolicySection";

export const Screen = (): JSX.Element => {
  return (
    <div className="flex min-h-screen w-full flex-col bg-[#f8f9ff] text-foreground">
      <header className="w-full shrink-0">
        <HomeHeaderSection />
      </header>
      <main className="flex w-full flex-1 flex-col bg-[#f8f9ff] px-4 pb-24 pt-6">
        <div className="flex w-full flex-col gap-6">
          <SmokingCessationFundingSection />
          <CessationProgressSection />
          <CessationSupportToolsSection />
          <NearbyCessationClinicsSection />
          <RecommendedCessationProgramsSection />
          <CessationRewardsRoadmapSection />
          <TobaccoTaxPolicySection />
        </div>
      </main>
      <nav className="w-full shrink-0" aria-label="Primary navigation">
        <BottomNavigationSection />
      </nav>
    </div>
  );
};
