import { ShieldCheck } from "lucide-react";

export const SmokingCessationFundingSection = (): JSX.Element => {
  return (
    <section className="flex gap-3 rounded-3xl bg-surface-soft p-4 ring-1 ring-surface-line">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-brand shadow-sm">
        <ShieldCheck className="h-5 w-5" aria-hidden />
      </span>
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="rounded-full bg-brand-mint px-2 py-0.5 text-[11px] font-bold text-brand-mint-ink">
            국민건강증진기금 전액 지원
          </span>
          <span className="text-[11px] text-ink-sub">국가지원 공공의료</span>
        </div>
        <p className="mt-1.5 text-[13px] leading-5 text-ink-body">
          담배 제세부담금 인상분(증가 세수 10%)으로 모든 프로그램이 <b className="text-ink">무료</b>로 제공돼요.
        </p>
      </div>
    </section>
  );
};
