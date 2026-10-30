import { Check, Gift, Lock, Trophy } from "lucide-react";
import { useState } from "react";
import { milestones, stats } from "../../../../data/mock";
import { cn } from "../../../../lib/utils";

export const CessationRewardsRoadmapSection = (): JSX.Element => {
  const days = stats.quitDays;
  const doneCount = milestones.filter((m) => m.day <= days).length;
  const nextIndex = milestones.findIndex((m) => m.day > days);
  const [selected, setSelected] = useState(nextIndex === -1 ? milestones.length - 1 : nextIndex);
  const picked = milestones[selected];
  const remaining = picked.day - days;

  return (
    <section aria-labelledby="roadmap-title" className="rounded-3xl bg-white p-5 shadow-card">
      <header className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-brand/10 text-amber-brand">
            <Trophy className="h-4 w-4" aria-hidden />
          </span>
          <h2 id="roadmap-title" className="text-base font-bold">
            단계별 보상 로드맵
          </h2>
        </div>
        <span className="rounded-full bg-brand-mint/40 px-2.5 py-1 text-[11px] font-bold text-brand">
          {doneCount}/{milestones.length} 단계 완료
        </span>
      </header>

      <ol className="mt-5 flex items-start" aria-label="금연 단계">
        {milestones.map((m, i) => {
          const done = m.day <= days;
          const current = i === nextIndex;
          const isLast = i === milestones.length - 1;
          // 현재 단계로 가는 선은 진행률만큼 채움
          const prevDay = milestones[i].day;
          const nextDay = milestones[i + 1]?.day ?? prevDay;
          const fill = done
            ? Math.min(100, Math.max(0, ((days - prevDay) / (nextDay - prevDay)) * 100))
            : 0;

          return (
            <li key={m.day} className="relative flex flex-1 flex-col items-center">
              {!isLast && (
                <span aria-hidden className="absolute left-1/2 top-4 h-1 w-full rounded-full bg-surface-line">
                  <span
                    className="block h-full rounded-full bg-brand transition-[width] duration-700"
                    style={{ width: `${fill}%` }}
                  />
                </span>
              )}
              <button
                type="button"
                onClick={() => setSelected(i)}
                aria-pressed={selected === i}
                aria-label={`${m.title} ${m.day}일, ${done ? "완료" : "예정"}`}
                className={cn(
                  "relative z-10 flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold transition",
                  done && "bg-brand text-white",
                  current && "bg-white text-brand ring-2 ring-brand",
                  !done && !current && "bg-surface-soft text-ink-sub",
                  selected === i && "scale-110 shadow-lift",
                )}
              >
                {current && <span aria-hidden className="absolute inset-0 animate-pulse-ring rounded-full bg-brand/30" />}
                {done ? <Check className="h-4 w-4" /> : isLast ? <Gift className="h-4 w-4" /> : i + 1}
              </button>
              <span className={cn("mt-1.5 text-[11px] font-bold", current ? "text-brand" : "text-ink")}>{m.title}</span>
              <span className="text-[10.5px] text-ink-sub">{m.description}</span>
            </li>
          );
        })}
      </ol>

      <div key={selected} className="mt-4 flex animate-fade-in items-center gap-3 rounded-2xl bg-surface-soft p-3">
        <span
          className={cn(
            "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl",
            remaining <= 0 ? "bg-brand text-white" : "bg-white text-ink-sub",
          )}
        >
          {remaining <= 0 ? <Gift className="h-5 w-5" /> : <Lock className="h-5 w-5" />}
        </span>
        <div className="min-w-0">
          <p className="text-[11px] font-medium text-ink-sub">
            {picked.title} · {picked.day}일 달성 보상
          </p>
          <p className="truncate text-sm font-bold">{picked.reward}</p>
        </div>
        <span className="ml-auto shrink-0 text-xs font-bold text-brand">
          {remaining <= 0 ? "획득 완료" : `D-${remaining}`}
        </span>
      </div>
    </section>
  );
};
