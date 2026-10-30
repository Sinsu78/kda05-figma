import { CalendarClock, Check, CheckCircle2, HandCoins, Users } from "lucide-react";
import { useState } from "react";
import { PROGRAM_TONES, ProgramCard, ProgramTile } from "../../components/ProgramCard";
import { BottomSheet } from "../../components/ui/bottom-sheet";
import { useToast } from "../../components/ui/toast";
import { CONTACT_TIMES, programs } from "../../data/mock";
import { submitRecord } from "../../lib/api";
import { cn } from "../../lib/utils";
import { PageLayout, usePages } from "../../navigation/PageStack";
import { useProfile, useStore } from "../../store/AppStore";

const CATEGORIES = ["전체", ...Array.from(new Set(programs.map((p) => p.category)))];

export const ProgramsPage = () => {
  const [category, setCategory] = useState("전체");
  const list = programs.filter((p) => category === "전체" || p.category === category);

  return (
    <PageLayout title="금연 지원 프로그램">
      <div className="no-scrollbar -mx-4 mb-3 flex gap-2 overflow-x-auto px-4">
        {CATEGORIES.map((c) => (
          <button
            key={c}
            type="button"
            aria-pressed={category === c}
            onClick={() => setCategory(c)}
            className={cn(
              "shrink-0 rounded-full px-3.5 py-1.5 text-xs font-semibold transition",
              category === c ? "bg-ink text-surface" : "bg-card text-ink-sub shadow-card",
            )}
          >
            {c}
          </button>
        ))}
      </div>
      <div className="flex flex-col gap-2.5">
        {list.map((p) => (
          <div key={p.id} className="animate-fade-up">
            <ProgramCard program={p} rank={programs.indexOf(p)} />
          </div>
        ))}
      </div>
    </PageLayout>
  );
};

const TIME_SLOTS = CONTACT_TIMES;

/** 010-1234-5678 형태로 자동 하이픈 */
const formatPhone = (v: string) => {
  const d = v.replace(/\D/g, "").slice(0, 11);
  if (d.length < 4) return d;
  if (d.length < 8) return `${d.slice(0, 3)}-${d.slice(3)}`;
  return `${d.slice(0, 3)}-${d.slice(3, 7)}-${d.slice(7)}`;
};

export const ProgramDetailPage = ({ id }: { id: string }) => {
  const program = programs.find((p) => p.id === id) ?? programs[0];
  const toast = useToast();
  const { pop } = usePages();
  const { profile, applications, apply } = useProfile();
  const applied = applications.find((a) => a.programId === program.id);
  const [formOpen, setFormOpen] = useState(false);
  const [phone, setPhone] = useState("");
  const [time, setTime] = useState<string>(TIME_SLOTS[1]);
  const [agree, setAgree] = useState(false);
  const [status, setStatus] = useState<"idle" | "saving">("idle");
  const valid = /^010-\d{4}-\d{4}$/.test(phone) && agree;

  const submit = async () => {
    if (!valid || status === "saving") return; // 중복 제출 방지
    setStatus("saving");
    const result = await submitRecord("application", {
      program_id: program.id,
      name: profile.name,
      phone,
      contact_time: time,
    });
    setStatus("idle");
    if (!result.ok) {
      toast("신청을 저장하지 못했어요. 잠시 후 다시 시도해 주세요", "error");
      return; // 폼은 열어 두어 다시 시도할 수 있게
    }
    apply({ programId: program.id, phone, time });
    setFormOpen(false);
    toast(`신청이 접수됐어요. ${time}에 연락드릴게요`);
    window.setTimeout(pop, 600);
  };

  return (
    <PageLayout
      title={program.category}
      footer={
        applied ? (
          <p className="flex items-center justify-center gap-1.5 rounded-2xl bg-surface-soft py-3.5 text-sm font-bold text-brand">
            <CheckCircle2 className="h-4 w-4" /> {applied.date.replace(/-/g, ".")} 접수 완료 · {applied.time} 연락 예정
          </p>
        ) : (
          <button
            type="button"
            onClick={() => setFormOpen(true)}
            className="w-full rounded-2xl bg-brand py-3.5 text-base font-bold text-white shadow-lift transition active:scale-[0.98]"
          >
            {program.action}
          </button>
        )
      }
    >
      <div className="flex animate-fade-up flex-col items-center text-center">
        <ProgramTile program={program} size="lg" />
        <span className={cn("mt-4 rounded-full px-2.5 py-0.5 text-xs font-semibold", PROGRAM_TONES[program.tone].chip)}>
          {program.category}
        </span>
        <h2 className="mt-2 text-xl font-extrabold leading-snug">{program.title}</h2>
        <p className="mt-2 text-sm leading-6 text-ink-body">{program.description}</p>
      </div>

      <dl className="mt-6 grid grid-cols-3 gap-2">
        {[
          { icon: CalendarClock, label: "기간", value: program.duration },
          { icon: HandCoins, label: "환급·지원", value: program.refund ? `${(program.refund / 10000).toLocaleString()}만원` : "전액 무료" },
          { icon: Users, label: "최근 신청", value: `${program.applicants.toLocaleString()}명` },
        ].map((s) => (
          <div key={s.label} className="rounded-2xl bg-card p-3 text-center shadow-card">
            <s.icon className="mx-auto h-4 w-4 text-brand" aria-hidden />
            <dt className="mt-1 text-[11px] text-ink-sub">{s.label}</dt>
            <dd className="text-[13px] font-bold leading-tight">{s.value}</dd>
          </div>
        ))}
      </dl>

      <section className="mt-4 rounded-3xl bg-card p-5 shadow-card">
        <h3 className="text-sm font-bold">참여 대상</h3>
        <ul className="mt-2 flex flex-col gap-1.5">
          {program.eligibility.map((e) => (
            <li key={e} className="flex items-start gap-2 text-[13px] text-ink-body">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand" aria-hidden />
              {e}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-4 rounded-3xl bg-card p-5 shadow-card">
        <h3 className="text-sm font-bold">진행 순서</h3>
        <ol className="mt-3">
          {program.steps.map((s, i) => (
            <li key={s} className="relative flex gap-3 pb-4 last:pb-0">
              {i < program.steps.length - 1 && <span aria-hidden className="absolute left-3 top-6 h-full w-0.5 bg-surface-line" />}
              <span className="relative flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand text-xs font-bold text-white">
                {i + 1}
              </span>
              <span className="pt-0.5 text-sm font-medium">{s}</span>
            </li>
          ))}
        </ol>
      </section>

      <BottomSheet open={formOpen} onClose={() => setFormOpen(false)} title={`${program.action} 정보 입력`}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            void submit();
          }}
          className="flex flex-col gap-4"
        >
          <label className="block">
            <span className="text-xs font-semibold text-ink-sub">이름</span>
            <input value={profile.name} readOnly className="mt-1 w-full rounded-xl bg-surface-soft px-4 py-3 text-sm font-semibold outline-none" />
          </label>
          <label className="block">
            <span className="text-xs font-semibold text-ink-sub">연락처</span>
            <input
              inputMode="numeric"
              autoFocus
              placeholder="010-0000-0000"
              value={phone}
              onChange={(e) => setPhone(formatPhone(e.target.value))}
              className="tabular mt-1 w-full rounded-xl bg-surface-soft px-4 py-3 text-sm font-semibold outline-none ring-brand focus:ring-2 focus-visible:ring-offset-0"
            />
          </label>
          <fieldset>
            <legend className="text-xs font-semibold text-ink-sub">상담 희망 시간</legend>
            <div className="mt-1 grid grid-cols-4 gap-1.5">
              {TIME_SLOTS.map((t) => (
                <button
                  key={t}
                  type="button"
                  aria-pressed={time === t}
                  onClick={() => setTime(t)}
                  className={cn(
                    "rounded-xl py-2.5 text-xs font-semibold transition",
                    time === t ? "bg-brand text-white" : "bg-surface-soft text-ink-sub",
                  )}
                >
                  {t}
                </button>
              ))}
            </div>
          </fieldset>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} className="h-4 w-4 accent-[#00685f]" />
            상담 안내를 위한 개인정보 수집·이용에 동의해요
          </label>
          <button
            type="submit"
            disabled={!valid || status === "saving"}
            className="rounded-2xl bg-brand py-3.5 text-base font-bold text-white transition active:scale-[0.98] disabled:bg-surface-line disabled:text-ink-sub"
          >
            {status === "saving" ? "저장 중…" : "신청 완료하기"}
          </button>
        </form>
      </BottomSheet>
    </PageLayout>
  );
};

export const RefundsPage = () => {
  const { applications } = useStore();
  const { push } = usePages();
  const items = applications
    .map((a) => ({ ...a, program: programs.find((p) => p.id === a.programId)! }))
    .filter((a) => a.program);
  const total = items.reduce((sum, a) => sum + a.program.refund, 0);

  return (
    <PageLayout title="지원금·환급 내역">
      <section className="rounded-3xl bg-gradient-to-br from-[#00796e] to-[#004b45] p-5 text-white shadow-lift">
        <p className="text-sm text-white/75">이수 시 받을 수 있는 금액</p>
        <p className="tabular mt-1 text-3xl font-extrabold">{total.toLocaleString()}원</p>
        <p className="mt-2 text-xs text-white/70">프로그램 이수 확인 후 등록된 계좌로 지급돼요</p>
      </section>

      {items.length === 0 ? (
        <div className="mt-10 flex flex-col items-center text-center">
          <HandCoins className="h-12 w-12 text-ink-sub/40" aria-hidden />
          <p className="mt-3 text-sm font-semibold">아직 신청한 프로그램이 없어요</p>
          <p className="mt-1 text-xs text-ink-sub">국가 지원 프로그램은 모두 무료예요</p>
          <button
            type="button"
            onClick={() => push({ type: "programs" })}
            className="mt-5 rounded-xl bg-brand px-5 py-2.5 text-sm font-bold text-white"
          >
            프로그램 둘러보기
          </button>
        </div>
      ) : (
        <ul className="mt-4 flex flex-col gap-2.5">
          {items.map((a) => (
            <li key={a.programId}>
              <button
                type="button"
                onClick={() => push({ type: "program", id: a.programId })}
                className="flex w-full items-center gap-3 rounded-2xl bg-card p-4 text-left shadow-card"
              >
                <ProgramTile program={a.program} />
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-bold">{a.program.title}</span>
                  <span className="block text-[11px] text-ink-sub">{a.date.replace(/-/g, ".")} 신청 · 상담 대기</span>
                  <span className="tabular mt-1 block text-sm font-bold text-brand">
                    {a.program.refund ? `+${a.program.refund.toLocaleString()}원 예정` : "전액 무료 지원"}
                  </span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </PageLayout>
  );
};
