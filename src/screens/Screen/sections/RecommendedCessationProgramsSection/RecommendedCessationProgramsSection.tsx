import { Building2, Check, ChevronRight, Gift, Pill, Users, Video } from "lucide-react";
import { useState } from "react";
import { useToast } from "../../../../components/ui/toast";
import { programs, type Program, type ProgramTone } from "../../../../data/mock";
import { cn } from "../../../../lib/utils";

const ICONS = { pill: Pill, building: Building2, video: Video };

const TONES: Record<ProgramTone, { tile: string; chip: string }> = {
  brand: { tile: "from-[#5ee0d2] to-brand", chip: "bg-brand-mint/50 text-brand-mint-ink" },
  blue: { tile: "from-[#8fb3ff] to-[#3b5bdb]", chip: "bg-[#dce6ff] text-[#23379c]" },
  violet: { tile: "from-[#c4a6ff] to-[#6d4bd8]", chip: "bg-[#ece4ff] text-[#4b2fa8]" },
};

const RANK_STYLE = ["bg-amber-brand text-white", "bg-[#8a94ad] text-white", "bg-[#b07a4f] text-white"];

const ProgramCard = ({ program, rank }: { program: Program; rank: number }) => {
  const toast = useToast();
  const [applied, setApplied] = useState(false);
  const Icon = ICONS[program.icon];
  const tone = TONES[program.tone];
  const primary = rank === 0;

  const handleApply = () => {
    if (applied) return;
    setApplied(true);
    toast(`'${program.title}' ${program.action === "예약하기" ? "예약" : "신청"}이 접수됐어요`);
  };

  return (
    <article className="rounded-3xl bg-white p-4 shadow-card">
      <div className="flex items-center gap-2">
        <span className={cn("flex h-6 min-w-6 items-center justify-center rounded-md px-1.5 text-[11px] font-extrabold", RANK_STYLE[rank])}>
          {rank + 1}위
        </span>
        <span className={cn("rounded-full px-2 py-0.5 text-[11px] font-semibold", tone.chip)}>{program.category}</span>
        <span className="tabular ml-auto flex items-center gap-1 text-[11px] text-ink-sub">
          <Users className="h-3 w-3" aria-hidden />
          {program.applicants.toLocaleString()}명 신청
        </span>
      </div>

      <div className="mt-3 flex gap-3.5">
        <span
          aria-hidden
          className={cn("flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br text-white shadow-sm", tone.tile)}
        >
          <Icon className="h-7 w-7" />
        </span>
        <div className="min-w-0">
          <h3 className="text-[15px] font-bold leading-snug">{program.title}</h3>
          <p className="mt-1 line-clamp-2 text-[13px] leading-5 text-ink-body">{program.description}</p>
        </div>
      </div>

      <div className="mt-3 flex items-center gap-2 border-t border-surface-soft pt-3">
        <Gift className={cn("h-4 w-4 shrink-0", primary ? "text-brand" : "text-ink-sub")} aria-hidden />
        <span className={cn("min-w-0 truncate text-xs font-semibold", primary ? "text-brand" : "text-ink-sub")}>
          {program.benefit}
        </span>
        <button
          type="button"
          onClick={handleApply}
          disabled={applied}
          className={cn(
            "ml-auto flex shrink-0 items-center gap-1 rounded-xl px-3.5 py-2 text-xs font-bold transition active:scale-95",
            applied
              ? "bg-surface-soft text-brand"
              : primary
                ? "bg-brand text-white hover:bg-brand-dark"
                : "bg-surface-line text-ink hover:bg-[#cbdcff]",
          )}
        >
          {applied && <Check className="h-3.5 w-3.5" />}
          {applied ? "접수 완료" : program.action}
        </button>
      </div>
    </article>
  );
};

export const RecommendedCessationProgramsSection = (): JSX.Element => {
  const toast = useToast();
  return (
    <section className="flex flex-col gap-2.5" aria-labelledby="programs-title">
      <header className="flex items-end justify-between px-1">
        <div>
          <h2 id="programs-title" className="text-base font-bold">
            인기 금연 지원 프로그램
          </h2>
          <p className="text-[11px] text-ink-sub">건강보험공단 검증 · 최근 14일 신청 순위</p>
        </div>
        <button
          type="button"
          onClick={() => toast("전체 프로그램 목록은 준비 중이에요", "info")}
          className="flex items-center text-xs font-semibold text-brand hover:text-brand-dark"
        >
          전체보기
          <ChevronRight className="h-4 w-4" aria-hidden />
        </button>
      </header>
      {programs.map((p, i) => (
        <ProgramCard key={p.id} program={p} rank={i} />
      ))}
    </section>
  );
};
