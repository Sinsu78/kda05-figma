import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";

const clinicSummaries = [
  {
    icon: "/overlay-3.svg",
    label: <>관할 보건소</>,
    value: (
      <>
        1개소 운
        <br />
        영중
      </>
    ),
    description: (
      <>
        대기 없이 상
        <br />담 가능
      </>
    ),
  },
  {
    icon: "/overlay-2.svg",
    label: (
      <>
        지정 이비인
        <br />
        후과·내과
      </>
    ),
    value: (
      <>
        8개소 진
        <br />
        료중
      </>
    ),
    description: (
      <>
        실시간 무료
        <br />
        처방 접수
      </>
    ),
  },
];

export const NearbyCessationClinicsSection = (): JSX.Element => {
  return (
    <Card className="w-full rounded-xl border-0 bg-white shadow-[0px_1px_2px_#0000000d]">
      <CardContent className="flex flex-col gap-4 p-6">
        <header className="flex w-full items-center justify-between">
          <div className="flex items-center gap-1.5">
            <img
              className="h-auto w-auto shrink-0"
              src="/container-8.svg"
              alt=""
              aria-hidden="true"
            />
            <h2 className="[font-family:'WenQuanYi_Zen_Hei-Medium',Helvetica] text-lg font-medium leading-[26px] tracking-[0] text-[#0b1c30]">
              내 주변 금연 치료 기관 현
              <br />황
            </h2>
          </div>
          <span className="inline-flex shrink-0 flex-col items-start rounded-full bg-[#89f5e7] px-2 pb-0.5 pr-[14.27px] pt-0.5 [font-family:'Public_Sans',Helvetica] text-[11px] font-medium leading-[14px] tracking-[0] text-[#00201d]">
            반경 2km 이
            <br />내
          </span>
        </header>
        <div
          className="h-32 w-full overflow-hidden rounded-lg bg-cover bg-center shadow-[inset_0px_2px_4px_#0000000d]"
          style={{
            backgroundImage: "url('/map-preview-placeholder-block.png')",
          }}
        >
          <div className="flex h-full w-full items-end bg-[linear-gradient(0deg,rgba(33,49,69,0.8)_0%,rgba(33,49,69,0)_50%,rgba(33,49,69,0)_100%)] p-4">
            <div className="flex min-w-0 flex-1 items-center justify-between gap-3">
              <div className="flex min-w-0 items-center gap-1">
                <img
                  className="h-auto w-auto shrink-0"
                  src="/container-18.svg"
                  alt=""
                  aria-hidden="true"
                />
                <span className="truncate [font-family:'WenQuanYi_Zen_Hei-Medium',Helvetica] text-xs font-medium leading-4 tracking-[0] text-[#eaf1ff]">
                  현재 위치: 강남구 역삼1동 인근
                </span>
              </div>
              <Button
                type="button"
                variant="ghost"
                className="h-auto shrink-0 p-0 [font-family:'WenQuanYi_Zen_Hei-Medium',Helvetica] text-[11px] font-medium leading-[14px] text-[#eaf1ff] underline hover:bg-transparent hover:text-white"
              >
                지도 크게보기
              </Button>
            </div>
          </div>
        </div>
        <div className="grid w-full grid-cols-2 gap-2 pt-1">
          {clinicSummaries.map((clinic) => (
            <article
              key={clinic.icon}
              className="flex min-w-0 items-center gap-3 rounded-lg bg-[#eff4ff] p-4"
            >
              <img
                className="h-10 w-10 shrink-0"
                src={clinic.icon}
                alt=""
                aria-hidden="true"
              />
              <div className="min-w-0">
                <p className="[font-family:'WenQuanYi_Zen_Hei-Medium',Helvetica] text-[11px] font-medium leading-[14px] tracking-[0] text-[#565e74]">
                  {clinic.label}
                </p>
                <p className="mt-[-0.5px] [font-family:'WenQuanYi_Zen_Hei-Medium',Helvetica] text-base font-medium leading-6 tracking-[0] text-[#0b1c30]">
                  {clinic.value}
                </p>
                <p className="pt-[3px] [font-family:'WenQuanYi_Zen_Hei-Medium',Helvetica] text-[11px] font-medium leading-[14px] tracking-[0] text-[#00685f]">
                  {clinic.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
