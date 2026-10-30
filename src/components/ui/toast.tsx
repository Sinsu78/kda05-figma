import { AlertCircle, CheckCircle2, Info } from "lucide-react";
import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
  type ReactNode,
} from "react";

type ToastTone = "success" | "info" | "error";
type ToastState = { id: number; message: string; tone: ToastTone } | null;

const ToastContext = createContext<(message: string, tone?: ToastTone) => void>(
  () => {},
);

export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toast, setToast] = useState<ToastState>(null);
  const timer = useRef<number>();

  const show = useCallback((message: string, tone: ToastTone = "success") => {
    window.clearTimeout(timer.current);
    setToast({ id: Date.now(), message, tone });
    timer.current = window.setTimeout(() => setToast(null), 2400);
  }, []);

  const Icon = toast?.tone === "info" ? Info : toast?.tone === "error" ? AlertCircle : CheckCircle2;

  return (
    <ToastContext.Provider value={show}>
      {children}
      <div aria-live="polite" className="pointer-events-none">
        {toast && (
          <div
            key={toast.id}
            role="status"
            className="fixed bottom-24 left-1/2 z-[70] flex w-max max-w-[calc(100%-2rem)] animate-toast-in items-center gap-2 rounded-full bg-[#0b1c30]/90 px-4 dark:bg-[#2a3a50]/95 py-2.5 text-sm font-medium text-white shadow-lift backdrop-blur"
          >
            <Icon className={`h-4 w-4 shrink-0 ${toast.tone === "error" ? "text-[#ff8a80]" : "text-brand-mint"}`} aria-hidden />
            {toast.message}
          </div>
        )}
      </div>
    </ToastContext.Provider>
  );
};
