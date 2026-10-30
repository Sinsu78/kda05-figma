import { X } from "lucide-react";
import { useEffect, useId, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { cn } from "../../lib/utils";

type BottomSheetProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  className?: string;
};

/**
 * 모바일 앱 스타일 바텀시트. ESC·배경 클릭으로 닫힘.
 * transform 애니메이션이 걸린 부모 안에서는 position:fixed 기준이 그 부모로 바뀌므로
 * body로 portal 렌더링한다.
 */
export const BottomSheet = ({
  open,
  onClose,
  title,
  children,
  className,
}: BottomSheetProps) => {
  const titleId = useId();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 z-[60] flex items-end justify-center">
      <button
        type="button"
        aria-label="닫기"
        tabIndex={-1}
        onClick={onClose}
        className="absolute inset-0 animate-fade-in bg-black/45 backdrop-blur-[2px]"
      />
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className={cn(
          "relative w-full max-w-[440px] animate-sheet-up rounded-t-3xl bg-card px-5 pb-8 pt-3 shadow-lift",
          className,
        )}
      >
        <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-surface-line" />
        <header className="mb-4 flex items-center justify-between">
          <h2 id={titleId} className="text-lg font-bold">
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="닫기"
            className="-mr-2 rounded-full p-2 text-ink-sub transition hover:bg-surface-soft"
          >
            <X className="h-5 w-5" />
          </button>
        </header>
        {children}
      </section>
    </div>,
    document.body,
  );
};
