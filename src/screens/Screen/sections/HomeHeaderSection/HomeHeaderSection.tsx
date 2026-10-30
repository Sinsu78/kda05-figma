export const HomeHeaderSection = (): JSX.Element => {
  return (
    <header className="flex w-full items-start bg-[#f8f9ffd9] shadow-[0px_1px_8px_#0000000a] backdrop-blur-xl backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(24px)_brightness(100%)]">
      <div className="flex h-16 w-full items-center gap-2 px-4">
        <div className="flex min-w-0 flex-1 items-center gap-2">
          <img className="h-9 w-9 shrink-0" src="/overlay.svg" alt="Overlay" />
          <div className="flex shrink-0 flex-col items-start">
            <span className="[font-family:'WenQuanYi_Zen_Hei-Medium',Helvetica] text-[11px] font-medium leading-[14px] text-[#565e74]">
              보건복지부 국가금연지원센터
            </span>
            <span className="[font-family:'Public_Sans',Helvetica] text-base font-semibold leading-6 text-[#0b1c30]">
              Home
            </span>
          </div>
        </div>
        <img className="shrink-0" src="/container-11.svg" alt="Container" />
      </div>
    </header>
  );
};
