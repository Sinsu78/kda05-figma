import { Building2, Check, Gift, HeartHandshake, Pill, Users, UsersRound, Video } from "lucide-react";
import type { Program, ProgramTone } from "../data/mock";
import { cn } from "../lib/utils";
import { usePages } from "../navigation/PageStack";
import { useStore } from "../store/AppStore";

export const PROGRAM_ICONS = {
  pill: Pill,
  building: Building2,
  video: Video,
  heart: HeartHandshake,
  users: UsersRound,
};

export const PROGRAM_TONES: Record<ProgramTone, { tile: string; chip: string }> = {
  brand: { tile: "from-[#5ee0d2] to-brand", chip: "bg-brand-mint/50 text-brand-mint-ink dark:text-brand-mint" },
  blue: { tile: "from-[#8fb3ff] to-[#3b5bdb]", chip: "bg-[#dce6ff] text-[#23379c] dark:bg-[#23379c]/40 dark:text-[#b9c8ff]" },
  violet: { tile: "from-[#c4a6ff] to-[#6d4bd8]", chip: "bg-[#ece4ff] text-[#4b2fa8] dark:bg-[#4b2fa8]/40 dark:text-[#d6c6ff]" },
};

const RANK_STYLE = ["bg-amber-brand text-white", "bg-[#8a94ad] text-white", "bg-[#b07a4f] text-white"];

export const ProgramTile = ({ program, size = "md" }: { program: Program; size?: "md" | "lg" }) => {
  const Icon = PROGRAM_ICONS[program.icon];
  return (
    <span
      aria-hidden
      className={cn(
        "flex shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br text-white shadow-sm",
        PROGRAM_TONES[program.tone].tile,
        size === "lg" ? "h-20 w-20" : "h-16 w-16",
      )}
    >
      <Icon className={size === "lg" ? "h-9 w-9" : "h-7 w-7"} />
    </span>
  );
};

export const ProgramCard = ({ program, rank }: { program: Program; rank: number }) => {
  const { push } = usePages();
  const { applications } = useStore();
  const applied = applications.some((a) => a.programId === program.id);
  const primary = rank === 0;
  const open = () => push({ type: "program", id: program.id });

  return (
    <article className="relative rounded-3xl bg-card p-4 shadow-card transition hover:shadow-lift">
      <div className="flex items-center gap-2">
        <span
          className={cn(
            "flex h-6 min-w-6 items-center justify-center rounded-md px-1.5 text-[11px] font-extrabold",
            RANK_STYLE[rank] ?? "bg-surface-line text-ink-sub",
          )}
        >
          {rank + 1}위
        </span>
        <span className={cn("rounded-full px-2 py-0.5 text-[11px] font-semibold", PROGRAM_TONES[program.tone].chip)}>
          {program.category}
        </span>
        <span className="tabular ml-auto flex items-center gap-1 text-[11px] text-ink-sub">
          <Users className="h-3 w-3" aria-hidden />
          {program.applicants.toLocaleString()}명 신청
        </span>
      </div>

      <div className="mt-3 flex gap-3.5">
        <ProgramTile program={program} />
        <div className="min-w-0">
          {/* 카드 전체가 눌리도록 제목 버튼을 카드 크기로 확장 */}
          <h3 className="text-[15px] font-bold leading-snug">
            <button type="button" onClick={open} className="text-left after:absolute after:inset-0 after:rounded-3xl">
              {program.title}
            </button>
          </h3>
          <p className="mt-1 line-clamp-2 text-[13px] leading-5 text-ink-body">{program.description}</p>
        </div>
      </div>

      <div className="mt-3 flex items-center gap-2 border-t border-surface-soft pt-3">
        <Gift className={cn("h-4 w-4 shrink-0", primary ? "text-brand" : "text-ink-sub")} aria-hidden />
        <span className={cn("min-w-0 truncate text-xs font-semibold", primary ? "text-brand" : "text-ink-sub")}>
          {program.benefit}
        </span>
        <button
          type="button"
          onClick={open}
          className={cn(
            "relative z-10 ml-auto flex shrink-0 items-center gap-1 rounded-xl px-3.5 py-2 text-xs font-bold transition active:scale-95",
            applied
              ? "bg-surface-soft text-brand"
              : primary
                ? "bg-brand text-white hover:bg-brand-dark"
                : "bg-surface-line text-ink hover:brightness-95",
          )}
        >
          {applied && <Check className="h-3.5 w-3.5" />}
          {applied ? "접수 완료" : program.action}
        </button>
      </div>
    </article>
  );
};
