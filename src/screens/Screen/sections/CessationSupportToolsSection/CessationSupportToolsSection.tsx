import { Badge } from "../../../../components/ui/badge";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";

const supportTools = [
  {
    icon: "/background.svg",
    badge: "23곳",
    badgeClassName: "bg-[#89f5e7] text-[#00201d]",
    title: "내 주변 클리닉",
    description: "보건소 및 지정병원",
  },
  {
    icon: "/background-1.svg",
    badge: "자가진단",
    badgeClassName: "bg-[#dce9ff] text-[#0b1c30]",
    title: "맞춤 설문 다시하기",
    description: "니코틴 의존도 재평가",
  },
];

const handleCardKeyDown = (event: React.KeyboardEvent<HTMLElement>): void => {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    event.currentTarget.click();
  }
};

export const CessationSupportToolsSection = (): JSX.Element => {
  return (
    <section className="flex w-full flex-col items-start gap-2">
      <header className="flex w-full items-center justify-between">
        <h2 className="[font-family:'WenQuanYi_Zen_Hei-Medium',Helvetica] text-base font-medium leading-6 text-[#0b1c30]">
          금연 집중 솔루션
        </h2>
        <p className="[font-family:'WenQuanYi_Zen_Hei-Medium',Helvetica] text-[11px] font-medium leading-[14px] text-[#565e74]">
          24시간 상시 지원
        </p>
      </header>
      <Button
        type="button"
        className="h-auto w-full justify-between rounded-xl border-0 bg-[#ba1a1a] p-4 text-left text-white shadow-[0px_2px_4px_-2px_#0000001a,0px_4px_6px_-1px_#0000001a] hover:bg-[#a81717]"
        aria-label="긴급 흡연 욕구 참기 SOS"
      >
        <span className="flex min-w-0 items-center gap-4">
          <img
            className="h-12 w-12 shrink-0"
            src="/overlay-1.svg"
            alt=""
            aria-hidden="true"
          />
          <span className="flex min-w-0 flex-col items-start gap-1">
            <span className="[font-family:'WenQuanYi_Zen_Hei-Medium',Helvetica] text-lg font-medium leading-[26px]">
              긴급 흡연 욕구 참기 SOS
            </span>
            <span className="[font-family:'WenQuanYi_Zen_Hei-Medium',Helvetica] text-xs font-medium leading-4 text-[#ffffffe6]">
              3분 호흡 이완 코칭 · 즉시 상담 연결
            </span>
          </span>
        </span>
        <img
          className="shrink-0"
          src="/container-10.svg"
          alt=""
          aria-hidden="true"
        />
      </Button>
      <div className="grid w-full grid-cols-2 gap-2">
        {supportTools.map((tool) => (
          <Card
            key={tool.title}
            role="button"
            tabIndex={0}
            onKeyDown={handleCardKeyDown}
            className="cursor-pointer rounded-xl border-0 bg-white shadow-[0px_1px_2px_#0000000d] transition-shadow hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0b1c30] focus-visible:ring-offset-2"
          >
            <CardContent className="flex min-h-[116px] flex-col justify-between p-4">
              <div className="flex items-start justify-between gap-2 pb-2">
                <img
                  className="h-10 w-10 shrink-0"
                  src={tool.icon}
                  alt=""
                  aria-hidden="true"
                />
                <Badge
                  className={`h-auto rounded-full px-2 py-0.5 [font-family:'WenQuanYi_Zen_Hei-Medium',Helvetica] text-[11px] font-medium leading-[14px] shadow-none ${tool.badgeClassName}`}
                >
                  {tool.badge}
                </Badge>
              </div>
              <div className="flex flex-col items-start gap-[5px]">
                <h3 className="[font-family:'WenQuanYi_Zen_Hei-Medium',Helvetica] text-base font-medium leading-6 text-[#0b1c30]">
                  {tool.title}
                </h3>
                <p className="[font-family:'WenQuanYi_Zen_Hei-Medium',Helvetica] text-[11px] font-medium leading-[14px] text-[#565e74]">
                  {tool.description}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};
