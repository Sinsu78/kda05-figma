import { ArrowLeft, CalendarCheck, ChevronRight, RotateCcw } from "lucide-react";
import { useState } from "react";
import { dependencyQuiz } from "../../data/mock";
import { cn } from "../../lib/utils";
import { usePages, type PageRoute } from "../../navigation/PageStack";

const MAX_SCORE = dependencyQuiz.reduce(
  (sum, q) => sum + Math.max(...q.options.map((o) => o.score)),
  0,
);

type PlanItem = { label: string; route?: PageRoute };

const resultFor = (score: number) => {
  const ratio = score / MAX_SCORE;
  if (ratio < 0.34)
    return {
      level: "낮음",
      color: "text-brand",
      bar: "bg-brand",
      advice: "행동요법만으로도 충분히 금연할 수 있어요. 비대면 코칭으로 습관을 관리해 보세요.",
      plan: [
        { label: "금연 일지로 매일 인증하기", route: { type: "diary" } },
        { label: "비대면 스마트 코칭 신청", route: { type: "program", id: "remote" } },
        { label: "2주 뒤 자가진단 다시 하기" },
      ] as PlanItem[],
    };
  if (ratio < 0.67)
    return {
      level: "중간",
      color: "text-amber-brand",
      bar: "bg-amber-brand",
      advice: "니코틴 보조제(패치·껌)를 함께 쓰면 성공률이 높아져요. 보건소에서 무료로 받을 수 있어요.",
      plan: [
        { label: "보건소 금연클리닉 방문 예약", route: { type: "reserve", clinicId: "c1" } },
        { label: "니코틴 패치 무료 수령 신청", route: { type: "program", id: "clinic" } },
        { label: "금연 일지로 진행 점검", route: { type: "diary" } },
      ] as PlanItem[],
    };
  return {
    level: "높음",
    color: "text-sos",
    bar: "bg-sos",
    advice: "전문의 약물치료가 가장 효과적이에요. 12주 집중 치료는 본인부담금이 100% 환급돼요.",
    plan: [
        { label: "12주 집중 금연치료 신청", route: { type: "program", id: "12week" } },
        { label: "지정 병원 방문 예약", route: { type: "reserve", clinicId: "c2" } },
        { label: "흡연 욕구가 올 때 SOS 코칭 사용" },
      ] as PlanItem[],
  };
};

export const PlanTab = () => {
  const { push } = usePages();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const finished = step >= dependencyQuiz.length;
  const score = answers.reduce((a, b) => a + b, 0);

  const choose = (value: number) => {
    setAnswers((prev) => [...prev.slice(0, step), value]);
    setStep((s) => s + 1);
  };

  const reset = () => {
    setAnswers([]);
    setStep(0);
  };

  if (finished) {
    const r = resultFor(score);
    return (
      <div className="flex animate-fade-up flex-col gap-4">
        <section className="rounded-3xl bg-card p-5 text-center shadow-card">
          <p className="text-sm text-ink-sub">나의 니코틴 의존도</p>
          <p className={cn("mt-1 text-4xl font-extrabold", r.color)}>{r.level}</p>
          <div className="mx-auto mt-4 h-2.5 max-w-xs overflow-hidden rounded-full bg-surface-line">
            <div className={cn("h-full rounded-full transition-[width] duration-700", r.bar)} style={{ width: `${(score / MAX_SCORE) * 100}%` }} />
          </div>
          <p className="tabular mt-1.5 text-xs text-ink-sub">
            {score}점 / {MAX_SCORE}점
          </p>
          <p className="mt-4 rounded-2xl bg-surface-soft p-3 text-left text-[13px] leading-5 text-ink-body">{r.advice}</p>
        </section>

        <section className="rounded-3xl bg-card p-5 shadow-card">
          <h2 className="flex items-center gap-2 text-base font-bold">
            <CalendarCheck className="h-5 w-5 text-brand" aria-hidden />
            맞춤 금연 플랜
          </h2>
          <ol className="mt-3 flex flex-col gap-2">
            {r.plan.map((item, i) => (
              <li key={item.label}>
                <button
                  type="button"
                  disabled={!item.route}
                  onClick={() => item.route && push(item.route)}
                  className="flex w-full items-center gap-3 rounded-2xl border border-surface-line p-3 text-left text-sm font-medium transition enabled:hover:border-brand/50 enabled:hover:bg-surface-soft"
                >
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand text-xs font-bold text-white">
                    {i + 1}
                  </span>
                  {item.label}
                  {item.route && <ChevronRight className="ml-auto h-4 w-4 text-ink-sub" aria-hidden />}
                </button>
              </li>
            ))}
          </ol>
        </section>

        <button
          type="button"
          onClick={reset}
          className="flex items-center justify-center gap-1.5 rounded-2xl bg-surface-line py-3.5 text-sm font-bold transition hover:bg-[#cbdcff]"
        >
          <RotateCcw className="h-4 w-4" />
          다시 진단하기
        </button>
        <p className="text-center text-[11px] text-ink-sub">
          파거스트롬 니코틴 의존도 검사를 축약한 간이 평가로, 의학적 진단을 대신하지 않아요.
        </p>
      </div>
    );
  }

  const q = dependencyQuiz[step];
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => setStep((s) => Math.max(0, s - 1))}
          disabled={step === 0}
          aria-label="이전 문항"
          className="rounded-full p-1.5 text-ink transition hover:bg-surface-soft disabled:opacity-30"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div className="h-2 flex-1 overflow-hidden rounded-full bg-surface-line">
          <div className="h-full rounded-full bg-brand transition-[width] duration-300" style={{ width: `${(step / dependencyQuiz.length) * 100}%` }} />
        </div>
        <span className="tabular text-xs font-semibold text-ink-sub">
          {step + 1}/{dependencyQuiz.length}
        </span>
      </div>

      <section key={q.id} className="animate-fade-up rounded-3xl bg-card p-5 shadow-card">
        <p className="text-xs font-bold text-brand">니코틴 의존도 자가진단</p>
        <h2 className="mt-2 text-xl font-bold leading-snug">{q.question}</h2>
        <div className="mt-5 flex flex-col gap-2">
          {q.options.map((o) => (
            <button
              key={o.label}
              type="button"
              onClick={() => choose(o.score)}
              className={cn(
                "rounded-2xl border-2 px-4 py-3.5 text-left text-[15px] font-semibold transition active:scale-[0.98]",
                answers[step] === o.score
                  ? "border-brand bg-brand-mint/20 text-brand"
                  : "border-surface-line hover:border-brand/40 hover:bg-surface-soft",
              )}
            >
              {o.label}
            </button>
          ))}
        </div>
      </section>
    </div>
  );
};
