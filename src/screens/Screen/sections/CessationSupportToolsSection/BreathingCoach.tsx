import { Pause, Phone, Play, RotateCcw } from "lucide-react";
import { useEffect, useState } from "react";
import { QUITLINE } from "../../../../data/mock";
import { cn } from "../../../../lib/utils";

const TOTAL_SECONDS = 180;
// 들숨 4초 → 멈춤 4초 → 날숨 6초 (총 14초 주기)
const PHASES = [
  { label: "천천히 들이마셔요", seconds: 4, scale: 1 },
  { label: "잠시 멈춰요", seconds: 4, scale: 1 },
  { label: "길게 내쉬어요", seconds: 6, scale: 0.55 },
] as const;
const CYCLE = PHASES.reduce((sum, p) => sum + p.seconds, 0);

const phaseAt = (elapsed: number) => {
  let t = elapsed % CYCLE;
  for (const phase of PHASES) {
    if (t < phase.seconds) return { phase, remain: phase.seconds - t };
    t -= phase.seconds;
  }
  return { phase: PHASES[0], remain: PHASES[0].seconds };
};

export const BreathingCoach = () => {
  const [elapsed, setElapsed] = useState(0);
  const [running, setRunning] = useState(true);
  const done = elapsed >= TOTAL_SECONDS;

  useEffect(() => {
    if (!running || done) return;
    const id = window.setInterval(() => setElapsed((e) => e + 1), 1000);
    return () => window.clearInterval(id);
  }, [running, done]);

  const { phase, remain } = phaseAt(elapsed);
  const left = TOTAL_SECONDS - elapsed;
  const mm = String(Math.floor(left / 60)).padStart(1, "0");
  const ss = String(left % 60).padStart(2, "0");

  return (
    <div className="flex flex-col items-center">
      <p className="text-center text-sm text-ink-sub">
        흡연 욕구는 보통 <b className="text-ink">3~5분</b>이면 지나가요.
        <br />
        원을 따라 함께 숨 쉬어 볼까요?
      </p>

      <div className="relative my-6 flex h-56 w-56 items-center justify-center">
        <div aria-hidden className="absolute inset-0 rounded-full bg-brand-mint/20" />
        <div
          aria-hidden
          className="absolute inset-3 rounded-full bg-gradient-to-br from-brand-mint to-brand shadow-lift ease-in-out"
          style={{
            transform: `scale(${done ? 0.8 : phase.scale})`,
            transitionProperty: "transform",
            transitionDuration: `${phase.seconds}s`,
          }}
        />
        <div className="relative text-center text-white" aria-live="polite">
          {done ? (
            <p className="text-lg font-bold">잘 해냈어요! 🎉</p>
          ) : (
            <>
              <p className="text-base font-bold drop-shadow">{phase.label}</p>
              <p className="tabular text-3xl font-extrabold drop-shadow">{remain}</p>
            </>
          )}
        </div>
      </div>

      <div className="tabular mb-1 text-sm font-semibold text-ink-sub">
        남은 시간 {mm}:{ss}
      </div>
      <div className="mb-5 h-1.5 w-full overflow-hidden rounded-full bg-surface-line">
        <div
          className="h-full rounded-full bg-brand transition-[width] duration-1000 ease-linear"
          style={{ width: `${(elapsed / TOTAL_SECONDS) * 100}%` }}
        />
      </div>

      <div className="grid w-full grid-cols-2 gap-2">
        <button
          type="button"
          onClick={() => (done ? (setElapsed(0), setRunning(true)) : setRunning((r) => !r))}
          className="flex items-center justify-center gap-1.5 rounded-xl bg-surface-soft py-3 text-sm font-bold text-ink transition hover:bg-surface-line"
        >
          {done ? <RotateCcw className="h-4 w-4" /> : running ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          {done ? "다시 하기" : running ? "일시정지" : "계속하기"}
        </button>
        <a
          href={`tel:${QUITLINE}`}
          className={cn(
            "flex items-center justify-center gap-1.5 rounded-xl bg-brand py-3 text-sm font-bold text-white transition hover:bg-brand-dark",
          )}
        >
          <Phone className="h-4 w-4" />
          상담 연결
        </a>
      </div>
      <p className="mt-3 text-center text-[11px] text-ink-sub">
        금연상담전화 {QUITLINE} · 평일 09~21시, 토 09~15시
      </p>
    </div>
  );
};
