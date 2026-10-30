import { ChevronRightIcon } from "lucide-react";
import { Badge } from "../../../../components/ui/badge";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";

type Program = {
  rank: string;
  rankClassName: string;
  rankTextClassName: string;
  category: string;
  categoryClassName: string;
  categoryTextClassName: string;
  applications: string;
  image: string;
  title: string;
  description: string;
  benefitIcon: string;
  benefit: string;
  benefitClassName: string;
  action: string;
  actionClassName: string;
};

const programs: Program[] = [
  {
    rank: "1위",
    rankClassName: "bg-[#825100]",
    rankTextClassName: "text-white",
    category: "전액 국비 지원",
    categoryClassName: "bg-[#89f5e7]",
    categoryTextClassName: "text-[#00201d]",
    applications: "최근 14일 4,210명 신청",
    image:
      "/ab6axubf6rdg49wn1ex1cqfeidq7bouihlpbzmhjvkprjamrzglbqwlzroqlhppf.png",
    title: "보건복지부 12주 집중 금연치료 지원",
    description:
      "약물처방(바레니클린 등) + 전문의 심\n층상담 6회 본인부담금 100% 환급 지",
    benefitIcon: "/container-12.svg",
    benefit: "이수 시 본인부담금 100% 환급 + 축하선물",
    benefitClassName: "text-[#00685f]",
    action: "신청하기",
    actionClassName: "bg-[#00685f] text-white hover:bg-[#00564f]",
  },
  {
    rank: "2위",
    rankClassName: "bg-[#dae2fd]",
    rankTextClassName: "text-[#5c647a]",
    category: "지역 보건소",
    categoryClassName: "bg-[#dae2fd]",
    categoryTextClassName: "text-[#131b2e]",
    applications: "최근 14일 2,890명 신청",
    image:
      "/ab6axubxjxdwcjh7cgcgy1uk1hymis7me289io3cde11hl44ukpmylg6yk3lfa7-.png",
    title: "보건소 1:1 방문 금연클리닉",
    description:
      "니코틴 패치, 껌, 파이프 및 구강 청결\n행동요법 키트 무상 보급 및 6개월 관",
    benefitIcon: "/container.svg",
    benefit: "웰컴 키트 즉시 수령 가능",
    benefitClassName: "text-[#565e74]",
    action: "예약하기",
    actionClassName: "bg-[#dce9ff] text-[#0b1c30] hover:bg-[#cbdcff]",
  },
  {
    rank: "3위",
    rankClassName: "bg-[#dce9ff]",
    rankTextClassName: "text-[#0b1c30]",
    category: "비대면 코칭",
    categoryClassName: "bg-[#dce9ff]",
    categoryTextClassName: "text-[#3d4947]",
    applications: "최근 14일 1,450명 신청",
    image:
      "/ab6axuca9nxawrpadcjavl5lnaim7y9dx4xugwbonrdu4gfft7o2vlyr5drpk3xf.png",
    title: "청년·직장인 비대면 스마트 금연 코칭",
    description:
      "야간 및 주말 모바일 앱 화상 상담, 맞\n춤형 챗봇 알림으로 일상 속 니코틴…",
    benefitIcon: "/container-13.svg",
    benefit: "야간 시간대 예약 가능",
    benefitClassName: "text-[#565e74]",
    action: "신청하기",
    actionClassName: "bg-[#dce9ff] text-[#0b1c30] hover:bg-[#cbdcff]",
  },
];

export const RecommendedCessationProgramsSection = (): JSX.Element => {
  return (
    <section className="flex w-full flex-col items-start gap-2">
      <header className="flex w-full items-center justify-between gap-4">
        <div className="flex flex-col items-start gap-[5px] pb-[3px]">
          <h2 className="[font-family:'WenQuanYi_Zen_Hei-Medium',Helvetica] text-lg font-medium leading-[26px] tracking-[0] text-[#0b1c30]">
            맞춤 &amp; 인기 금연 지원 프로그램
          </h2>
          <p className="[font-family:'WenQuanYi_Zen_Hei-Medium',Helvetica] text-[11px] font-medium leading-[14px] tracking-[0] text-[#565e74]">
            건강보험공단 검증 · 최근 14일 신청 순위
          </p>
        </div>
        <Button
          type="button"
          variant="ghost"
          className="h-auto shrink-0 gap-0 p-0 text-[#00685f] hover:bg-transparent hover:text-[#00564f]"
        >
          <span className="[font-family:'WenQuanYi_Zen_Hei-Medium',Helvetica] text-xs font-medium leading-4">
            전체보기
          </span>
          <ChevronRightIcon className="h-4 w-4" aria-hidden="true" />
        </Button>
      </header>
      <div className="flex w-full flex-col items-start gap-2 pt-1">
        {programs.map((program) => (
          <Card
            key={program.rank}
            className="w-full overflow-hidden rounded-xl border-0 bg-white shadow-[0px_1px_2px_#0000000d]"
          >
            <CardContent className="flex flex-col items-start gap-2 p-4">
              <div className="flex w-full items-start justify-between gap-2">
                <div className="flex min-w-0 items-center gap-2">
                  <div
                    className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md ${program.rankClassName}`}
                  >
                    <span
                      className={`[font-family:'Public_Sans',Helvetica] text-center text-[11px] font-bold leading-[14px] ${program.rankTextClassName}`}
                    >
                      {program.rank}
                    </span>
                  </div>
                  <Badge
                    className={`h-auto rounded-full px-2 py-0.5 [font-family:'WenQuanYi_Zen_Hei-Medium',Helvetica] text-[11px] font-medium leading-[14px] shadow-none hover:${program.categoryClassName} ${program.categoryClassName} ${program.categoryTextClassName}`}
                  >
                    {program.category}
                  </Badge>
                </div>
                <span className="[font-family:'Public_Sans',Helvetica] shrink-0 text-[11px] font-medium leading-[14px] text-[#565e74]">
                  {program.applications}
                </span>
              </div>
              <div className="flex w-full items-center gap-4 pt-1">
                <div
                  aria-hidden="true"
                  className="h-20 w-20 shrink-0 rounded-lg bg-cover bg-center"
                  style={{ backgroundImage: `url(${program.image})` }}
                />
                <div className="min-w-0 flex-1">
                  <h3 className="[font-family:'WenQuanYi_Zen_Hei-Medium',Helvetica] text-base font-medium leading-6 text-[#0b1c30]">
                    {program.title}
                  </h3>
                  <p className="whitespace-pre-line pt-0.5 [font-family:'WenQuanYi_Zen_Hei-Medium',Helvetica] text-sm font-medium leading-[22px] text-[#3d4947]">
                    {program.description}
                  </p>
                </div>
              </div>
              <div className="flex w-full items-center justify-between gap-2 pt-2">
                <div className="flex min-w-0 items-center gap-1">
                  <img
                    className="h-4 w-4 shrink-0 object-contain"
                    alt=""
                    src={program.benefitIcon}
                  />
                  <span
                    className={`truncate [font-family:'WenQuanYi_Zen_Hei-Medium',Helvetica] text-[11px] font-medium leading-[14px] ${program.benefitClassName}`}
                  >
                    {program.benefit}
                  </span>
                </div>
                <Button
                  type="button"
                  className={`h-auto shrink-0 rounded-lg px-3 py-1.5 [font-family:'WenQuanYi_Zen_Hei-Medium',Helvetica] text-xs font-medium leading-4 shadow-none ${program.actionClassName}`}
                >
                  {program.action}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};
