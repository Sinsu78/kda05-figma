import { RefreshCw } from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "../lib/utils";

const THRESHOLD = 72;
const MAX_PULL = 110;

/**
 * 모바일 "당겨서 새로고침".
 * 페이지 맨 위에서 아래로 당기면 인디케이터가 내려오고, 임계값을 넘겨 놓으면 onRefresh 실행.
 */
export const PullToRefresh = ({ onRefresh, children }: { onRefresh: () => Promise<void>; children: ReactNode }) => {
  const [pull, setPull] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const startY = useRef<number | null>(null);
  const pullRef = useRef(0);

  useEffect(() => {
    const onStart = (e: TouchEvent) => {
      startY.current = window.scrollY <= 0 && !refreshing ? e.touches[0].clientY : null;
    };
    const onMove = (e: TouchEvent) => {
      if (startY.current === null) return;
      const dy = e.touches[0].clientY - startY.current;
      if (dy <= 0) {
        pullRef.current = 0;
        setPull(0);
        return;
      }
      // 고무줄처럼 점점 덜 당겨지게(감쇠)
      const damped = Math.min(MAX_PULL, dy * 0.5);
      pullRef.current = damped;
      setPull(damped);
      if (e.cancelable) e.preventDefault();
    };
    const onEnd = async () => {
      if (startY.current === null) return;
      startY.current = null;
      if (pullRef.current >= THRESHOLD) {
        setRefreshing(true);
        setPull(THRESHOLD * 0.75);
        await onRefresh();
        setRefreshing(false);
      }
      pullRef.current = 0;
      setPull(0);
    };
    window.addEventListener("touchstart", onStart, { passive: true });
    window.addEventListener("touchmove", onMove, { passive: false });
    window.addEventListener("touchend", onEnd);
    return () => {
      window.removeEventListener("touchstart", onStart);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("touchend", onEnd);
    };
  }, [onRefresh, refreshing]);

  const progress = Math.min(1, pull / THRESHOLD);
  const dragging = startY.current !== null && !refreshing;

  return (
    <div className="relative">
      <div
        aria-hidden={!refreshing}
        aria-live="polite"
        className="pointer-events-none absolute inset-x-0 top-0 flex justify-center"
        style={{ transform: `translateY(${pull - 44}px)`, opacity: progress, transition: dragging ? "none" : "all 0.25s ease" }}
      >
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-card text-brand shadow-lift">
          <RefreshCw
            className={cn("h-4 w-4", refreshing && "animate-spin")}
            style={refreshing ? undefined : { transform: `rotate(${progress * 270}deg)` }}
          />
          {refreshing && <span className="sr-only">새로고침 중</span>}
        </span>
      </div>
      <div style={{ transform: `translateY(${pull}px)`, transition: dragging ? "none" : "transform 0.25s ease" }}>
        {children}
      </div>
    </div>
  );
};
