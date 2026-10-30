import { CalendarCheck, CalendarPlus, Clock, MapPin, Navigation } from "lucide-react";
import { useMemo, useState } from "react";
import { MiniMap } from "../../components/MiniMap";
import { clinics, currentLocation, type Clinic } from "../../data/mock";
import { cn } from "../../lib/utils";
import { usePages } from "../../navigation/PageStack";
import { useStore } from "../../store/AppStore";

const FILTERS = ["전체", "보건소", "지정병원", "지금 진료 중"] as const;
type Filter = (typeof FILTERS)[number];

const STATUS: Record<Clinic["status"], { label: string; className: string }> = {
  open: { label: "진료 중", className: "bg-brand-mint/50 text-brand" },
  busy: { label: "혼잡", className: "bg-[#fff1d6] text-amber-brand" },
  closed: { label: "진료 종료", className: "bg-surface-soft text-ink-sub" },
};

export const ClinicTab = () => {
  const { push } = usePages();
  const { reservations } = useStore();
  const [filter, setFilter] = useState<Filter>("전체");
  const [selectedId, setSelectedId] = useState<string>();

  const list = useMemo(
    () =>
      clinics
        .filter((c) => {
          if (filter === "보건소" || filter === "지정병원") return c.type === filter;
          if (filter === "지금 진료 중") return c.status !== "closed";
          return true;
        })
        .sort((a, b) => a.distanceKm - b.distanceKm),
    [filter],
  );

  const select = (id: string) => {
    setSelectedId(id);
    document.getElementById(`clinic-${id}`)?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <div className="flex flex-col gap-3">
      <MiniMap clinics={list} selectedId={selectedId} onSelect={select} className="h-56 shadow-card" />
      <p className="flex items-center gap-1 px-1 text-xs text-ink-sub">
        <MapPin className="h-3.5 w-3.5" aria-hidden />
        {currentLocation} 기준 · 반경 2km
      </p>

      <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4" role="tablist" aria-label="기관 필터">
        {FILTERS.map((f) => (
          <button
            key={f}
            type="button"
            role="tab"
            aria-selected={filter === f}
            onClick={() => setFilter(f)}
            className={cn(
              "shrink-0 rounded-full px-3.5 py-1.5 text-xs font-semibold transition",
              filter === f ? "bg-ink text-surface" : "bg-card text-ink-sub shadow-card hover:text-ink",
            )}
          >
            {f}
          </button>
        ))}
      </div>

      <ul className="flex flex-col gap-2.5">
        {list.map((c) => (
          <li
            key={c.id}
            id={`clinic-${c.id}`}
            className={cn(
              "animate-fade-up rounded-3xl bg-card p-4 shadow-card ring-2 transition",
              selectedId === c.id ? "ring-brand" : "ring-transparent",
            )}
          >
            <button type="button" onClick={() => setSelectedId(c.id)} className="block w-full text-left">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-semibold text-ink-sub">{c.type}</span>
                <span className={cn("rounded-full px-2 py-0.5 text-[10.5px] font-bold", STATUS[c.status].className)}>
                  {STATUS[c.status].label}
                </span>
                <span className="tabular ml-auto text-xs font-bold text-brand">{c.distanceKm}km</span>
              </div>
              <h3 className="mt-1 text-[15px] font-bold">{c.name}</h3>
              <p className="text-xs text-ink-sub">{c.address}</p>
              {c.status !== "closed" && (
                <p className="mt-1 flex items-center gap-1 text-xs text-ink-body">
                  <Clock className="h-3.5 w-3.5" aria-hidden />
                  {c.waitMinutes === 0 ? "대기 없음" : `예상 대기 ${c.waitMinutes}분`}
                </p>
              )}
            </button>
            {(() => {
              const booked = reservations.find((r) => r.clinicId === c.id);
              return booked ? (
                <p className="mt-2 flex items-center gap-1 rounded-xl bg-brand-mint/30 px-3 py-2 text-xs font-semibold text-brand">
                  <CalendarCheck className="h-3.5 w-3.5" aria-hidden />
                  {booked.date.slice(5).replace("-", "/")} {booked.time} 예약됨
                </p>
              ) : null;
            })()}
            <div className="mt-3 grid grid-cols-2 gap-2">
              <button
                type="button"
                disabled={c.status === "closed"}
                onClick={() => push({ type: "reserve", clinicId: c.id })}
                className="flex items-center justify-center gap-1 rounded-xl bg-surface-soft py-2 text-xs font-bold transition hover:bg-surface-line disabled:opacity-40"
              >
                <CalendarPlus className="h-3.5 w-3.5" /> {c.status === "closed" ? "진료 종료" : "방문 예약"}
              </button>
              <a
                href={`https://map.kakao.com/link/search/${encodeURIComponent(c.name)}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-1 rounded-xl bg-brand py-2 text-xs font-bold text-white transition hover:bg-brand-dark"
              >
                <Navigation className="h-3.5 w-3.5" /> 길찾기
              </a>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
