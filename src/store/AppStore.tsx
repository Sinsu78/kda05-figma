import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { demoProfile, toDateKey, type Profile } from "../data/mock";
import { submitRecord } from "../lib/api";

/**
 * 앱 전역 상태 + localStorage 영속화.
 * 실서비스라면 이 상태 대부분이 서버(DB)에 저장되고, 여기는 API 호출로 바뀐다.
 * 저장하는 건 "사실"(프로필, 인증 날짜, 신청 내역)뿐이고
 * 금연 일수·절약 금액 같은 "파생 값"은 저장하지 않고 매번 계산한다.
 */

export type Theme = "system" | "light" | "dark";

export type Application = { programId: string; date: string; phone: string; time: string };
export type Reservation = { clinicId: string; date: string; time: string };

type PersistedState = {
  profile: Profile | null;
  checkIns: string[]; // YYYY-MM-DD
  applications: Application[];
  reservations: Reservation[];
  readNotices: string[];
  sosCount: number;
  notify: boolean;
  theme: Theme;
};

const STORAGE_KEY = "kda05:state:v1";

const initialState: PersistedState = {
  profile: null,
  checkIns: [],
  applications: [],
  reservations: [],
  readNotices: [],
  sosCount: 0,
  notify: true,
  theme: "system",
};

const load = (): PersistedState => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? { ...initialState, ...JSON.parse(raw) } : initialState;
  } catch {
    return initialState;
  }
};

const DAY = 86_400_000;

/** 프로필로부터 계산되는 통계 */
export const computeStats = (profile: Profile, today = new Date()) => {
  const start = new Date(`${profile.quitDate}T00:00:00`);
  const todayStart = new Date(`${toDateKey(today)}T00:00:00`);
  const dayNumber = Math.max(1, Math.floor((todayStart.getTime() - start.getTime()) / DAY) + 1);
  const cigarettes = dayNumber * profile.cigarettesPerDay;
  return {
    dayNumber,
    cigarettesAvoided: cigarettes,
    savedMoney: Math.round(((cigarettes / 20) * profile.packPrice) / 100) * 100,
    savedHours: Math.round((cigarettes * 5) / 60), // 1개비 약 5분
    lifeGainedHours: Math.round((cigarettes * 11) / 60), // 1개비당 기대수명 약 11분
    cardioRiskDown: Math.min(50, dayNumber * 3),
    lungRecovery: Math.min(100, Math.round(20 + dayNumber * 3.8)),
  };
};

export type Stats = ReturnType<typeof computeStats>;

const useStoreValue = () => {
  const [state, setState] = useState<PersistedState>(load);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      /* 시크릿 모드 등 저장 불가 환경은 메모리로만 동작 */
    }
  }, [state]);

  const today = toDateKey(new Date());
  const stats = useMemo(() => (state.profile ? computeStats(state.profile) : null), [state.profile]);
  const dayNumber = stats?.dayNumber;

  const update = useCallback(
    (patch: Partial<PersistedState> | ((s: PersistedState) => Partial<PersistedState>)) =>
      setState((s) => ({ ...s, ...(typeof patch === "function" ? patch(s) : patch) })),
    [],
  );

  const actions = useMemo(
    () => ({
      completeOnboarding: (profile: Profile) => update({ profile }),
      startDemo: () => {
        const profile = demoProfile();
        const checkIns: string[] = [];
        const d = new Date(`${profile.quitDate}T00:00:00`);
        // 데모: 어제까지 대부분 인증, 하루 빼먹음
        for (let i = 0; i < 13; i++) {
          if (i !== 5) checkIns.push(toDateKey(d));
          d.setDate(d.getDate() + 1);
        }
        update({ profile, checkIns, sosCount: 3, readNotices: [] });
      },
      checkIn: () => {
        update((s) => (s.checkIns.includes(today) ? {} : { checkIns: [...s.checkIns, today] }));
        // 인증은 화면을 먼저 갱신하고 서버 저장은 뒤에서 (실패해도 사용자 흐름은 막지 않음)
        if (dayNumber) void submitRecord("check_in", { check_date: today, day_number: dayNumber });
      },
      apply: (a: Omit<Application, "date">) =>
        update((s) => ({
          applications: [...s.applications.filter((x) => x.programId !== a.programId), { ...a, date: today }],
        })),
      reserve: (r: Reservation) =>
        update((s) => ({ reservations: [...s.reservations.filter((x) => x.clinicId !== r.clinicId), r] })),
      readNotice: (id: string) =>
        update((s) => (s.readNotices.includes(id) ? {} : { readNotices: [...s.readNotices, id] })),
      readAll: (ids: string[]) => update({ readNotices: ids }),
      addSos: () => update((s) => ({ sosCount: s.sosCount + 1 })),
      setNotify: (notify: boolean) => update({ notify }),
      setTheme: (theme: Theme) => update({ theme }),
      reset: () => setState(initialState),
    }),
    [update, today, dayNumber],
  );

  return { ...state, today, stats, checkedInToday: state.checkIns.includes(today), ...actions };
};

type Store = ReturnType<typeof useStoreValue>;
const StoreContext = createContext<Store | null>(null);

export const AppStoreProvider = ({ children }: { children: ReactNode }) => {
  const store = useStoreValue();
  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>;
};

export const useStore = () => {
  const store = useContext(StoreContext);
  if (!store) throw new Error("useStore는 AppStoreProvider 안에서만 쓸 수 있어요");
  return store;
};

/** 온보딩이 끝난 화면에서만 쓰는 훅 (profile/stats가 항상 존재) */
export const useProfile = () => {
  const store = useStore();
  if (!store.profile || !store.stats) throw new Error("프로필이 없어요");
  return { ...store, profile: store.profile, stats: store.stats };
};
