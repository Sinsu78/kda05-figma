import { Monitor, Moon, Sun } from "lucide-react";
import { useState } from "react";
import { useToast } from "../../components/ui/toast";
import { cn } from "../../lib/utils";
import { PageLayout } from "../../navigation/PageStack";
import { useProfile, type Theme } from "../../store/AppStore";
import { Switch } from "../tabs/ProfileTab";

const THEMES: { value: Theme; label: string; icon: typeof Sun }[] = [
  { value: "system", label: "시스템", icon: Monitor },
  { value: "light", label: "라이트", icon: Sun },
  { value: "dark", label: "다크", icon: Moon },
];

export const SettingsPage = () => {
  const toast = useToast();
  const { profile, theme, setTheme, notify, setNotify, reset } = useProfile();
  const [confirmReset, setConfirmReset] = useState(false);

  return (
    <PageLayout title="설정">
      <section className="rounded-3xl bg-card p-4 shadow-card">
        <h2 className="text-sm font-bold">화면 테마</h2>
        <div role="radiogroup" aria-label="화면 테마" className="mt-3 grid grid-cols-3 gap-1 rounded-2xl bg-surface-soft p-1">
          {THEMES.map(({ value, label, icon: Icon }) => (
            <button
              key={value}
              type="button"
              role="radio"
              aria-checked={theme === value}
              onClick={() => setTheme(value)}
              className={cn(
                "flex items-center justify-center gap-1.5 rounded-xl py-2.5 text-sm font-semibold transition",
                theme === value ? "bg-card text-ink shadow-card" : "text-ink-sub",
              )}
            >
              <Icon className="h-4 w-4" aria-hidden />
              {label}
            </button>
          ))}
        </div>
      </section>

      <section className="mt-4 overflow-hidden rounded-3xl bg-card shadow-card">
        <div className="flex items-center gap-3 p-4">
          <span id="set-notify" className="flex-1 text-sm font-semibold">
            매일 금연 인증 알림
          </span>
          <Switch checked={notify} onChange={setNotify} labelledBy="set-notify" />
        </div>
        {[
          { label: "이름", value: profile.name },
          { label: "금연 시작일", value: profile.quitDate.replace(/-/g, ".") },
          { label: "하루 흡연량", value: `${profile.cigarettesPerDay}개비` },
          { label: "담배 한 갑 가격", value: `${profile.packPrice.toLocaleString()}원` },
        ].map((r) => (
          <div key={r.label} className="flex items-center justify-between border-t border-surface-soft p-4 text-sm">
            <span className="font-semibold">{r.label}</span>
            <span className="text-ink-sub">{r.value}</span>
          </div>
        ))}
      </section>

      <section className="mt-4 rounded-3xl bg-card p-4 shadow-card">
        <h2 className="text-sm font-bold">데이터</h2>
        <p className="mt-1 text-xs text-ink-sub">
          기록은 이 기기의 브라우저에만 저장돼요. 초기화하면 처음 화면부터 다시 시작해요.
        </p>
        {confirmReset ? (
          <div className="mt-3 grid grid-cols-2 gap-2">
            <button type="button" onClick={() => setConfirmReset(false)} className="rounded-xl bg-surface-soft py-2.5 text-sm font-bold">
              취소
            </button>
            <button
              type="button"
              onClick={() => {
                reset();
                toast("처음부터 다시 시작해요", "info");
              }}
              className="rounded-xl bg-sos py-2.5 text-sm font-bold text-white"
            >
              정말 초기화
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setConfirmReset(true)}
            className="mt-3 w-full rounded-xl bg-surface-soft py-2.5 text-sm font-bold text-sos"
          >
            모든 기록 초기화
          </button>
        )}
      </section>

      <p className="mt-6 text-center text-[11px] text-ink-sub">금연길잡이 프로토타입 v1.1</p>
    </PageLayout>
  );
};
