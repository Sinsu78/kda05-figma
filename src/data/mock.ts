/**
 * 프로토타입용 목(mock) 데이터.
 * 화면 컴포넌트는 이 파일의 타입/데이터만 바라보므로,
 * 나중에 백엔드 API가 생기면 여기를 fetch 호출로 교체하면 된다.
 */

export type Profile = {
  name: string;
  quitDate: string; // YYYY-MM-DD
  cigarettesPerDay: number;
  packPrice: number;
};

/** "데모 데이터로 둘러보기"용 프로필 (오늘 기준 금연 14일차) */
export const demoProfile = (): Profile => {
  const d = new Date();
  d.setDate(d.getDate() - 13);
  return {
    name: "김건강",
    quitDate: toDateKey(d),
    cigarettesPerDay: 20,
    packPrice: 6500,
  };
};

export const toDateKey = (d: Date) => {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
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
  icon: "pill" | "building" | "video" | "heart" | "users";
  duration: string;
  refund: number; // 이수 시 환급/지원 금액(원)
  eligibility: string[];
  steps: string[];
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
    duration: "12주 (상담 6회)",
    refund: 120000,
    eligibility: ["만 19세 이상 흡연자", "건강보험 가입자 및 피부양자", "연 3회까지 참여 가능"],
    steps: ["온라인 신청", "지정 병원 첫 진료·약물 처방", "2주 간격 상담 6회", "12주 이수 후 환급"],
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
    duration: "6개월",
    refund: 50000,
    eligibility: ["관할 지역 거주·직장인 흡연자", "보건소 금연클리닉 등록"],
    steps: ["방문 예약", "니코틴 의존도·CO 측정", "보조제 키트 수령", "6개월간 정기 상담"],
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
    duration: "8주",
    refund: 30000,
    eligibility: ["만 19~39세 청년 또는 직장인", "스마트폰 화상 상담 가능자"],
    steps: ["앱 신청", "담당 코치 배정", "주 1회 화상 상담", "8주 완료 시 모바일 상품권"],
  },
  {
    id: "women",
    category: "맞춤 지원",
    applicants: 820,
    title: "여성 흡연자 비대면 금연 지원",
    description: "익명 상담과 택배로 받는 보조제로 주변 시선 걱정 없이 금연",
    benefit: "보조제 택배 무료 배송",
    action: "신청하기",
    tone: "violet",
    icon: "heart",
    duration: "12주",
    refund: 30000,
    eligibility: ["여성 흡연자 누구나", "익명 참여 가능"],
    steps: ["익명 신청", "전화 상담사 배정", "보조제 택배 수령", "주 1회 전화 상담"],
  },
  {
    id: "camp",
    category: "전문 치료형",
    applicants: 540,
    title: "고도흡연자 4박 5일 금연캠프",
    description: "흡연 20년 이상 고도흡연자를 위한 전문 의료진 합숙형 치료",
    benefit: "숙박·식비 전액 무료",
    action: "신청하기",
    tone: "blue",
    icon: "users",
    duration: "4박 5일 + 사후관리 6개월",
    refund: 0,
    eligibility: ["흡연 경력 20년 이상", "금연 실패 경험이 있는 분"],
    steps: ["신청 및 사전 상담", "4박 5일 합숙 치료", "퇴소 후 6개월 사후관리"],
  },
];

export type Notice = {
  id: string;
  title: string;
  body: string;
  time: string;
  kind: "reward" | "tip" | "program";
};

export const notices: Notice[] = [
  { id: "n1", kind: "reward", title: "2주 달성 보상이 도착했어요", body: "금연 키트를 보건소에서 수령할 수 있어요.", time: "방금 전" },
  { id: "n2", kind: "tip", title: "오늘의 금연 팁", body: "식사 후 흡연 욕구가 오면 바로 양치를 해 보세요.", time: "3시간 전" },
  { id: "n3", kind: "program", title: "12주 집중 금연치료 2차 모집", body: "이번 달 신청자는 첫 상담이 무료예요.", time: "어제" },
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
