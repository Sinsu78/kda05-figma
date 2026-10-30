import { ArrowLeft, Leaf, Minus, Plus, Sparkles } from "lucide-react";
import { useState } from "react";
import { toDateKey, type Profile } from "../../data/mock";
import { cn } from "../../lib/utils";
import { computeStats, useStore } from "../../store/AppStore";

const PACK_PRICES = [4500, 6500, 8000];

const daysAgo = (n: number) => {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return toDateKey(d);
};

const Chip = ({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) => (
  <button
    type="button"
    onClick={onClick}
    aria-pressed={active}
    className={cn(
      "rounded-full px-4 py-2 text-sm font-semibold transition active:scale-95",
      active ? "bg-brand text-white" : "bg-card text-ink-sub shadow-card hover:text-ink",
    )}
  >
    {children}
  </button>
);

export const Onboarding = () => {
  const { completeOnboarding, startDemo } = useStore();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<Profile>({
    name: "",
    cigarettesPerDay: 10,
    packPrice: 4500,
    quitDate: daysAgo(0),
  });
  const set = (patch: Partial<Profile>) => setForm((f) => ({ ...f, ...patch }));
  const preview = computeStats(form);
  const today = daysAgo(0);

  if (step === 0) {
    return (
      <div className="relative flex min-h-screen flex-col overflow-hidden bg-gradient-to-b from-[#00796e] via-brand to-[#003f3a] px-6 pb-10 pt-16 text-white">
        <div aria-hidden className="absolute -right-24 top-10 h-72 w-72 rounded-full bg-brand-mint/25 blur-3xl" />
        <div aria-hidden className="absolute -left-20 bottom-40 h-60 w-60 rounded-full bg-[#4fd1c5]/20 blur-3xl" />
        <div className="relative flex flex-1 flex-col items-center justify-center text-center">
          <span className="relative mb-8 flex h-28 w-28 items-center justify-center">
            <span aria-hidden className="absolute inset-0 animate-pulse-ring rounded-full bg-white/30" />
            <span className="relative flex h-28 w-28 animate-pop items-center justify-center rounded-[2rem] bg-white/15 ring-1 ring-white/30 backdrop-blur">
              <Leaf className="h-14 w-14" />
            </span>
          </span>
          <p className="animate-fade-up text-sm font-semibold text-brand-mint" style={{ animationDelay: "100ms" }}>
            국가금연지원센터 금연길잡이
          </p>
          <h1 className="mt-3 animate-fade-up text-3xl font-extrabold leading-tight" style={{ animationDelay: "180ms" }}>
            금연, 이제
            <br />
            혼자 하지 마세요
          </h1>
          <p className="mt-4 animate-fade-up text-[15px] leading-6 text-white/80" style={{ animationDelay: "260ms" }}>
            국가가 비용을 전액 지원하는 금연 프로그램과
            <br />
            24시간 SOS 코칭이 함께해요.
          </p>
        </div>
        <div className="relative flex animate-fade-up flex-col gap-2.5" style={{ animationDelay: "360ms" }}>
          <button
            type="button"
            onClick={() => setStep(1)}
            className="rounded-2xl bg-white py-4 text-base font-bold text-brand shadow-lift transition active:scale-[0.98]"
          >
            시작하기
          </button>
          <button
            type="button"
            onClick={startDemo}
            className="flex items-center justify-center gap-1.5 rounded-2xl py-3 text-sm font-semibold text-white/85 transition hover:bg-white/10"
          >
            <Sparkles className="h-4 w-4" />
            데모 데이터로 둘러보기
          </button>
        </div>
      </div>
    );
  }

  const canNext = step !== 1 || form.name.trim().length > 0;
  const next = () => (step < 3 ? setStep(step + 1) : completeOnboarding({ ...form, name: form.name.trim() }));

  return (
    <div className="flex min-h-screen flex-col bg-surface px-5 pb-8 pt-4">
      <div className="flex items-center gap-3">
        <button type="button" onClick={() => setStep(step - 1)} aria-label="이전" className="-ml-2 rounded-full p-2 hover:bg-surface-soft">
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div className="flex flex-1 gap-1.5">
          {[1, 2, 3].map((i) => (
            <span key={i} className={cn("h-1.5 flex-1 rounded-full transition-colors duration-300", i <= step ? "bg-brand" : "bg-surface-line")} />
          ))}
        </div>
      </div>

      <div key={step} className="flex flex-1 animate-tab-left flex-col pt-8">
        {step === 1 && (
          <>
            <h1 className="text-2xl font-extrabold leading-snug">
              반가워요!
              <br />
              어떻게 불러드릴까요?
            </h1>
            <input
              autoFocus
              value={form.name}
              onChange={(e) => set({ name: e.target.value })}
              onKeyDown={(e) => e.key === "Enter" && canNext && next()}
              maxLength={10}
              placeholder="이름 또는 닉네임"
              aria-label="이름"
              className="mt-8 border-b-2 border-surface-line bg-transparent pb-2 text-2xl font-bold outline-none transition placeholder:text-ink-sub/40 focus:border-brand focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          </>
        )}

        {step === 2 && (
          <>
            <h1 className="text-2xl font-extrabold leading-snug">
              하루에 담배를
              <br />몇 개비 피우셨나요?
            </h1>
            <div className="mt-8 flex items-center justify-center gap-6">
              <button
                type="button"
                aria-label="한 개비 줄이기"
                onClick={() => set({ cigarettesPerDay: Math.max(1, form.cigarettesPerDay - 1) })}
                className="flex h-12 w-12 items-center justify-center rounded-full bg-card shadow-card transition active:scale-90"
              >
                <Minus className="h-5 w-5" />
              </button>
              <p className="tabular w-28 text-center text-6xl font-extrabold text-brand" aria-live="polite">
                {form.cigarettesPerDay}
                <span className="ml-1 text-lg font-bold text-ink-sub">개비</span>
              </p>
              <button
                type="button"
                aria-label="한 개비 늘리기"
                onClick={() => set({ cigarettesPerDay: Math.min(60, form.cigarettesPerDay + 1) })}
                className="flex h-12 w-12 items-center justify-center rounded-full bg-card shadow-card transition active:scale-90"
              >
                <Plus className="h-5 w-5" />
              </button>
            </div>
            <div className="mt-4 flex justify-center gap-2">
              {[5, 10, 20, 30].map((n) => (
                <Chip key={n} active={form.cigarettesPerDay === n} onClick={() => set({ cigarettesPerDay: n })}>
                  {n === 20 ? "1갑" : `${n}개비`}
                </Chip>
              ))}
            </div>

            <h2 className="mt-10 text-base font-bold">담배 한 갑 가격</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {PACK_PRICES.map((p) => (
                <Chip key={p} active={form.packPrice === p} onClick={() => set({ packPrice: p })}>
                  {p.toLocaleString()}원
                </Chip>
              ))}
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <h1 className="text-2xl font-extrabold leading-snug">
              언제부터
              <br />
              금연을 시작했나요?
            </h1>
            <div className="mt-8 flex flex-wrap gap-2">
              {[
                { label: "오늘부터", value: daysAgo(0) },
                { label: "어제", value: daysAgo(1) },
                { label: "일주일 전", value: daysAgo(7) },
              ].map((o) => (
                <Chip key={o.label} active={form.quitDate === o.value} onClick={() => set({ quitDate: o.value })}>
                  {o.label}
                </Chip>
              ))}
            </div>
            <label className="mt-4 flex items-center justify-between rounded-2xl bg-card px-4 py-3 shadow-card">
              <span className="text-sm font-semibold text-ink-sub">직접 선택</span>
              <input
                type="date"
                value={form.quitDate}
                max={today}
                onChange={(e) => e.target.value && set({ quitDate: e.target.value })}
                className="bg-transparent text-sm font-bold outline-none"
              />
            </label>

            <div className="mt-8 rounded-3xl bg-gradient-to-br from-[#00796e] to-[#004b45] p-5 text-white shadow-lift">
              <p className="text-sm text-white/75">{form.name || "회원"}님은 오늘이</p>
              <p className="mt-1 text-2xl font-extrabold">
                금연 <span className="tabular">{preview.dayNumber}</span>일차
              </p>
              <p className="mt-3 text-sm text-white/85">
                벌써 <b className="tabular text-brand-mint">{preview.savedMoney.toLocaleString()}원</b>을 아끼고
                <br />
                담배 <b className="tabular text-brand-mint">{preview.cigarettesAvoided.toLocaleString()}개비</b>를 참았어요 👏
              </p>
            </div>
          </>
        )}
      </div>

      <button
        type="button"
        disabled={!canNext}
        onClick={next}
        className="rounded-2xl bg-brand py-4 text-base font-bold text-white shadow-lift transition active:scale-[0.98] disabled:bg-surface-line disabled:text-ink-sub disabled:shadow-none"
      >
        {step === 3 ? "금연 시작하기" : "다음"}
      </button>
    </div>
  );
};
