import { Bell, CalendarDays, ChevronRight, HandCoins, Headphones, Settings, type LucideIcon } from "lucide-react";
import { useToast } from "../../components/ui/toast";
import { QUITLINE } from "../../data/mock";
import { cn } from "../../lib/utils";
import { usePages, type PageRoute } from "../../navigation/PageStack";
import { useProfile } from "../../store/AppStore";

type MenuItem = { icon: LucideIcon; label: string; hint?: string } & (
  | { route: PageRoute }
  | { href: string }
);

export const Switch = ({
  checked,
  onChange,
  labelledBy,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  labelledBy: string;
}) => (
  <button
    type="button"
    role="switch"
    aria-checked={checked}
    aria-labelledby={labelledBy}
    onClick={() => onChange(!checked)}
    className={cn("relative h-7 w-12 shrink-0 rounded-full transition-colors", checked ? "bg-brand" : "bg-surface-line")}
  >
    <span className={cn("absolute top-1 h-5 w-5 rounded-full bg-white shadow transition-all", checked ? "left-6" : "left-1")} />
  </button>
);

export const ProfileTab = () => {
  const toast = useToast();
  const { push } = usePages();
  const { profile, stats, checkIns, applications, sosCount, notify, setNotify } = useProfile();

  const menu: MenuItem[] = [
    { icon: CalendarDays, label: "금연 일지", hint: `${checkIns.length}일 인증`, route: { type: "diary" } },
    { icon: HandCoins, label: "지원금·환급 내역", hint: applications.length ? `${applications.length}건` : undefined, route: { type: "refunds" } },
    { icon: Headphones, label: "금연상담전화", hint: QUITLINE, href: `tel:${QUITLINE}` },
    { icon: Settings, label: "설정", route: { type: "settings" } },
  ];

  const rowClass =
    "flex w-full items-center gap-3 border-t border-surface-soft p-4 text-left text-sm font-semibold transition hover:bg-surface-soft";

  return (
    <div className="flex flex-col gap-4">
      <section className="flex items-center gap-4 rounded-3xl bg-card p-5 shadow-card">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-brand-mint to-brand text-xl font-bold text-white">
          {profile.name.slice(0, 1)}
        </span>
        <div>
          <p className="text-lg font-bold">{profile.name} 님</p>
          <p className="text-xs text-ink-sub">
            금연 {stats.dayNumber}일차 · 하루 {profile.cigarettesPerDay}개비 → 0개비
          </p>
        </div>
      </section>

      <section className="grid grid-cols-3 gap-2 rounded-3xl bg-card p-4 text-center shadow-card">
        {[
          { label: "참은 담배", value: `${stats.cigarettesAvoided.toLocaleString()}개비` },
          { label: "절약 금액", value: `${(stats.savedMoney / 10000).toFixed(1)}만원` },
          { label: "SOS 사용", value: `${sosCount}회` },
        ].map((s) => (
          <div key={s.label}>
            <p className="tabular text-base font-extrabold text-brand">{s.value}</p>
            <p className="text-[11px] text-ink-sub">{s.label}</p>
          </div>
        ))}
      </section>

      <section className="overflow-hidden rounded-3xl bg-card shadow-card">
        <div className="flex items-center gap-3 p-4">
          <Bell className="h-5 w-5 text-ink-sub" aria-hidden />
          <span id="notify-label" className="flex-1 text-sm font-semibold">
            매일 금연 인증 알림
          </span>
          <Switch
            checked={notify}
            labelledBy="notify-label"
            onChange={(v) => {
              setNotify(v);
              toast(v ? "매일 저녁 9시에 알려드릴게요" : "알림을 껐어요", "info");
            }}
          />
        </div>
        {menu.map((item) => {
          const inner = (
            <>
              <item.icon className="h-5 w-5 text-ink-sub" aria-hidden />
              {item.label}
              {item.hint && <span className="ml-auto text-xs font-medium text-ink-sub">{item.hint}</span>}
              <ChevronRight className={cn("h-4 w-4 text-ink-sub", !item.hint && "ml-auto")} aria-hidden />
            </>
          );
          return "href" in item ? (
            <a key={item.label} href={item.href} className={rowClass}>
              {inner}
            </a>
          ) : (
            <button key={item.label} type="button" onClick={() => push(item.route)} className={rowClass}>
              {inner}
            </button>
          );
        })}
      </section>
    </div>
  );
};
