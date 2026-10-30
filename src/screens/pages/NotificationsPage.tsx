import { Gift, Lightbulb, Megaphone } from "lucide-react";
import { notices } from "../../data/mock";
import { cn } from "../../lib/utils";
import { PageLayout, usePages } from "../../navigation/PageStack";
import { useStore } from "../../store/AppStore";

const KIND = {
  reward: { icon: Gift, className: "bg-amber-brand/15 text-amber-brand" },
  tip: { icon: Lightbulb, className: "bg-brand-mint/40 text-brand" },
  program: { icon: Megaphone, className: "bg-[#dce6ff] text-[#3b5bdb] dark:bg-[#3b5bdb]/30 dark:text-[#b9c8ff]" },
};

export const NotificationsPage = () => {
  const { readNotices, readNotice, readAll } = useStore();
  const { push } = usePages();
  const unread = notices.filter((n) => !readNotices.includes(n.id)).length;

  return (
    <PageLayout
      title="알림"
      action={
        unread > 0 && (
          <button
            type="button"
            onClick={() => readAll(notices.map((n) => n.id))}
            className="rounded-full px-3 py-1.5 text-xs font-semibold text-brand hover:bg-surface-soft"
          >
            모두 읽음
          </button>
        )
      }
    >
      <ul className="flex flex-col gap-2">
        {notices.map((n, i) => {
          const { icon: Icon, className } = KIND[n.kind];
          const isUnread = !readNotices.includes(n.id);
          return (
            <li key={n.id} className="animate-fade-up" style={{ animationDelay: `${i * 60}ms` }}>
              <button
                type="button"
                onClick={() => {
                  readNotice(n.id);
                  if (n.kind === "program") push({ type: "program", id: "12week" });
                  if (n.kind === "reward") push({ type: "diary" });
                }}
                className={cn(
                  "flex w-full gap-3 rounded-2xl p-4 text-left transition",
                  isUnread ? "bg-card shadow-card" : "bg-transparent opacity-70 hover:bg-card",
                )}
              >
                <span className={cn("flex h-10 w-10 shrink-0 items-center justify-center rounded-xl", className)}>
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex items-center gap-1.5 text-sm font-bold">
                    {n.title}
                    {isUnread && <span className="h-1.5 w-1.5 rounded-full bg-sos" aria-label="읽지 않음" />}
                  </span>
                  <span className="mt-0.5 block text-[13px] text-ink-body">{n.body}</span>
                  <span className="mt-1 block text-[11px] text-ink-sub">{n.time}</span>
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </PageLayout>
  );
};
