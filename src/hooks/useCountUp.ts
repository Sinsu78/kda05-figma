import { useEffect, useState } from "react";

/** 0에서 target까지 숫자가 올라가는 애니메이션 값 (easeOutCubic) */
export const useCountUp = (target: number, duration = 1200) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setValue(target);
      return;
    }
    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      setValue(target * (1 - Math.pow(1 - t, 3)));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, duration]);

  return value;
};
