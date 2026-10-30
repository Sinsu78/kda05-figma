import { ChevronRight, ClipboardList, MapPin, Siren, type LucideIcon } from "lucide-react";
import { useState } from "react";
import { BottomSheet } from "../../../../components/ui/bottom-sheet";
import { clinics } from "../../../../data/mock";
import type { TabId } from "../BottomNavigationSection";
import { BreathingCoach } from "./BreathingCoach";

type Tool = {
  icon: LucideIcon;
  badge: string;
  title: string;
  description: string;
  tab: TabId;
  iconClass: string;
};

const tools: Tool[] = [
  {
    icon: MapPin,
    badge: `${clinics.length}곳`,
    title: "내 주변 클리닉",
    description: "보건소 및 지정병원",
    tab: "clinic",
    iconClass: "bg-brand-mint/50 text-brand",
  },
  {
    icon: ClipboardList,
    badge: "2분",
    title: "의존도 자가진단",
    description: "니코틴 의존도 재평가",
    tab: "plan",
    iconClass: "bg-surface-line text-[#3b5bdb]",
  },
];

export const CessationSupportToolsSection = ({
  goTo,
}: {
  goTo: (tab: TabId) => void;
}): JSX.Element => {
  const [sosOpen, setSosOpen] = useState(false);

  return (
    <section className="flex flex-col gap-2.5" aria-labelledby="tools-title">
      <header className="flex items-end justify-between px-1">
        <h2 id="tools-title" className="text-base font-bold">
          금연 집중 솔루션
        </h2>
        <p className="text-[11px] font-medium text-ink-sub">24시간 상시 지원</p>
      </header>

      <button
        type="button"
        onClick={() => setSosOpen(true)}
        className="group relative flex w-full items-center gap-4 overflow-hidden rounded-2xl bg-gradient-to-r from-sos to-[#d83a2e] p-4 text-left text-white shadow-lift transition active:scale-[0.98]"
      >
        <span className="relative flex h-12 w-12 shrink-0 items-center justify-center">
          <span aria-hidden className="absolute inset-0 animate-pulse-ring rounded-full bg-white/40" />
          <span className="relative flex h-12 w-12 items-center justify-center rounded-full bg-white/20">
            <Siren className="h-6 w-6" aria-hidden />
          </span>
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-lg font-bold leading-snug">흡연 욕구 긴급 SOS</span>
          <span className="block text-xs text-white/85">3분 호흡 코칭 · 즉시 상담 연결</span>
        </span>
        <ChevronRight className="h-5 w-5 shrink-0 transition group-hover:translate-x-0.5" aria-hidden />
      </button>

      <div className="grid grid-cols-2 gap-2.5">
        {tools.map(({ icon: Icon, ...tool }) => (
          <button
            key={tool.title}
            type="button"
            onClick={() => goTo(tool.tab)}
            className="flex min-h-[120px] flex-col justify-between rounded-2xl bg-white p-4 text-left shadow-card transition hover:-translate-y-0.5 hover:shadow-lift active:scale-[0.98]"
          >
            <span className="flex items-start justify-between">
              <span className={`flex h-10 w-10 items-center justify-center rounded-xl ${tool.iconClass}`}>
                <Icon className="h-5 w-5" aria-hidden />
              </span>
              <span className="rounded-full bg-surface-soft px-2 py-0.5 text-[11px] font-semibold text-ink-sub">
                {tool.badge}
              </span>
            </span>
            <span>
              <span className="block text-[15px] font-bold">{tool.title}</span>
              <span className="block text-[11px] text-ink-sub">{tool.description}</span>
            </span>
          </button>
        ))}
      </div>

      <BottomSheet open={sosOpen} onClose={() => setSosOpen(false)} title="3분 호흡 코칭">
        <BreathingCoach />
      </BottomSheet>
    </section>
  );
};
