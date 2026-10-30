/**
 * POST /api/submit — Vercel 서버리스 함수 (브라우저가 아니라 서버에서 실행됨)
 *
 * 브라우저 → /api/submit → Supabase
 * - Supabase URL과 secret 키는 이 서버 코드만 알고, 브라우저에는 절대 전달되지 않는다.
 * - 환경변수 이름에 VITE_ 를 붙이지 않는 게 핵심 (VITE_ 가 붙으면 프론트 JS에 박혀 공개됨).
 * - 브라우저가 보낸 값은 믿지 않고 여기서 다시 검증한 뒤 저장한다.
 */
import type { IncomingMessage, ServerResponse } from "node:http";
import { createClient } from "@supabase/supabase-js";


/*
 * 허용값 목록 (src/data/mock.ts 와 같은 값이어야 함).
 * 서버 함수가 다른 폴더를 import하면 Vercel 배포 환경에서 경로 문제가 날 수 있어 여기에 둔다.
 * 프로그램·기관·시간을 바꾸면 이 목록도 함께 바꿀 것.
 */
const PROGRAMS: Record<string, string> = {
  "12week": "보건복지부 12주 집중 금연치료",
  "clinic": "보건소 1:1 방문 금연클리닉",
  "remote": "청년·직장인 스마트 금연 코칭",
  "women": "여성 흡연자 비대면 금연 지원",
  "camp": "고도흡연자 4박 5일 금연캠프",
};
const CLINICS: Record<string, string> = {
  "c1": "강남구보건소 금연클리닉",
  "c2": "역삼 연세이비인후과",
  "c3": "선릉 바른내과의원",
  "c4": "도곡 튼튼내과",
  "c5": "삼성 숨편한의원",
};
const CONTACT_TIMES: string[] = ["평일 오전", "평일 오후", "평일 저녁", "주말"];
const RESERVE_TIMES: string[] = ["09:30", "10:30", "11:30", "14:00", "15:00", "16:00", "17:00", "18:30"];

type Req = IncomingMessage & { body?: unknown };
type Row = Record<string, string | number>;
type Validated = { table: "applications" | "reservations" | "check_ins"; row: Row } | { error: string };

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const DATE = /^\d{4}-\d{2}-\d{2}$/;
const PHONE = /^010-\d{4}-\d{4}$/;
const DAY_MS = 86_400_000;

const send = (res: ServerResponse, status: number, body: object) => {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", "no-store");
  res.end(JSON.stringify(body));
};

const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");

/** 날짜가 오늘 기준 [from, to]일 범위 안에 있는지 (서버 UTC와 한국 시간 차이를 감안해 하루 여유) */
const dateWithin = (value: string, fromDays: number, toDays: number) => {
  if (!DATE.test(value)) return false;
  const t = Date.parse(`${value}T00:00:00Z`);
  if (Number.isNaN(t)) return false;
  const today = Date.parse(`${new Date().toISOString().slice(0, 10)}T00:00:00Z`);
  return t >= today + (fromDays - 1) * DAY_MS && t <= today + (toDays + 1) * DAY_MS;
};

/** 요청 종류별 화이트리스트 검증. 이름·제목처럼 서버가 알 수 있는 값은 브라우저 값을 쓰지 않고 서버가 채운다 */
const validate = (body: Record<string, unknown>): Validated => {
  const deviceId = str(body.device_id);
  if (!UUID.test(deviceId)) return { error: "잘못된 기기 ID" };

  switch (body.type) {
    case "application": {
      const programId = str(body.program_id);
      const programTitle = PROGRAMS[programId];
      const name = str(body.name);
      const phone = str(body.phone);
      const contactTime = str(body.contact_time);
      if (!programTitle) return { error: "없는 프로그램" };
      if (name.length < 1 || name.length > 20) return { error: "이름은 1~20자" };
      if (!PHONE.test(phone)) return { error: "연락처 형식은 010-0000-0000" };
      if (!CONTACT_TIMES.includes(contactTime)) return { error: "잘못된 상담 시간" };
      return {
        table: "applications",
        row: { device_id: deviceId, program_id: programId, program_title: programTitle, name, phone, contact_time: contactTime },
      };
    }
    case "reservation": {
      const clinicId = str(body.clinic_id);
      const clinicName = CLINICS[clinicId];
      const visitDate = str(body.visit_date);
      const visitTime = str(body.visit_time);
      if (!clinicName) return { error: "없는 기관" };
      if (!dateWithin(visitDate, 1, 14)) return { error: "예약 날짜는 내일부터 2주 이내" };
      if (!RESERVE_TIMES.includes(visitTime)) return { error: "잘못된 예약 시간" };
      return {
        table: "reservations",
        row: { device_id: deviceId, clinic_id: clinicId, clinic_name: clinicName, visit_date: visitDate, visit_time: visitTime },
      };
    }
    case "check_in": {
      const checkDate = str(body.check_date);
      const dayNumber = Number(body.day_number);
      if (!dateWithin(checkDate, 0, 0)) return { error: "인증은 오늘 날짜만 가능" };
      if (!Number.isInteger(dayNumber) || dayNumber < 1 || dayNumber > 10000) return { error: "잘못된 금연 일차" };
      return { table: "check_ins", row: { device_id: deviceId, check_date: checkDate, day_number: dayNumber } };
    }
    default:
      return { error: "알 수 없는 요청 종류" };
  }
};

export default async function handler(req: Req, res: ServerResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return send(res, 405, { ok: false, message: "POST만 가능해요" });
  }

  const url = process.env.SUPABASE_URL?.trim();
  const secretKey = process.env.SUPABASE_SECRET_KEY?.trim();
  if (!url || !secretKey) {
    // 키가 없으면 앱은 로컬 모드로 계속 동작하도록 알려 준다
    return send(res, 503, { ok: false, notConfigured: true, message: "서버에 Supabase 환경변수가 없어요" });
  }

  let body: unknown = req.body;
  if (typeof body === "string") {
    try {
      body = JSON.parse(body);
    } catch {
      return send(res, 400, { ok: false, message: "JSON 형식이 아니에요" });
    }
  }
  if (!body || typeof body !== "object") return send(res, 400, { ok: false, message: "요청 본문이 없어요" });

  const result = validate(body as Record<string, unknown>);
  if ("error" in result) return send(res, 400, { ok: false, message: result.error });

  try {
    // secret 키는 RLS를 우회하는 관리자 키 → 반드시 서버에서만 사용
    const supabase = createClient(url, secretKey, { auth: { persistSession: false } });
    const { error } = await supabase.from(result.table).insert(result.row);
    // 23505 = unique 위반 (같은 날 중복 인증) → 이미 저장된 것이므로 성공 취급
    if (error && error.code !== "23505") {
      console.error(`[api/submit] ${result.table} insert 실패`, error);
      return send(res, 500, { ok: false, message: "저장에 실패했어요" });
    }
    return send(res, 201, { ok: true });
  } catch (error) {
    console.error("[api/submit] 서버 오류", error);
    return send(res, 500, { ok: false, message: "서버 오류" });
  }
}
