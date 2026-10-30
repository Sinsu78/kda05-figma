import { Bell, ChevronRight, FileText, HeadphonesIcon, Settings, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { useToast } from "../../components/ui/toast";
import { QUITLINE, stats, user } from "../../data/mock";
import { cn } from "../../lib/utils";

const menu = [
  { icon: FileText, label: "금연 일지" },
  { icon: ShieldCheck, label: "지원금·환급 내역" },
  { icon: HeadphonesIcon, label: `상담전화 ${QUITLINE}` },
  { icon: Settings, label: "설정" },
];

export const ProfileTab = () => {
  const toast = useToast();
  const [notify, setNotify] = useState(true);

  return (
    <div className="flex animate-fade-up flex-col gap-4">
      <section className="flex items-center gap-4 rounded-3xl bg-white p-5 shadow-card">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-brand-mint to-brand text-xl font-bold text-white">
          {user.name.slice(0, 1)}
        </span>
        <div>
          <p className="text-lg font-bold">{user.name} 님</p>
          <p className="text-xs text-ink-sub">금연 {stats.quitDays}일차 · 하루 {user.cigarettesPerDay}개비 → 0개비</p>
        </div>
      </section>

      <section className="grid grid-cols-3 gap-2 rounded-3xl bg-white p-4 text-center shadow-card">
        {[
          { label: "참은 담배", value: `${(stats.quitDays * user.cigarettesPerDay).toLocaleString()}개비` },
          { label: "절약 금액", value: `${(stats.savedMoney / 10000).toFixed(1)}만원` },
          { label: "SOS 사용", value: "3회" },
        ].map((s) => (
          <div key={s.label}>
            <p className="tabular text-base font-extrabold text-brand">{s.value}</p>
            <p className="text-[11px] text-ink-sub">{s.label}</p>
          </div>
        ))}
      </section>

      <section className="overflow-hidden rounded-3xl bg-white shadow-card">
        <div className="flex items-center gap-3 p-4">
          <Bell className="h-5 w-5 text-ink-sub" aria-hidden />
          <span id="notify-label" className="flex-1 text-sm font-semibold">
            매일 금연 인증 알림
          </span>
          <button
            type="button"
            role="switch"
            aria-checked={notify}
            aria-labelledby="notify-label"
            onClick={() => {
              setNotify((n) => !n);
              toast(notify ? "알림을 껐어요" : "매일 저녁 9시에 알려드릴게요", "info");
            }}
            className={cn("relative h-7 w-12 rounded-full transition-colors", notify ? "bg-brand" : "bg-surface-line")}
          >
            <span className={cn("absolute top-1 h-5 w-5 rounded-full bg-white shadow transition-all", notify ? "left-6" : "left-1")} />
          </button>
        </div>
        {menu.map(({ icon: Icon, label }) => (
          <button
            key={label}
            type="button"
            onClick={() => toast(`${label} 화면은 준비 중이에요`, "info")}
            className="flex w-full items-center gap-3 border-t border-surface-soft p-4 text-left text-sm font-semibold transition hover:bg-surface-soft"
          >
            <Icon className="h-5 w-5 text-ink-sub" aria-hidden />
            {label}
            <ChevronRight className="ml-auto h-4 w-4 text-ink-sub" aria-hidden />
          </button>
        ))}
      </section>
    </div>
  );
};
