import { Check, Clock, HeartPulse, PiggyBank, Sparkles, Wind } from "lucide-react";
import { useEffect, useState } from "react";
import { useToast } from "../../../../components/ui/toast";
import { useProfile } from "../../../../store/AppStore";
import { useCountUp } from "../../../../hooks/useCountUp";
import { cn } from "../../../../lib/utils";

const StatTile = ({
  icon: Icon,
  label,
  value,
  unit,
  caption,
}: {
  icon: typeof PiggyBank;
  label: string;
  value: number;
  unit: string;
  caption: string;
}) => {
  const animated = useCountUp(value);
  return (
    <article className="rounded-2xl bg-white/10 p-3 ring-1 ring-white/15">
      <p className="flex items-center gap-1 text-[11px] font-medium text-white/75">
        <Icon className="h-3.5 w-3.5" aria-hidden />
        {label}
      </p>
      <p className="tabular mt-1.5 text-lg font-bold leading-6 text-white">
        {Math.round(animated).toLocaleString()}
        <span className="ml-0.5 text-xs font-semibold text-white/80">{unit}</span>
      </p>
      <p className="mt-0.5 text-[10.5px] leading-tight text-white/65">{caption}</p>
    </article>
  );
};

export const CessationProgressSection = (): JSX.Element => {
  const toast = useToast();
  const { profile: user, stats, checkedInToday: checkedIn, checkIn } = useProfile();
  const days = stats.dayNumber;
  const animatedDays = useCountUp(days, 900);
  const [lung, setLung] = useState(0);

  // 마운트 후 진행바가 차오르도록
  useEffect(() => {
    const id = requestAnimationFrame(() => setLung(stats.lungRecovery));
    return () => cancelAnimationFrame(id);
  }, [stats.lungRecovery]);

  const handleCheckIn = () => {
    if (checkedIn) return;
    checkIn();
    toast(`금연 ${days}일차 인증 완료! 오늘도 해냈어요`);
  };

  return (
    <section
      aria-labelledby="progress-title"
      className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#00796e] via-brand to-[#004b45] p-5 text-white shadow-lift"
    >
      {/* 장식용 빛 번짐 */}
      <div aria-hidden className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-brand-mint/30 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -bottom-20 -left-10 h-40 w-40 rounded-full bg-[#4fd1c5]/20 blur-3xl" />

      <div className="relative">
        <header className="flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-2.5 py-1 text-xs font-semibold">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-pulse-ring rounded-full bg-brand-mint" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-mint" />
            </span>
            건강 회복 중
          </span>
          <span className="text-xs text-white/70">시작일 {user.quitDate.replace(/-/g, ".")}</span>
        </header>

        <div className="mt-4 flex items-end justify-between gap-3">
          <div>
            <h2 id="progress-title" className="text-sm font-medium text-white/80">
              {user.name} 님의 금연 도전
            </h2>
            <p className="mt-0.5 flex items-baseline gap-1">
              <span className="text-lg font-semibold">금연</span>
              <span className="tabular text-5xl font-extrabold tracking-tight">
                {Math.round(animatedDays)}
              </span>
              <span className="text-lg font-semibold">일차</span>
            </p>
          </div>
          <button
            type="button"
            onClick={handleCheckIn}
            aria-pressed={checkedIn}
            className={cn(
              "flex shrink-0 items-center gap-1.5 rounded-full px-4 py-2.5 text-sm font-bold shadow-sm transition active:scale-95",
              checkedIn
                ? "bg-white/15 text-white ring-1 ring-white/30"
                : "bg-white text-brand hover:bg-brand-mint",
            )}
          >
            {checkedIn ? <Check className="h-4 w-4" /> : <Sparkles className="h-4 w-4" />}
            {checkedIn ? "오늘 인증 완료" : "오늘 금연 인증"}
          </button>
        </div>

        <div className="mt-5 grid grid-cols-3 gap-2" aria-label="금연 성과 요약">
          <StatTile icon={PiggyBank} label="절약 금액" value={stats.savedMoney} unit="원" caption={`${user.packPrice.toLocaleString()}원/갑 기준`} />
          <StatTile icon={HeartPulse} label="기대수명" value={stats.lifeGainedHours} unit="시간↑" caption={`심혈관 ${stats.cardioRiskDown}%↓`} />
          <StatTile icon={Clock} label="되찾은 시간" value={stats.savedHours} unit="시간" caption="흡연에 쓰던 시간" />
        </div>

        <div className="mt-5">
          <div className="flex items-center justify-between text-xs">
            <span className="flex items-center gap-1.5 font-semibold">
              <Wind className="h-4 w-4 text-brand-mint" aria-hidden />
              기관지·폐 정화율
            </span>
            <span className="tabular font-bold">
              {stats.lungRecovery}% <span className="font-medium text-white/60">/ 100%</span>
            </span>
          </div>
          <div
            role="progressbar"
            aria-valuenow={stats.lungRecovery}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="기관지 및 폐 정화율"
            className="mt-2 h-2.5 overflow-hidden rounded-full bg-white/15"
          >
            <div
              className="h-full rounded-full bg-gradient-to-r from-brand-mint to-white transition-[width] duration-[1400ms] ease-out"
              style={{ width: `${lung}%` }}
            />
          </div>
          <div className="mt-1.5 flex justify-between text-[11px] text-white/65">
            <span>✓ 일산화탄소 정상치 회복</span>
            <span>{stats.lungRecovery >= 100 ? "섬모 재생 완료" : "섬모 재생 중 · 목표 21일"}</span>
          </div>
        </div>
      </div>
    </section>
  );
};
