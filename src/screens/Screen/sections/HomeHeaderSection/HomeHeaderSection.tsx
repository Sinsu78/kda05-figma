import { Bell, Leaf } from "lucide-react";
import { notices } from "../../../../data/mock";
import { usePages } from "../../../../navigation/PageStack";
import { useStore } from "../../../../store/AppStore";

export const HomeHeaderSection = ({ title }: { title: string }): JSX.Element => {
  const { push } = usePages();
  const { readNotices } = useStore();
  const unread = notices.filter((n) => !readNotices.includes(n.id)).length;

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
          aria-label={unread ? `알림 ${unread}건` : "알림"}
          onClick={() => push({ type: "notifications" })}
          className="relative rounded-full p-2 text-ink transition hover:bg-surface-soft"
        >
          <Bell className="h-5 w-5" />
          {unread > 0 && (
            <span className="absolute right-0.5 top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-sos px-1 text-[10px] font-bold text-white ring-2 ring-surface">
              {unread}
            </span>
          )}
        </button>
      </div>
    </header>
  );
};
