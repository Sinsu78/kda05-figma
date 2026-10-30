import { Building2, Expand, MapPin, Stethoscope } from "lucide-react";
import { MiniMap } from "../../../../components/MiniMap";
import { clinics, currentLocation } from "../../../../data/mock";
import type { TabId } from "../BottomNavigationSection";

export const NearbyCessationClinicsSection = ({
  goTo,
}: {
  goTo: (tab: TabId) => void;
}): JSX.Element => {
  const open = clinics.filter((c) => c.status !== "closed");
  const healthCenters = open.filter((c) => c.type === "보건소").length;
  const hospitals = open.filter((c) => c.type === "지정병원").length;

  const summaries = [
    { icon: Building2, label: "관할 보건소", value: `${healthCenters}곳 운영 중`, note: "대기 없이 상담", tone: "bg-brand-mint/50 text-brand" },
    { icon: Stethoscope, label: "지정 병·의원", value: `${hospitals}곳 진료 중`, note: "무료 처방 접수", tone: "bg-surface-line text-[#3b5bdb]" },
  ];

  return (
    <section aria-labelledby="clinic-title" className="rounded-3xl bg-card p-5 shadow-card">
      <header className="flex items-center justify-between">
        <h2 id="clinic-title" className="text-base font-bold">
          내 주변 금연 치료 기관
        </h2>
        <span className="rounded-full bg-brand-mint/40 px-2.5 py-1 text-[11px] font-bold text-brand">반경 2km</span>
      </header>

      <button
        type="button"
        onClick={() => goTo("clinic")}
        className="group relative mt-4 block w-full text-left"
        aria-label="지도 크게 보기"
      >
        <MiniMap clinics={clinics} className="h-36" />
        <span className="absolute inset-x-0 bottom-0 flex items-center justify-between rounded-b-2xl bg-gradient-to-t from-black/60 to-transparent px-3 pb-2.5 pt-8 text-xs font-medium text-white">
          <span className="flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5" aria-hidden />
            현재 위치: {currentLocation} 인근
          </span>
          <span className="flex items-center gap-1 rounded-full bg-white/20 px-2 py-0.5 backdrop-blur transition group-hover:bg-white/30">
            <Expand className="h-3 w-3" aria-hidden />
            크게 보기
          </span>
        </span>
      </button>

      <div className="mt-3 grid grid-cols-2 gap-2.5">
        {summaries.map(({ icon: Icon, ...s }) => (
          <article key={s.label} className="flex items-center gap-3 rounded-2xl bg-surface-soft p-3">
            <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${s.tone}`}>
              <Icon className="h-5 w-5" aria-hidden />
            </span>
            <div className="min-w-0">
              <p className="text-[11px] text-ink-sub">{s.label}</p>
              <p className="text-sm font-bold">{s.value}</p>
              <p className="text-[11px] font-medium text-brand">{s.note}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};
