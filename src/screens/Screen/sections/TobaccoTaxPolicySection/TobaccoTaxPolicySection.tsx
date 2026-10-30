import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";

const policyContent = {
  title: (
    <>
      담배 가격 정책 및 금연 기금 투명 사용 공
      <br />시
    </>
  ),
  description: (
    <>
      국민건강증진법 제25조에 의거하여 조성된 담배 부
      <br />
      담금은 전액 금연 상담전화, 금연치료 지원, 학교 흡연
      <br />
      예방 사업 및 공공 금연캠페인에 투명하게 집행되고
      <br />
      있습니다.
    </>
  ),
  report: (
    <>
      2028년 담배 제세부담금 운용보
      <br />
      고서
    </>
  ),
  notice: (
    <>
      보건복지부 고시 제2024-
      <br />
      88호
    </>
  ),
};

export const TobaccoTaxPolicySection = (): JSX.Element => {
  return (
    <section
      className="w-full pt-1"
      aria-label="담배 가격 정책 및 금연 기금 투명 사용 공시"
    >
      <Card className="w-full rounded-xl border-0 bg-white shadow-[0px_1px_2px_#0000000d]">
        <CardContent className="flex flex-col gap-2 p-4">
          <header className="flex w-full items-center gap-2">
            <img
              className="h-auto w-auto shrink-0"
              src="/container-3.svg"
              alt=""
              aria-hidden="true"
            />
            <h2 className="font-['WenQuanYi_Zen_Hei-Medium',Helvetica] text-base font-medium leading-6 tracking-[0] text-[#0b1c30]">
              {policyContent.title}
            </h2>
          </header>
          <p className="font-['WenQuanYi_Zen_Hei-Medium',Helvetica] text-sm font-medium leading-[22.8px] tracking-[0] text-[#3d4947]">
            {policyContent.description}
          </p>
          <footer className="flex w-full items-center justify-between gap-3 pt-2">
            <Button
              type="button"
              variant="ghost"
              className="h-auto shrink-0 items-center gap-0.5 p-0 text-left hover:bg-transparent"
              aria-label="2028년 담배 제세부담금 운용보고서 보기"
            >
              <span className="pr-[3.73px] font-['WenQuanYi_Zen_Hei-Medium',Helvetica] text-xs font-medium leading-4 tracking-[0] text-[#00685f]">
                {policyContent.report}
              </span>
              <img
                className="h-auto w-auto shrink-0"
                src="/container-2.svg"
                alt=""
                aria-hidden="true"
              />
            </Button>
            <p className="shrink-0 font-['Public_Sans',Helvetica] text-[11px] font-medium leading-[14px] tracking-[0] text-[#565e74]">
              {policyContent.notice}
            </p>
          </footer>
        </CardContent>
      </Card>
    </section>
  );
};
