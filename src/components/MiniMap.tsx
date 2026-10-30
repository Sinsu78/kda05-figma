import type { Clinic } from "../data/mock";
import { cn } from "../lib/utils";

type Props = {
  clinics: Clinic[];
  selectedId?: string;
  onSelect?: (id: string) => void;
  className?: string;
};

/**
 * 프로토타입용 일러스트 지도.
 * 실제 서비스에서는 카카오/네이버 지도 SDK로 교체하고 clinics 좌표만 위경도로 바꾸면 된다.
 */
export const MiniMap = ({ clinics, selectedId, onSelect, className }: Props) => (
  <div className={cn("relative overflow-hidden rounded-2xl bg-[#eaf2ee]", className)}>
    <svg aria-hidden viewBox="0 0 400 240" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full dark:opacity-75">
      {/* 공원 & 하천 */}
      <rect x="250" y="150" width="110" height="70" rx="14" fill="#cfe9d6" />
      <rect x="20" y="10" width="80" height="50" rx="12" fill="#cfe9d6" />
      <path d="M-10 200 C 80 170, 140 230, 230 205 S 360 190, 420 215 L 420 260 L -10 260 Z" fill="#cde3f7" />
      {/* 블록 */}
      <g fill="#ffffff" opacity="0.7">
        <rect x="120" y="20" width="90" height="55" rx="6" />
        <rect x="230" y="25" width="70" height="60" rx="6" />
        <rect x="320" y="30" width="70" height="50" rx="6" />
        <rect x="30" y="85" width="80" height="60" rx="6" />
        <rect x="130" y="100" width="100" height="45" rx="6" />
        <rect x="250" y="100" width="60" height="40" rx="6" />
      </g>
      {/* 도로 */}
      <g stroke="#ffffff" strokeLinecap="round">
        <path d="M-10 90 L 420 80" strokeWidth="12" />
        <path d="M115 -10 L 120 260" strokeWidth="9" />
        <path d="M240 -10 L 235 260" strokeWidth="9" />
        <path d="M-10 160 L 420 150" strokeWidth="7" />
        <path d="M315 -10 L 330 260" strokeWidth="6" />
      </g>
      <path d="M-10 90 L 420 80" stroke="#f7d774" strokeWidth="3" strokeDasharray="10 8" />
    </svg>

    {/* 내 위치 */}
    <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" aria-hidden>
      <span className="absolute -inset-3 animate-pulse-ring rounded-full bg-[#3b82f6]/40" />
      <span className="relative block h-3.5 w-3.5 rounded-full border-2 border-white bg-[#3b82f6] shadow" />
    </span>

    {clinics.map((c) => {
      const active = c.id === selectedId;
      const color = c.type === "보건소" ? "bg-brand" : "bg-[#3b5bdb]";
      return (
        <button
          key={c.id}
          type="button"
          tabIndex={onSelect ? 0 : -1}
          aria-label={c.name}
          onClick={() => onSelect?.(c.id)}
          className={cn(
            "absolute -translate-x-1/2 -translate-y-full transition-transform",
            !onSelect && "pointer-events-none",
            active ? "z-10 scale-125" : "hover:scale-110",
          )}
          style={{ left: `${c.x}%`, top: `${c.y}%` }}
        >
          <span
            className={cn(
              "flex h-6 w-6 items-center justify-center rounded-full rounded-bl-none border-2 border-white text-[10px] font-bold text-white shadow-md -rotate-45",
              c.status === "closed" ? "bg-ink-sub/60" : color,
            )}
          >
            <span className="rotate-45">+</span>
          </span>
        </button>
      );
    })}
  </div>
);
