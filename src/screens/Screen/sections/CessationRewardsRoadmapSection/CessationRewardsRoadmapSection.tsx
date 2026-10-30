import { Card, CardContent, CardHeader } from "../../../../components/ui/card";

type Milestone = {
  title: string;
  description: string;
  image?: string;
  number?: string;
  completed?: boolean;
  titleClassName: string;
  descriptionClassName: string;
};

const milestones: Milestone[] = [
  {
    title: "시작 (3일)",
    description: "금단기 진입",
    image: "/background-shadow-1.svg",
    completed: true,
    titleClassName: "font-bold text-[#0b1c30]",
    descriptionClassName: "font-medium text-[#565e74]",
  },
  {
    title: "14일차",
    description: "혈류 개선",
    image: "/background-shadow.svg",
    completed: true,
    titleClassName: "font-bold text-[#00685f]",
    descriptionClassName: "font-medium text-[#00685f]",
  },
  {
    title: "4주차",
    description: "폐기능 회복",
    number: "3",
    titleClassName: "font-medium text-[#0b1c30]",
    descriptionClassName: "font-medium text-[#565e74]",
  },
  {
    title: "12주 수료",
    description: "인센티브 지급",
    image: "/background-shadow-2.svg",
    titleClassName: "font-medium text-[#0b1c30]",
    descriptionClassName: "font-medium text-[#565e74]",
  },
];

export const CessationRewardsRoadmapSection = (): JSX.Element => {
  return (
    <Card className="w-full rounded-xl border-0 bg-[#eff4ff] shadow-[0px_1px_2px_#0000000d]">
      <CardHeader className="flex flex-row items-start justify-between gap-4 p-6 pb-0">
        <div className="flex min-w-0 items-start gap-1.5">
          <img
            className="mt-1 h-5 w-5 shrink-0"
            alt="Container"
            src="/container-4.svg"
          />
          <h2 className="[font-family:'WenQuanYi_Zen_Hei-Medium',Helvetica] text-lg font-medium leading-[26px] tracking-[0] text-[#0b1c30]">
            국가 금연 단계별 보상 로드
            <br />맵
          </h2>
        </div>
        <p className="shrink-0 pt-1 [font-family:'WenQuanYi_Zen_Hei-Medium',Helvetica] text-[11px] font-medium leading-[14px] tracking-[0] text-[#00685f]">
          2단계 완
          <br />료
        </p>
      </CardHeader>
      <CardContent className="px-6 pb-6 pt-6">
        <ol
          aria-label="금연 단계별 보상 로드맵"
          className="flex w-full items-start"
        >
          {milestones.map((milestone, index) => (
            <li
              key={milestone.title}
              className="flex min-w-0 flex-1 items-start"
            >
              <div className="flex min-w-0 flex-1 flex-col items-center gap-1 text-center">
                {milestone.image ? (
                  <img
                    className="h-8 w-8 shrink-0"
                    alt=""
                    aria-hidden="true"
                    src={milestone.image}
                  />
                ) : (
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white shadow-[0px_1px_2px_#0000000d]">
                    <span className="[font-family:'Public_Sans',Helvetica] text-[11px] font-bold leading-[14px] text-[#565e74]">
                      {milestone.number}
                    </span>
                  </span>
                )}

                <span
                  className={`whitespace-nowrap [font-family:'Public_Sans',Helvetica] text-[11px] text-center leading-[14px] tracking-[0] ${milestone.titleClassName}`}
                >
                  {milestone.title}
                </span>
                <span
                  className={`whitespace-nowrap [font-family:'WenQuanYi_Zen_Hei-Medium',Helvetica] text-[11px] text-center leading-[14px] tracking-[0] ${milestone.descriptionClassName}`}
                >
                  {milestone.description}
                </span>
              </div>
              {index < milestones.length - 1 && (
                <span
                  aria-hidden="true"
                  className={`mt-4 h-1 min-w-2 flex-1 ${
                    index === 0 || index === 1 ? "bg-[#00685f]" : "bg-[#dce9ff]"
                  }`}
                />
              )}
            </li>
          ))}
        </ol>
      </CardContent>
    </Card>
  );
};
