import { ClipboardCheck, Home, MapPin, UserRound, type LucideIcon } from "lucide-react";
import { cn } from "../../../../lib/utils";

export type TabId = "home" | "plan" | "clinic" | "profile";

const navigationItems: { id: TabId; label: string; icon: LucideIcon }[] = [
  { id: "home", label: "홈", icon: Home },
  { id: "plan", label: "진단·플랜", icon: ClipboardCheck },
  { id: "clinic", label: "클리닉 찾기", icon: MapPin },
  { id: "profile", label: "내 정보", icon: UserRound },
];

type Props = { active: TabId; onChange: (tab: TabId) => void };

export const BottomNavigationSection = ({ active, onChange }: Props): JSX.Element => {
  return (
    <nav
      aria-label="하단 내비게이션"
      className="fixed bottom-0 left-1/2 z-50 w-full max-w-[440px] -translate-x-1/2 border-t border-surface-line/70 bg-card/90 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl"
    >
      <ul className="grid h-16 grid-cols-4">
        {navigationItems.map(({ id, label, icon: Icon }) => {
          const isActive = active === id;
          return (
            <li key={id}>
              <button
                type="button"
                aria-current={isActive ? "page" : undefined}
                onClick={() => onChange(id)}
                className={cn(
                  "flex h-full w-full flex-col items-center justify-center gap-1 text-[11px] font-medium transition-colors",
                  isActive ? "text-brand" : "text-ink-sub hover:text-ink",
                )}
              >
                <span
                  className={cn(
                    "flex h-7 w-12 items-center justify-center rounded-full transition-colors",
                    isActive && "bg-brand-mint/40",
                  )}
                >
                  <Icon className="h-5 w-5" strokeWidth={isActive ? 2.4 : 2} aria-hidden />
                </span>
                {label}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
