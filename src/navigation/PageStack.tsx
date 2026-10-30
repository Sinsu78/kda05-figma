import { ChevronLeft } from "lucide-react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { cn } from "../lib/utils";

/** 앱 안에서 열리는 상세 화면 목록 */
export type PageRoute =
  | { type: "notifications" }
  | { type: "diary" }
  | { type: "programs" }
  | { type: "program"; id: string }
  | { type: "refunds" }
  | { type: "settings" }
  | { type: "reserve"; clinicId: string };

type Entry = { key: number; route: PageRoute; closing: boolean };

type PageApi = { push: (route: PageRoute) => void; pop: () => void };
const PageContext = createContext<PageApi>({ push: () => {}, pop: () => {} });
export const usePages = () => useContext(PageContext);

const EXIT_MS = 240;
let seq = 0;

export const PageStackProvider = ({
  children,
  render,
}: {
  children: ReactNode;
  render: (route: PageRoute) => ReactNode;
}) => {
  const [stack, setStack] = useState<Entry[]>([]);

  const push = useCallback((route: PageRoute) => {
    setStack((s) => [...s, { key: ++seq, route, closing: false }]);
  }, []);

  const pop = useCallback(() => {
    setStack((s) => {
      const top = [...s].reverse().find((e) => !e.closing);
      if (!top) return s;
      window.setTimeout(() => setStack((cur) => cur.filter((e) => e.key !== top.key)), EXIT_MS);
      return s.map((e) => (e.key === top.key ? { ...e, closing: true } : e));
    });
  }, []);

  // ESC로 뒤로가기 (바텀시트가 열려 있으면 시트가 먼저 처리)
  useEffect(() => {
    if (!stack.length) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !document.querySelector('[role="dialog"][aria-modal="true"]')) pop();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [stack.length, pop]);

  const api = useMemo(() => ({ push, pop }), [push, pop]);

  return (
    <PageContext.Provider value={api}>
      {children}
      {createPortal(
        stack.map((entry) => (
          <div
            key={entry.key}
            className={cn(
              "fixed inset-y-0 left-1/2 z-[55] w-full max-w-[440px] -translate-x-1/2 overflow-hidden",
              entry.closing ? "pointer-events-none" : "",
            )}
          >
            <div className={cn("h-full", entry.closing ? "animate-page-out" : "animate-page-in")}>
              {render(entry.route)}
            </div>
          </div>
        )),
        document.body,
      )}
    </PageContext.Provider>
  );
};

/** 상세 화면 공통 레이아웃: 뒤로가기 헤더 + 스크롤 영역 */
export const PageLayout = ({
  title,
  action,
  children,
  footer,
}: {
  title: string;
  action?: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
}) => {
  const { pop } = usePages();
  return (
    <section role="region" aria-label={title} className="flex h-full flex-col bg-surface shadow-lift">
      <header className="flex h-14 shrink-0 items-center gap-1 border-b border-surface-line/60 bg-surface/90 px-2 backdrop-blur-xl">
        <button
          type="button"
          onClick={pop}
          aria-label="뒤로 가기"
          className="rounded-full p-2 text-ink transition hover:bg-surface-soft"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <h1 className="flex-1 truncate text-base font-bold">{title}</h1>
        {action}
      </header>
      <div className="flex-1 overflow-y-auto px-4 pb-10 pt-4">{children}</div>
      {footer && (
        <div className="shrink-0 border-t border-surface-line/60 bg-card px-4 pb-[calc(env(safe-area-inset-bottom)+12px)] pt-3">
          {footer}
        </div>
      )}
    </section>
  );
};
