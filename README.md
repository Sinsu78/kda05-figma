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

| 탭 | 주요 기능 |
| --- | --- |
| 홈 | 금연 일차·절약 금액 카운트업, **오늘 금연 인증**, **SOS 3분 호흡 코칭**, 단계별 보상 로드맵, 주변 클리닉 지도, 인기 프로그램 신청, 기금 사용 내역 |
| 진단·플랜 | 니코틴 의존도 자가진단(4문항) → 결과별 맞춤 금연 플랜 |
| 클리닉 찾기 | 지도 핀 ↔ 목록 연동, 보건소/지정병원/진료 중 필터, 거리순 정렬 |
| 내 정보 | 누적 기록, 인증 알림 토글, 메뉴 |

## 폴더 구조

```
src/
├── data/mock.ts          # 화면에 쓰이는 모든 데이터 (나중에 API로 교체할 지점)
├── components/
│   ├── MiniMap.tsx        # SVG 일러스트 지도 (실서비스에선 지도 SDK로 교체)
│   └── ui/                # Button, Card, BottomSheet, Toast 등 공통 UI
├── hooks/useCountUp.ts    # 숫자 카운트업 애니메이션
└── screens/
    ├── Screen/            # 앱 뼈대(헤더·탭 전환) + 홈 섹션들
    └── tabs/              # 진단·플랜 / 클리닉 찾기 / 내 정보
```

## 백엔드 연동 시

모든 화면은 `src/data/mock.ts`의 타입과 데이터만 사용합니다.
API가 준비되면 이 파일의 상수를 `fetch` 호출(또는 React Query 등)로 바꾸면 되고,
타입(`User`, `Clinic`, `Program` …)이 그대로 API 응답 스펙의 초안이 됩니다.

> 화면의 수치(절약 금액, 기금 집행 비율, 클리닉 정보 등)는 모두 프로토타입용 예시 데이터입니다.
