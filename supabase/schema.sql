-- ================================================================
-- 금연길잡이 프로토타입 테이블
-- Supabase 대시보드 → SQL Editor → New query 에 전체 붙여넣고 Run
-- 여러 번 실행해도 안전하도록 if not exists / drop policy if exists 사용
-- ================================================================

-- 1) 테이블 생성 ---------------------------------------------------

-- 프로그램 신청 (신청 폼의 이름·연락처·희망 시간)
create table if not exists public.applications (
  id            bigint generated always as identity primary key,
  device_id     uuid        not null,          -- 로그인 없이 같은 기기의 기록을 묶는 익명 ID
  program_id    text        not null,
  program_title text        not null,
  name          text        not null,
  phone         text        not null,
  contact_time  text        not null,          -- 예: '평일 저녁'
  created_at    timestamptz not null default now()
);

-- 클리닉 방문 예약
create table if not exists public.reservations (
  id          bigint generated always as identity primary key,
  device_id   uuid        not null,
  clinic_id   text        not null,
  clinic_name text        not null,
  visit_date  date        not null,
  visit_time  text        not null,            -- 예: '11:30'
  created_at  timestamptz not null default now()
);

-- 금연 인증 (하루 한 번)
create table if not exists public.check_ins (
  id         bigint generated always as identity primary key,
  device_id  uuid        not null,
  check_date date        not null,
  day_number int         not null,             -- 인증 당시 금연 N일차
  created_at timestamptz not null default now(),
  unique (device_id, check_date)               -- 같은 날 중복 인증 방지
);

-- 2) RLS(행 수준 보안) 켜기 -----------------------------------------
-- 켜는 순간 정책이 없는 동작은 전부 막힌다
alter table public.applications enable row level security;
alter table public.reservations enable row level security;
alter table public.check_ins    enable row level security;

-- 3) 익명 사용자(anon)에게 INSERT만 허용 ---------------------------
-- SELECT 정책은 일부러 만들지 않는다.
-- anon 키는 프론트엔드 코드에 공개되므로, 읽기를 열어 두면
-- 누구나 다른 사람의 이름·연락처를 조회할 수 있기 때문.
-- 쌓인 데이터는 대시보드 Table Editor에서 확인한다.
drop policy if exists "anon can insert" on public.applications;
create policy "anon can insert" on public.applications
  for insert to anon with check (true);

drop policy if exists "anon can insert" on public.reservations;
create policy "anon can insert" on public.reservations
  for insert to anon with check (true);

drop policy if exists "anon can insert" on public.check_ins;
create policy "anon can insert" on public.check_ins
  for insert to anon with check (true);
