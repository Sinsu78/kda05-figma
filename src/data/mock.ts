/**
 * 프로토타입용 목(mock) 데이터.
 * 화면 컴포넌트는 이 파일의 타입/데이터만 바라보므로,
 * 나중에 백엔드 API가 생기면 여기를 fetch 호출로 교체하면 된다.
 */

export type User = {
  name: string;
  quitDate: string; // ISO date
  cigarettesPerDay: number;
  packPrice: number;
};

export const user: User = {
  name: "김건강",
  quitDate: "2026-10-16",
  cigarettesPerDay: 14,
  packPrice: 6500,
};

export type ProgressStats = {
  quitDays: number;
  savedMoney: number;
  savedHours: number;
  lifeGainedHours: number;
  cardioRiskDown: number; // %
  lungRecovery: number; // %
};

export const stats: ProgressStats = {
  quitDays: 14,
  savedMoney: 91000,
  savedHours: 28,
  lifeGainedHours: 35,
  cardioRiskDown: 42,
  lungRecovery: 74,
};

export type Milestone = {
  day: number;
  title: string;
  description: string;
  reward: string;
};

export const milestones: Milestone[] = [
  { day: 3, title: "시작", description: "금단기 진입", reward: "응원 배지" },
  { day: 14, title: "2주", description: "혈류 개선", reward: "금연 키트" },
  { day: 28, title: "4주", description: "폐기능 회복", reward: "모바일 상품권 1만원" },
  { day: 84, title: "12주 수료", description: "인센티브 지급", reward: "본인부담금 100% 환급" },
];

export type ProgramTone = "brand" | "blue" | "violet";

export type Program = {
  id: string;
  category: string;
  applicants: number;
  title: string;
  description: string;
  benefit: string;
  action: string;
  tone: ProgramTone;
  icon: "pill" | "building" | "video";
};

export const programs: Program[] = [
  {
    id: "12week",
    category: "전액 국비 지원",
    applicants: 4210,
    title: "보건복지부 12주 집중 금연치료",
    description: "약물처방(바레니클린 등)과 전문의 심층상담 6회, 본인부담금 100% 환급",
    benefit: "이수 시 본인부담금 환급 + 축하선물",
    action: "신청하기",
    tone: "brand",
    icon: "pill",
  },
  {
    id: "clinic",
    category: "지역 보건소",
    applicants: 2890,
    title: "보건소 1:1 방문 금연클리닉",
    description: "니코틴 패치·껌·행동요법 키트를 무상 보급하고 6개월간 관리",
    benefit: "웰컴 키트 즉시 수령",
    action: "예약하기",
    tone: "blue",
    icon: "building",
  },
  {
    id: "remote",
    category: "비대면 코칭",
    applicants: 1450,
    title: "청년·직장인 스마트 금연 코칭",
    description: "야간·주말 화상 상담과 맞춤형 알림으로 일상 속 흡연 욕구 관리",
    benefit: "야간 시간대 예약 가능",
    action: "신청하기",
    tone: "violet",
    icon: "video",
  },
];

export type Clinic = {
  id: string;
  name: string;
  type: "보건소" | "지정병원";
  distanceKm: number;
  address: string;
  status: "open" | "busy" | "closed";
  waitMinutes: number;
  // 지도 미리보기용 좌표(0~100, 퍼센트)
  x: number;
  y: number;
};

export const clinics: Clinic[] = [
  { id: "c1", name: "강남구보건소 금연클리닉", type: "보건소", distanceKm: 0.8, address: "강남구 선릉로 668", status: "open", waitMinutes: 0, x: 62, y: 38 },
  { id: "c2", name: "역삼 연세이비인후과", type: "지정병원", distanceKm: 0.4, address: "강남구 테헤란로 152", status: "open", waitMinutes: 10, x: 44, y: 56 },
  { id: "c3", name: "선릉 바른내과의원", type: "지정병원", distanceKm: 1.2, address: "강남구 테헤란로 340", status: "busy", waitMinutes: 35, x: 78, y: 62 },
  { id: "c4", name: "도곡 튼튼내과", type: "지정병원", distanceKm: 1.6, address: "강남구 논현로 212", status: "open", waitMinutes: 5, x: 30, y: 26 },
  { id: "c5", name: "삼성 숨편한의원", type: "지정병원", distanceKm: 1.9, address: "강남구 삼성로 511", status: "closed", waitMinutes: 0, x: 86, y: 22 },
];

export const currentLocation = "강남구 역삼1동";

/** 니코틴 의존도 간이 평가 (Fagerström 6문항 축약형) */
export type QuizQuestion = {
  id: string;
  question: string;
  options: { label: string; score: number }[];
};

export const dependencyQuiz: QuizQuestion[] = [
  {
    id: "q1",
    question: "아침에 일어나서 첫 담배를 피우기까지 얼마나 걸리나요?",
    options: [
      { label: "5분 이내", score: 3 },
      { label: "6~30분", score: 2 },
      { label: "31~60분", score: 1 },
      { label: "60분 이후", score: 0 },
    ],
  },
  {
    id: "q2",
    question: "금연 구역에서 흡연을 참기 어려운가요?",
    options: [
      { label: "그렇다", score: 1 },
      { label: "아니다", score: 0 },
    ],
  },
  {
    id: "q3",
    question: "하루에 담배를 몇 개비 피우나요?",
    options: [
      { label: "10개비 이하", score: 0 },
      { label: "11~20개비", score: 1 },
      { label: "21~30개비", score: 2 },
      { label: "31개비 이상", score: 3 },
    ],
  },
  {
    id: "q4",
    question: "아파서 누워 있을 때도 담배를 피우나요?",
    options: [
      { label: "그렇다", score: 1 },
      { label: "아니다", score: 0 },
    ],
  },
];

export const QUITLINE = "1544-9030";
