# 금연길잡이 · 국가금연지원센터 앱 프로토타입

피그마 디자인을 기반으로 만든 금연 지원 모바일 앱 프로토타입입니다.
React + TypeScript + Vite + Tailwind CSS로 만들었습니다.

## 실행

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # 배포용 빌드 (dist/)
npm run typecheck  # 타입 검사
```

## 화면 구성

| 화면 | 주요 기능 |
| --- | --- |
| 온보딩 | 이름·흡연량·담배값·시작일 입력 → 실시간 절약액 미리보기, **데모 데이터로 둘러보기** |
| 홈 | 입력값 기반 통계 카운트업, 오늘 금연 인증, SOS 3분 호흡 코칭, 보상 로드맵, 주변 클리닉, 인기 프로그램, **당겨서 새로고침** |
| 진단·플랜 | 니코틴 의존도 자가진단 → 결과별 맞춤 플랜 (항목을 누르면 해당 프로그램/예약으로 이동) |
| 클리닉 찾기 | 지도 핀 ↔ 목록 연동, 필터, **방문 예약**, 카카오맵 길찾기 |
| 내 정보 | 누적 기록, 알림 토글, 금연 일지(달력·연속 인증), 지원금·환급 내역, 설정(테마·초기화) |
| 상세 화면 | 알림 목록, 프로그램 전체/상세/신청 폼, 클리닉 예약 (오른쪽에서 밀려 들어오는 페이지 스택) |

- **새로고침해도 유지**: 프로필·인증·신청·예약·테마가 `localStorage`에 저장돼요. 설정 → "모든 기록 초기화"로 처음 화면부터 다시 볼 수 있어요.
- **다크 모드**: 설정에서 시스템/라이트/다크 선택. 색은 `tailwind.css`의 CSS 변수 토큰으로 관리해요.

## 폴더 구조

```
src/
├── App.tsx                 # 온보딩 분기, 테마 적용, 상세 페이지 라우팅
├── store/AppStore.tsx      # 전역 상태 + localStorage 저장, 통계 계산(computeStats)
├── navigation/PageStack.tsx# 상세 화면 스택(push/pop) + 공통 레이아웃
├── data/mock.ts            # 정적 데이터 (나중에 API로 교체할 지점)
├── components/             # MiniMap, ProgramCard, PullToRefresh, ui/(Toast, BottomSheet…)
└── screens/
    ├── onboarding/         # 첫 실행
    ├── Screen/             # 앱 뼈대(헤더·탭 전환) + 홈 섹션들
    ├── tabs/               # 진단·플랜 / 클리닉 찾기 / 내 정보
    └── pages/              # 알림, 일지, 프로그램, 환급, 설정, 예약
```

## Supabase 연동

프로그램 신청 · 클리닉 예약 · 금연 인증이 Supabase 테이블에 저장돼요.

| 앱 동작 | 테이블 | 코드 위치 |
| --- | --- | --- |
| 프로그램 신청 폼 제출 | `applications` | `src/screens/pages/ProgramPages.tsx` |
| 클리닉 방문 예약 | `reservations` | `src/screens/pages/ReservePage.tsx` |
| 오늘 금연 인증 | `check_ins` | `src/store/AppStore.tsx` (`checkIn`) |

1. Supabase SQL Editor에서 [`supabase/schema.sql`](supabase/schema.sql) 실행 (테이블 + RLS + anon INSERT 정책)
2. 환경변수 2개 설정 — 로컬은 `.env.example`을 복사한 `.env.local`, 배포는 Vercel Environment Variables(Type: Config)
   - `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`
3. Vercel 재배포 (Vite는 빌드 시점에 환경변수를 코드에 넣음)

- 키가 없으면 저장을 건너뛰고 기존처럼 브라우저(localStorage)에만 저장돼요.
- RLS로 **INSERT만 허용**하고 SELECT는 막아 두었어요. anon 키는 브라우저에 공개되므로, 읽기를 열면 누구나 다른 사람의 연락처를 볼 수 있기 때문이에요. 저장된 데이터는 대시보드 Table Editor에서 확인해요.
- 로그인이 없으므로 기기별 익명 UUID(`device_id`)로 같은 사람의 기록을 묶어요.
- `service_role` / secret 키는 RLS를 무시하는 관리자 키라 프론트엔드에 절대 넣지 않아요.

## 백엔드 연동 시

- 정적 데이터(`src/data/mock.ts`)는 조회 API(`GET /programs`, `GET /clinics` …)로 바꾸면 되고,
  타입(`Profile`, `Clinic`, `Program` …)이 그대로 응답 스펙의 초안이 됩니다.
- 사용자 데이터(`src/store/AppStore.tsx`의 `actions`)는 각각 쓰기 API에 대응해요.
  예: `checkIn` → `POST /check-ins`, `apply` → `POST /applications`, `reserve` → `POST /reservations`
- 금연 일수·절약 금액 같은 값은 저장하지 않고 `computeStats`로 계산해요. 서버에서도 같은 원칙(원본만 저장, 파생값은 계산)을 지키면 데이터가 어긋나지 않아요.

> 화면의 수치(절약 금액, 기금 집행 비율, 클리닉 정보 등)는 모두 프로토타입용 예시 데이터입니다.
