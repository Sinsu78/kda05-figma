import { Clock, MapPin } from "lucide-react";
import { useMemo, useState } from "react";
import { MiniMap } from "../../components/MiniMap";
import { useToast } from "../../components/ui/toast";
import { clinics, toDateKey } from "../../data/mock";
import { cn } from "../../lib/utils";
import { PageLayout, usePages } from "../../navigation/PageStack";
import { useStore } from "../../store/AppStore";

const WEEKDAYS = ["일", "월", "화", "수", "목", "금", "토"];
const TIMES = ["09:30", "10:30", "11:30", "14:00", "15:00", "16:00", "17:00", "18:30"];

/** 날짜·시간마다 일정한 "마감" 슬롯을 만드는 가짜 규칙 (새로고침해도 동일) */
const isTaken = (date: string, time: string, seed: string) =>
  (Number(date.slice(8)) * 7 + time.charCodeAt(1) * 3 + seed.charCodeAt(1)) % 5 === 0;

export const ReservePage = ({ clinicId }: { clinicId: string }) => {
  const clinic = clinics.find((c) => c.id === clinicId) ?? clinics[0];
  const toast = useToast();
  const { pop } = usePages();
  const { reserve } = useStore();

  const days = useMemo(
    () =>
      Array.from({ length: 10 }, (_, i) => {
        const d = new Date();
        d.setDate(d.getDate() + i + 1);
        return { key: toDateKey(d), day: d.getDate(), weekday: d.getDay() };
      }).filter((d) => d.weekday !== 0), // 일요일 휴진
    [],
  );
  const [date, setDate] = useState(days[0].key);
  const [time, setTime] = useState<string>();

  const confirm = () => {
    if (!time) return;
    reserve({ clinicId: clinic.id, date, time });
    toast(`${date.slice(5).replace("-", "/")} ${time} 예약을 확정했어요`);
    pop();
  };

  return (
    <PageLayout
      title="방문 예약"
      footer={
        <button
          type="button"
          disabled={!time}
          onClick={confirm}
          className="w-full rounded-2xl bg-brand py-3.5 text-base font-bold text-white transition active:scale-[0.98] disabled:bg-surface-line disabled:text-ink-sub"
        >
          {time ? `${date.slice(5).replace("-", "/")} ${time} 예약하기` : "시간을 선택해 주세요"}
        </button>
      }
    >
      <MiniMap clinics={[clinic]} selectedId={clinic.id} className="h-32" />
      <div className="mt-3">
        <p className="text-[11px] font-semibold text-ink-sub">{clinic.type}</p>
        <h2 className="text-lg font-bold">{clinic.name}</h2>
        <p className="mt-0.5 flex items-center gap-1 text-xs text-ink-sub">
          <MapPin className="h-3.5 w-3.5" aria-hidden />
          {clinic.address} · {clinic.distanceKm}km
        </p>
      </div>

      <h3 className="mt-6 text-sm font-bold">날짜</h3>
      <div className="no-scrollbar -mx-4 mt-2 flex gap-2 overflow-x-auto px-4 pb-1">
        {days.map((d) => (
          <button
            key={d.key}
            type="button"
            aria-pressed={date === d.key}
            onClick={() => {
              setDate(d.key);
              setTime(undefined);
            }}
            className={cn(
              "flex w-14 shrink-0 flex-col items-center rounded-2xl py-2.5 transition",
              date === d.key ? "bg-brand text-white shadow-lift" : "bg-card shadow-card",
            )}
          >
            <span className={cn("text-[11px] font-semibold", date !== d.key && d.weekday === 6 && "text-[#3b5bdb]")}>
              {WEEKDAYS[d.weekday]}
            </span>
            <span className="tabular text-lg font-bold">{d.day}</span>
          </button>
        ))}
      </div>

      <h3 className="mt-6 flex items-center gap-1 text-sm font-bold">
        <Clock className="h-4 w-4 text-ink-sub" aria-hidden />
        시간
      </h3>
      <div className="mt-2 grid grid-cols-4 gap-2">
        {TIMES.map((t) => {
          const taken = isTaken(date, t, clinic.id);
          return (
            <button
              key={t}
              type="button"
              disabled={taken}
              aria-pressed={time === t}
              onClick={() => setTime(t)}
              className={cn(
                "tabular rounded-xl py-2.5 text-sm font-semibold transition",
                time === t ? "bg-brand text-white" : "bg-card shadow-card hover:ring-1 hover:ring-brand/40",
                taken && "bg-surface-soft text-ink-sub/40 line-through shadow-none",
              )}
            >
              {t}
            </button>
          );
        })}
      </div>
      <p className="mt-4 text-[11px] text-ink-sub">금연클리닉 첫 방문 시 신분증을 지참해 주세요. 상담·측정은 무료예요.</p>
    </PageLayout>
  );
};
