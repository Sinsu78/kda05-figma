import { createClient } from "@supabase/supabase-js";

/**
 * Supabase 연결.
 * 키는 코드에 직접 쓰지 않고 환경변수로 받는다 (.env.local / Vercel 환경변수).
 * anon 키는 원래 브라우저에 공개되는 키라 프론트에 둬도 되지만,
 * 그래서 테이블 쪽 RLS 정책(supabase/schema.sql)으로 "INSERT만 가능"하게 막아 둔다.
 */
const rawUrl = ((import.meta.env.VITE_SUPABASE_URL as string | undefined) ?? "").trim();
const anonKey = ((import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined) ?? "").trim();

/**
 * 환경변수를 붙여넣을 때 흔한 실수를 보정한다.
 * - "xxxx.supabase.co"처럼 https:// 가 빠진 경우 → 붙여 줌
 * - ".../rest/v1/" 같은 뒷부분이 붙은 경우 → origin(https://xxxx.supabase.co)만 사용
 */
const normalizeUrl = (value: string) => {
  const withProtocol = /^https?:\/\//i.test(value) ? value : `https://${value}`;
  const { origin, hostname } = new URL(withProtocol);
  // 공백·한글이 섞이거나 점(.)이 없는 값은 주소가 아님 (키를 URL 칸에 넣은 경우 등)
  if (!/^[a-z0-9-]+(\.[a-z0-9-]+)+$/i.test(hostname)) throw new Error(`올바른 주소가 아니에요: ${value}`);
  return origin;
};

/**
 * 환경변수가 잘못돼도 앱 전체가 멈추지 않도록 createClient를 감싼다.
 * (createClient는 URL이 이상하면 바로 에러를 던지고, 그러면 화면이 하얗게 빈다)
 */
const createSafeClient = () => {
  if (!rawUrl || !anonKey) {
    console.info("[supabase] 환경변수가 없어 로컬 모드로 동작해요 (브라우저에만 저장)");
    return null;
  }
  try {
    const url = normalizeUrl(rawUrl);
    const client = createClient(url, anonKey);
    console.info(`[supabase] 연결됨: ${new URL(url).host}`);
    return client;
  } catch (error) {
    console.error(
      "[supabase] VITE_SUPABASE_URL 값을 확인하세요. 'https://xxxx.supabase.co' 형식이어야 해요. 지금은 로컬 모드로 동작해요.",
      error,
    );
    return null;
  }
};

export const supabase = createSafeClient();
export const isSupabaseEnabled = supabase !== null;

/** 로그인 없이 같은 기기의 기록을 묶기 위한 익명 ID (localStorage에 한 번 만들고 재사용) */
const DEVICE_KEY = "kda05:device-id";
export const getDeviceId = () => {
  try {
    let id = localStorage.getItem(DEVICE_KEY);
    if (!id) {
      id = crypto.randomUUID();
      localStorage.setItem(DEVICE_KEY, id);
    }
    return id;
  } catch {
    return crypto.randomUUID();
  }
};

type Tables = {
  applications: {
    program_id: string;
    program_title: string;
    name: string;
    phone: string;
    contact_time: string;
  };
  reservations: {
    clinic_id: string;
    clinic_name: string;
    visit_date: string;
    visit_time: string;
  };
  check_ins: {
    check_date: string;
    day_number: number;
  };
};

export type SaveResult = { ok: true; skipped?: boolean } | { ok: false; message: string };

/**
 * 테이블에 한 줄 INSERT.
 * - 환경변수가 없으면 저장을 건너뛰고 성공으로 처리 (로컬 프로토타입 모드)
 * - .select()를 붙이지 않으므로 SELECT 권한 없이도 동작한다
 */
export const insertRow = async <T extends keyof Tables>(table: T, row: Tables[T]): Promise<SaveResult> => {
  if (!supabase) return { ok: true, skipped: true };
  const { error } = await supabase.from(table).insert({ ...row, device_id: getDeviceId() });
  if (!error) return { ok: true };
  // 23505 = unique 위반 (같은 날 중복 인증 등) → 이미 저장된 것이므로 성공 취급
  if (error.code === "23505") return { ok: true };
  console.error(`[supabase] ${table} insert 실패`, error);
  return { ok: false, message: error.message };
};
