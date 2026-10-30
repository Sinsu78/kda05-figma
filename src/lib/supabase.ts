import { createClient } from "@supabase/supabase-js";

/**
 * Supabase 연결.
 * 키는 코드에 직접 쓰지 않고 환경변수로 받는다 (.env.local / Vercel 환경변수).
 * anon 키는 원래 브라우저에 공개되는 키라 프론트에 둬도 되지만,
 * 그래서 테이블 쪽 RLS 정책(supabase/schema.sql)으로 "INSERT만 가능"하게 막아 둔다.
 */
const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

export const supabase = url && anonKey ? createClient(url, anonKey) : null;
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
