import { useEffect } from "react";
import { PageStackProvider, type PageRoute } from "./navigation/PageStack";
import { Onboarding } from "./screens/onboarding/Onboarding";
import { DiaryPage } from "./screens/pages/DiaryPage";
import { NotificationsPage } from "./screens/pages/NotificationsPage";
import { ProgramDetailPage, ProgramsPage, RefundsPage } from "./screens/pages/ProgramPages";
import { ReservePage } from "./screens/pages/ReservePage";
import { SettingsPage } from "./screens/pages/SettingsPage";
import { Screen } from "./screens/Screen/Screen";
import { useStore, type Theme } from "./store/AppStore";

const renderPage = (route: PageRoute) => {
  switch (route.type) {
    case "notifications":
      return <NotificationsPage />;
    case "diary":
      return <DiaryPage />;
    case "programs":
      return <ProgramsPage />;
    case "program":
      return <ProgramDetailPage id={route.id} />;
    case "refunds":
      return <RefundsPage />;
    case "settings":
      return <SettingsPage />;
    case "reserve":
      return <ReservePage clinicId={route.clinicId} />;
  }
};

/** 테마 설정(시스템/라이트/다크)을 <html class="dark">로 반영 */
const useApplyTheme = (theme: Theme) => {
  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const apply = () => {
      const dark = theme === "dark" || (theme === "system" && media.matches);
      document.documentElement.classList.toggle("dark", dark);
      document.querySelector('meta[name="theme-color"]')?.setAttribute("content", dark ? "#0c121a" : "#00685f");
    };
    apply();
    media.addEventListener("change", apply);
    return () => media.removeEventListener("change", apply);
  }, [theme]);
};

export const App = () => {
  const { profile, theme } = useStore();
  useApplyTheme(theme);

  if (!profile) {
    return (
      <div className="mx-auto min-h-screen w-full max-w-[440px] sm:shadow-[0_0_60px_rgba(11,28,48,0.08)]">
        <Onboarding />
      </div>
    );
  }

  // 프로필이 생긴 뒤에만 페이지 스택을 둔다 → 초기화 시 열린 페이지도 함께 사라짐
  return (
    <PageStackProvider render={renderPage}>
      <Screen />
    </PageStackProvider>
  );
};
