import { Badge } from "../../../../components/ui/badge";
import { Card, CardContent } from "../../../../components/ui/card";

const fundingLabels = [
  {
    text: "국민건강증진기금 전액지원",
    highlighted: true,
  },
  {
    text: "국가지원 공공의료",
    highlighted: false,
  },
];

export const SmokingCessationFundingSection = (): JSX.Element => {
  return (
    <Card className="w-full rounded-xl border-0 bg-[#eff4ff] p-4 shadow-[0px_1px_2px_#0000000d]">
      <CardContent className="flex items-start gap-2 p-0">
        <img className="h-[34px] w-8 shrink-0" src="/margin.svg" alt="Margin" />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-x-[6px] gap-y-[6px]">
            {fundingLabels.map((label) =>
              label.highlighted ? (
                <Badge
                  key={label.text}
                  className="h-auto rounded-full bg-[#89f5e7] px-2 py-0.5 [font-family:'WenQuanYi_Zen_Hei-Medium',Helvetica] text-[11px] font-medium leading-[14px] text-[#00201d] hover:bg-[#89f5e7]"
                >
                  {label.text}
                </Badge>
              ) : (
                <span
                  key={label.text}
                  className="[font-family:'WenQuanYi_Zen_Hei-Medium',Helvetica] text-[11px] font-medium leading-[14px] text-[#565e74]"
                >
                  {label.text}
                </span>
              ),
            )}
          </div>
          <p className="pt-[3.25px] [font-family:'WenQuanYi_Zen_Hei-Medium',Helvetica] text-sm font-medium leading-[19.2px] text-[#3d4947]">
            담배 제세부담금 인상분(증가 세수 10%)으로
            <br />
            전액 무상 지원되는 국가 금연 프로그램입니
            <br />
            다.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
