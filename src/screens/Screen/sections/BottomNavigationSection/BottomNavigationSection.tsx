import { useState } from "react";
import { Button } from "../../../../components/ui/button";

type NavigationItem = {
  id: string;
  label?: string;
  icon: string;
  alt: string;
};

const navigationItems: NavigationItem[] = [
  {
    id: "home",
    icon: "/link.svg",
    alt: "홈",
  },
  {
    id: "plan",
    label: "진단·플랜",
    icon: "/container-16.svg",
    alt: "진단·플랜",
  },
  {
    id: "clinic",
    label: "클리닉 찾기",
    icon: "/container-15.svg",
    alt: "클리닉 찾기",
  },
  {
    id: "profile",
    label: "내 정보",
    icon: "/container-14.svg",
    alt: "내 정보",
  },
];

export const BottomNavigationSection = (): JSX.Element => {
  const [activeItem, setActiveItem] = useState("home");

  return (
    <nav
      aria-label="하단 내비게이션"
      className="fixed inset-x-0 bottom-0 z-50 w-full border-t-0 bg-[#f8f9ffe6] shadow-[0px_-2px_12px_#0000000d] backdrop-blur-xl backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(24px)_brightness(100%)]"
    >
      <div className="grid h-16 w-full grid-cols-4 items-center px-1">
        {navigationItems.map((item) => {
          const isActive = activeItem === item.id;

          return (
            <Button
              key={item.id}
              type="button"
              variant="ghost"
              h-auto
              aria-label={item.label ?? item.alt}
              aria-current={isActive ? "page" : undefined}
              onClick={() => setActiveItem(item.id)}
              className="flex h-12 min-w-16 flex-col items-center justify-center gap-0.5 rounded-none px-2 py-0 text-[#3d4947] hover:bg-transparent hover:text-[#3d4947] focus-visible:ring-1 focus-visible:ring-[#3d4947]"
            >
              <img
                className="block h-auto w-auto max-h-6 max-w-7 object-contain"
                src={item.icon}
                alt=""
                aria-hidden="true"
              />
              {item.label ? (
                <span className="font-['WenQuanYi_Zen_Hei-Medium',Helvetica] text-[11px] font-medium leading-[14px] tracking-[0] whitespace-nowrap">
                  {item.label}
                </span>
              ) : null}
            </Button>
          );
        })}
      </div>
    </nav>
  );
};
