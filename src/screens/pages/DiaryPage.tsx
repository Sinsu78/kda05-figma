import { Check, ChevronLeft, ChevronRight, Flame, Sparkles } from "lucide-react";
import { useMemo, useState } from "react";
import { useToast } from "../../components/ui/toast";
import { toDateKey } from "../../data/mock";
import { cn } from "../../lib/utils";
import { PageLayout } from "../../navigation/PageStack";
import { useProfile } from "../../store/AppStore";

const WEEKDAYS = ["일", "월", "화", "수", "목", "금", "토"];

/** 오늘(또는 오늘 미인증이면 어제)부터 거꾸로 이어지는 연속 인증 일수 */
const streakOf = (checkIns: Set<string>) => {
  const d = new Date();
  if (!checkIns.has(toDateKey(d))) d.setDate(d.getDate() - 1);
  let n = 0;
  while (checkIns.has(toDateKey(d))) {
    n++;
    d.setDate(d.getDate() - 1);
  }
  return n;
};

export const DiaryPage = () => {
  const toast = useToast();
  const { profile, stats, checkIns, checkedInToday, checkIn, today } = useProfile();
  const [cursor, setCursor] = useState(() => {
    const d = new Date();
    return new Date(d.getFullYear(), d.getMonth(), 1);
  });

  const checked = useMemo(() => new Set(checkIns), [checkIns]);
  const streak = streakOf(checked);
  const rate = Math.round((checkIns.length / stats.dayNumber) * 100);

  const cells = useMemo(() => {
    const first = cursor.getDay();
    const days = new Date(cursor.getFullYear(), cursor.getMonth() + 1, 0).getDate();
    return [
      ...Array.from({ length: first }, () => null),
      ...Array.from({ length: days }, (_, i) => toDateKey(new Date(cursor.getFullYear(), cursor.getMonth(), i + 1))),
    ];
  }, [cursor]);

  const moveMonth = (delta: number) => setCursor((c) => new Date(c.getFullYear(), c.getMonth() + delta, 1));
  const isCurrentMonth = cursor.getMonth() === new Date().getMonth() && cursor.getFullYear() === new Date().getFullYear();

  return (
    <PageLayout
      title="금연 일지"
      footer={
        <button
          type="button"
          disabled={checkedInToday}
          onClick={() => {
            checkIn();
            toast(`금연 ${stats.dayNumber}일차 인증 완료!`);
          }}
          className="flex w-full items-center justify-center gap-1.5 rounded-2xl bg-brand py-3.5 text-sm font-bold text-white transition active:scale-[0.98] disabled:bg-surface-soft disabled:text-brand"
        >
          {checkedInToday ? <Check className="h-4 w-4" /> : <Sparkles className="h-4 w-4" />}
          {checkedInToday ? "오늘 인증 완료" : "오늘 금연 인증하기"}
        </button>
      }
    >
      <section className="grid grid-cols-3 gap-2">
        {[
          { label: "연속 인증", value: `${streak}일`, icon: Flame, accent: true },
          { label: "총 인증", value: `${checkIns.length}일` },
          { label: "인증률", value: `${rate}%` },
        ].map((s) => (
          <div key={s.label} className="rounded-2xl bg-card p-3 text-center shadow-card">
            <p className={cn("tabular flex items-center justify-center gap-1 text-lg font-extrabold", s.accent ? "text-amber-brand" : "text-ink")}>
              {s.icon && <s.icon className="h-4 w-4" aria-hidden />}
              {s.value}
            </p>
            <p className="text-[11px] text-ink-sub">{s.label}</p>
          </div>
        ))}
      </section>

      <section className="mt-4 rounded-3xl bg-card p-4 shadow-card" aria-label="인증 달력">
        <header className="mb-3 flex items-center justify-between">
          <button type="button" onClick={() => moveMonth(-1)} aria-label="이전 달" className="rounded-full p-1.5 hover:bg-surface-soft">
            <ChevronLeft className="h-5 w-5" />
          </button>
          <h2 className="tabular text-base font-bold">
            {cursor.getFullYear()}년 {cursor.getMonth() + 1}월
          </h2>
          <button
            type="button"
            onClick={() => moveMonth(1)}
            disabled={isCurrentMonth}
            aria-label="다음 달"
            className="rounded-full p-1.5 hover:bg-surface-soft disabled:opacity-30"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </header>
        <div className="grid grid-cols-7 gap-y-1.5 text-center">
          {WEEKDAYS.map((w, i) => (
            <span key={w} className={cn("pb-1 text-[11px] font-semibold", i === 0 ? "text-sos" : "text-ink-sub")}>
              {w}
            </span>
          ))}
          {cells.map((key, i) => {
            if (!key) return <span key={`e${i}`} />;
            const day = Number(key.slice(8));
            const done = checked.has(key);
            const isToday = key === today;
            const beforeQuit = key < profile.quitDate;
            const future = key > today;
            const missed = !done && !beforeQuit && !future && !isToday;
            return (
              <span key={key} className="flex justify-center">
                <span
                  title={done ? "인증 완료" : missed ? "미인증" : undefined}
                  className={cn(
                    "tabular relative flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold transition",
                    done && "bg-brand text-white",
                    isToday && !done && "ring-2 ring-brand text-brand",
                    missed && "bg-surface-soft text-ink-sub",
                    (beforeQuit || future) && "text-ink-sub/40",
                    key === profile.quitDate && "ring-2 ring-amber-brand ring-offset-2 ring-offset-card",
                  )}
                >
                  {done ? <Check className="h-4 w-4" strokeWidth={3} /> : day}
                </span>
              </span>
            );
          })}
        </div>
        <ul className="mt-4 flex justify-center gap-4 text-[11px] text-ink-sub">
          <li className="flex items-center gap-1">
            <span className="h-2.5 w-2.5 rounded-full bg-brand" /> 인증
          </li>
          <li className="flex items-center gap-1">
            <span className="h-2.5 w-2.5 rounded-full bg-surface-line" /> 미인증
          </li>
          <li className="flex items-center gap-1">
            <span className="h-2.5 w-2.5 rounded-full ring-2 ring-amber-brand" /> 금연 시작일
          </li>
        </ul>
      </section>

      <p className="mt-4 rounded-2xl bg-surface-soft p-3 text-center text-[13px] text-ink-body">
        {streak >= 7
          ? `${streak}일 연속 인증 중! 이 흐름이면 4주 보상도 금방이에요 🔥`
          : "하루 한 번 인증하면 연속 기록이 쌓여요. 빠진 날이 있어도 괜찮아요."}
      </p>
    </PageLayout>
  );
};
