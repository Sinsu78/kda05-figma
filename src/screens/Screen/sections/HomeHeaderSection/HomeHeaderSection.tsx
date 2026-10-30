import { Bell, Leaf } from "lucide-react";
import { useToast } from "../../../../components/ui/toast";

export const HomeHeaderSection = ({ title }: { title: string }): JSX.Element => {
  const toast = useToast();

  return (
    <header className="sticky top-0 z-40 bg-surface/85 backdrop-blur-xl">
      <div className="flex h-16 items-center gap-3 px-4">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand text-white shadow-sm">
          <Leaf className="h-5 w-5" aria-hidden />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-[11px] font-medium text-ink-sub">보건복지부 국가금연지원센터</p>
          <h1 className="text-base font-bold leading-6">{title}</h1>
        </div>
        <button
          type="button"
          aria-label="알림 2건"
          onClick={() => toast("새 알림: 오늘 금연 인증을 잊지 마세요", "info")}
          className="relative rounded-full p-2 text-ink transition hover:bg-surface-soft"
        >
          <Bell className="h-5 w-5" />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-sos ring-2 ring-surface" />
        </button>
      </div>
    </header>
  );
};
