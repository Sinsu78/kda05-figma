import { ChevronDown, FileText, Landmark } from "lucide-react";
import { useState } from "react";
import { useToast } from "../../../../components/ui/toast";
import { cn } from "../../../../lib/utils";

// 기금 집행 비율(프로토타입 예시 수치)
const allocation = [
  { label: "금연치료 지원", value: 46, color: "bg-brand" },
  { label: "금연 상담전화", value: 22, color: "bg-[#3b5bdb]" },
  { label: "학교 흡연 예방", value: 18, color: "bg-amber-brand" },
  { label: "공공 캠페인", value: 14, color: "bg-[#8a94ad]" },
];

export const TobaccoTaxPolicySection = (): JSX.Element => {
  const [open, setOpen] = useState(false);
  const toast = useToast();

  return (
    <section className="rounded-3xl bg-white p-4 shadow-card" aria-labelledby="policy-title">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls="policy-body"
        className="flex w-full items-center gap-2.5 text-left"
      >
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-surface-soft text-ink-sub">
          <Landmark className="h-4 w-4" aria-hidden />
        </span>
        <h2 id="policy-title" className="flex-1 text-sm font-bold">
          금연 기금은 이렇게 쓰여요
        </h2>
        <ChevronDown className={cn("h-5 w-5 text-ink-sub transition-transform", open && "rotate-180")} aria-hidden />
      </button>

      {/* 비율 막대는 접혀 있어도 보이게 해서 한눈에 파악 */}
      <div className="mt-3 flex h-2 overflow-hidden rounded-full" aria-hidden>
        {allocation.map((a) => (
          <span key={a.label} className={a.color} style={{ width: `${a.value}%` }} />
        ))}
      </div>

      {open && (
        <div id="policy-body" className="animate-fade-in">
          <ul className="mt-3 grid grid-cols-2 gap-x-3 gap-y-1.5">
            {allocation.map((a) => (
              <li key={a.label} className="flex items-center gap-1.5 text-xs text-ink-body">
                <span className={cn("h-2 w-2 rounded-full", a.color)} aria-hidden />
                {a.label}
                <b className="tabular ml-auto text-ink">{a.value}%</b>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-[13px] leading-5 text-ink-body">
            국민건강증진법 제25조에 따라 조성된 담배 부담금은 금연 상담전화, 금연치료 지원, 학교 흡연 예방 사업과
            공공 금연 캠페인에 투명하게 집행됩니다.
          </p>
          <div className="mt-3 flex items-center justify-between">
            <button
              type="button"
              onClick={() => toast("운용보고서 PDF는 준비 중이에요", "info")}
              className="flex items-center gap-1 text-xs font-semibold text-brand hover:underline"
            >
              <FileText className="h-3.5 w-3.5" aria-hidden />
              2028년 제세부담금 운용보고서
            </button>
            <span className="text-[11px] text-ink-sub">복지부 고시 제2024-88호</span>
          </div>
        </div>
      )}
    </section>
  );
};
