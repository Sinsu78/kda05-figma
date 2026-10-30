import { useCallback, useEffect, useRef, useState } from "react";
import { PullToRefresh } from "../../components/PullToRefresh";
import { useToast } from "../../components/ui/toast";
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

const TABS: TabId[] = ["home", "plan", "clinic", "profile"];
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
  const toast = useToast();
  const [tab, setTab] = useState<TabId>("home");
  const [refreshKey, setRefreshKey] = useState(0);
  // 탭 이동 방향에 따라 슬라이드 방향을 정한다
  const direction = useRef<"left" | "right">("left");

  const changeTab = useCallback(
    (next: TabId) => {
      if (next === tab) {
        window.scrollTo({ top: 0, behavior: "smooth" }); // 같은 탭을 다시 누르면 맨 위로
        return;
      }
      direction.current = TABS.indexOf(next) > TABS.indexOf(tab) ? "left" : "right";
      setTab(next);
    },
    [tab],
  );

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [tab]);

  const refresh = useCallback(async () => {
    await new Promise((r) => setTimeout(r, 900)); // 실서비스에선 여기서 API 재요청
    setRefreshKey((k) => k + 1); // 홈을 다시 마운트 → 카운트업 애니메이션 재생
    toast("최신 정보로 업데이트했어요", "info");
  }, [toast]);

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-[440px] flex-col bg-surface sm:shadow-[0_0_60px_rgba(11,28,48,0.08)]">
      <HomeHeaderSection title={TAB_TITLES[tab]} />
      <main
        key={tab}
        className={`flex-1 overflow-x-clip px-4 pb-28 pt-4 ${direction.current === "left" ? "animate-tab-left" : "animate-tab-right"}`}
      >
        {tab === "home" && (
          <PullToRefresh onRefresh={refresh}>
            <HomeTab key={refreshKey} goTo={changeTab} />
          </PullToRefresh>
        )}
        {tab === "plan" && <PlanTab />}
        {tab === "clinic" && <ClinicTab />}
        {tab === "profile" && <ProfileTab />}
      </main>
      <BottomNavigationSection active={tab} onChange={changeTab} />
    </div>
  );
};
