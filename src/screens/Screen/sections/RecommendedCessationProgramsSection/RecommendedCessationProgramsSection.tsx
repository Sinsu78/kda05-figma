import { ChevronRight } from "lucide-react";
import { ProgramCard } from "../../../../components/ProgramCard";
import { programs } from "../../../../data/mock";
import { usePages } from "../../../../navigation/PageStack";

export const RecommendedCessationProgramsSection = (): JSX.Element => {
  const { push } = usePages();
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
          onClick={() => push({ type: "programs" })}
          className="flex items-center text-xs font-semibold text-brand hover:opacity-80"
        >
          전체보기 {programs.length}
          <ChevronRight className="h-4 w-4" aria-hidden />
        </button>
      </header>
      {programs.slice(0, 3).map((p, i) => (
        <ProgramCard key={p.id} program={p} rank={i} />
      ))}
    </section>
  );
};
