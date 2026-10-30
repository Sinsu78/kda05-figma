import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";
import { Progress } from "../../../../components/ui/progress";

const summaryCards = [
  {
    icon: "/container-1.svg",
    label: "누적 절약 금액",
    value: "91,000원",
    description: (
      <>
        2028년 인상 기준
        <br />
        (6,500원/갑)
      </>
    ),
  },
  {
    icon: "/container-6.svg",
    label: "연장된 기대수명",
    value: (
      <>
        +35시
        <br />간
      </>
    ),
    valueClassName: "text-[#825100]",
    additionalValue: (
      <>
        회복 순
        <br />항
      </>
    ),
    description: (
      <>
        심혈관 부담률 42% 경
        <br />감
      </>
    ),
  },
];

export const CessationProgressSection = (): JSX.Element => {
  return (
    <Card className="relative w-full overflow-hidden rounded-xl border-0 bg-white shadow-[0px_2px_4px_-2px_#0000001a,0px_4px_6px_-1px_#0000001a]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-12 -top-12 h-44 w-44 rounded-full bg-[#89f5e733] blur-2xl"
      />
      <CardContent className="relative flex flex-col gap-4 p-6">
        <header className="flex w-full items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="inline-flex items-center gap-1 rounded-full bg-[#008378] px-2.5 py-1">
              <img
                className="h-3 w-3 shrink-0"
                alt=""
                aria-hidden="true"
                src="/container-17.svg"
              />
              <span className="[font-family:'WenQuanYi_Zen_Hei-Medium',Helvetica] text-xs font-medium leading-4 text-[#f4fffc]">
                건강 회복 중
              </span>
            </div>
            <span className="[font-family:'WenQuanYi_Zen_Hei-Medium',Helvetica] text-xs font-medium leading-4 text-[#565e74]">
              연속 달성
            </span>
          </div>
          <Button
            type="button"
            variant="ghost"
            className="h-auto gap-0.5 p-0 text-xs font-medium leading-4 text-[#00685f] hover:bg-transparent hover:text-[#00685f]"
          >
            기록 인증
            <img
              className="h-3 w-3 shrink-0"
              alt=""
              aria-hidden="true"
              src="/container-7.svg"
            />
          </Button>
        </header>
        <section className="flex min-h-[72px] w-full items-start justify-between gap-4">
          <div className="flex flex-col items-start gap-0.5">
            <h2 className="[font-family:'WenQuanYi_Zen_Hei-Medium',Helvetica] text-lg font-medium leading-[26px] text-[#565e74]">
              김건강 님의 도약
            </h2>
            <div className="flex items-baseline gap-1">
              <strong className="[font-family:'Public_Sans',Helvetica] text-[32px] font-extrabold leading-10 tracking-[-0.8px] text-[#00685f]">
                금연 14
              </strong>
              <span className="[font-family:'WenQuanYi_Zen_Hei-Medium',Helvetica] text-xl font-medium leading-7 text-[#0b1c30]">
                일차
              </span>
            </div>
          </div>
          <div className="flex flex-col items-end pt-2 text-right">
            <span className="[font-family:'WenQuanYi_Zen_Hei-Medium',Helvetica] text-[11px] font-medium leading-[14px] text-[#565e74]">
              절약된 흡연 시간
            </span>
            <span className="[font-family:'WenQuanYi_Zen_Hei-Medium',Helvetica] text-base font-medium leading-6 text-[#00685f]">
              28시간 절약
            </span>
          </div>
        </section>
        <section
          className="grid grid-cols-1 gap-2 pt-1 sm:grid-cols-2"
          aria-label="금연 성과 요약"
        >
          {summaryCards.map((card) => (
            <article
              key={card.label}
              className="flex min-h-[148px] flex-col items-start justify-between rounded-lg bg-[#eff4ff] p-4"
            >
              <div className="flex items-center gap-1 pb-1">
                <img
                  className="h-3.5 w-3.5 shrink-0"
                  alt=""
                  aria-hidden="true"
                  src={card.icon}
                />
                <span className="[font-family:'WenQuanYi_Zen_Hei-Medium',Helvetica] text-[11px] font-medium leading-[14px] text-[#565e74]">
                  {card.label}
                </span>
              </div>
              <div className="flex w-full flex-col items-start gap-0.5">
                <div className="flex items-start gap-4">
                  <strong
                    className={`[font-family:'Public_Sans',Helvetica] text-lg font-semibold leading-[26px] ${card.valueClassName ?? "text-[#0b1c30]"}`}
                  >
                    {card.value}
                  </strong>
                  {card.additionalValue && (
                    <span className="[font-family:'WenQuanYi_Zen_Hei-Medium',Helvetica] pt-2 text-[11px] font-medium leading-[14px] text-[#00685f]">
                      {card.additionalValue}
                    </span>
                  )}
                </div>
                <p className="[font-family:'WenQuanYi_Zen_Hei-Medium',Helvetica] text-[11px] font-medium leading-[14px] text-[#3d4947]">
                  {card.description}
                </p>
              </div>
            </article>
          ))}
        </section>
        <section
          className="flex w-full flex-col gap-2 pt-2"
          aria-labelledby="recovery-progress-title"
        >
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-1.5">
              <img
                className="h-3.5 w-3.5 shrink-0"
                alt=""
                aria-hidden="true"
                src="/container-9.svg"
              />
              <h3
                id="recovery-progress-title"
                className="[font-family:'WenQuanYi_Zen_Hei-Medium',Helvetica] text-xs font-medium leading-4 text-[#0b1c30]"
              >
                기관지 및 폐 정화율 지표
              </h3>
            </div>
            <div className="flex items-baseline gap-1">
              <strong className="[font-family:'Public_Sans',Helvetica] text-base font-semibold leading-6 text-[#00685f]">
                74%
              </strong>
              <span className="[font-family:'Public_Sans',Helvetica] text-[11px] font-medium leading-[14px] text-[#565e74]">
                / 100%
              </span>
            </div>
          </div>
          <Progress
            value={73.05}
            className="h-3 rounded-full bg-[#dce9ff] [&>div]:bg-[linear-gradient(90deg,rgba(137,245,231,1)_0%,rgba(0,104,95,1)_100%)]"
          />
          <div className="flex items-start justify-between gap-3">
            <span className="[font-family:'WenQuanYi_Zen_Hei-Medium',Helvetica] text-[11px] font-medium leading-[14px] text-[#565e74]">
              일산화탄소 정상치 회복
            </span>
            <span className="text-right [font-family:'WenQuanYi_Zen_Hei-Medium',Helvetica] text-[11px] font-medium leading-[14px] text-[#565e74]">
              섬모 운동 재생 중 (목표 21일)
            </span>
          </div>
        </section>
      </CardContent>
    </Card>
  );
};
