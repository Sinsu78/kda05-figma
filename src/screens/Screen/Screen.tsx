import { useEffect, useState } from "react";
import { ClinicTab } from "../tabs/ClinicTab";
import { PlanTab } from "../tabs/PlanTab";
import { ProfileTab } from "../tabs/ProfileTab";
import { BottomNavigationSection, type TabId } from "./sections/BottomNavigationSection";
import { CessationProgressSection } from "./sections/CessationProgressSection";
import { CessationRewardsRoadmapSection } from "./sections/CessationRewardsRoadmapSection";
import { CessationSupportToolsSection } from "./sections/CessationSupportToolsSection/CessationSupportToolsSection";
import { HomeHeaderSection } from "./sections/HomeHeaderSection";
import { NearbyCessationClinicsSection } from "./sections/NearbyCessationClinicsSection";
import { RecommendedCessationProgramsSection } from "./sections/RecommendedCessationProgramsSection";
import { SmokingCessationFundingSection } from "./sections/SmokingCessationFundingSection";
import { TobaccoTaxPolicySection } from "./sections/TobaccoTaxPolicySection";

const TAB_TITLES: Record<TabId, string> = {
  home: "홈",
  plan: "진단·플랜",
  clinic: "클리닉 찾기",
  profile: "내 정보",
};

/** 섹션이 순서대로 떠오르도록 지연을 주는 래퍼 */
const Reveal = ({ index, children }: { index: number; children: React.ReactNode }) => (
  <div className="animate-fade-up" style={{ animationDelay: `${index * 70}ms` }}>
    {children}
  </div>
);

const HomeTab = ({ goTo }: { goTo: (tab: TabId) => void }) => {
  const sections = [
    <CessationProgressSection key="progress" />,
    <CessationSupportToolsSection key="tools" goTo={goTo} />,
    <CessationRewardsRoadmapSection key="roadmap" />,
    <NearbyCessationClinicsSection key="clinics" goTo={goTo} />,
    <RecommendedCessationProgramsSection key="programs" />,
    <SmokingCessationFundingSection key="funding" />,
    <TobaccoTaxPolicySection key="policy" />,
  ];
  return (
    <div className="flex flex-col gap-5">
      {sections.map((section, i) => (
        <Reveal key={section.key} index={i}>
          {section}
        </Reveal>
      ))}
    </div>
  );
};

export const Screen = (): JSX.Element => {
  const [tab, setTab] = useState<TabId>("home");

  // 탭 전환 시 맨 위로
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [tab]);

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-[440px] flex-col bg-surface sm:shadow-[0_0_60px_rgba(11,28,48,0.08)]">
      <HomeHeaderSection title={TAB_TITLES[tab]} />
      <main key={tab} className="flex-1 px-4 pb-28 pt-4">
        {tab === "home" && <HomeTab goTo={setTab} />}
        {tab === "plan" && <PlanTab />}
        {tab === "clinic" && <ClinicTab />}
        {tab === "profile" && <ProfileTab />}
      </main>
      <BottomNavigationSection active={tab} onChange={setTab} />
    </div>
  );
};
