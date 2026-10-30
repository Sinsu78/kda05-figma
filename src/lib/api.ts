/**
 * 브라우저 → 우리 서버(/api/submit) 호출.
 * Supabase 주소와 키는 서버(api/submit.ts)만 알고, 이 파일과 브라우저에는 전혀 없다.
 * 그래서 배포된 사이트의 개발자 도구에서도 키를 볼 수 없다.
 */

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

type Payloads = {
  application: { program_id: string; name: string; phone: string; contact_time: string };
  reservation: { clinic_id: string; visit_date: string; visit_time: string };
  check_in: { check_date: string; day_number: number };
};

export type SubmitResult = { ok: true; skipped?: boolean } | { ok: false; message: string };

export const submitRecord = async <T extends keyof Payloads>(type: T, payload: Payloads[T]): Promise<SubmitResult> => {
  try {
    const res = await fetch("/api/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type, device_id: getDeviceId(), ...payload }),
    });
    const data = (await res.json().catch(() => ({}))) as { ok?: boolean; notConfigured?: boolean; message?: string };
    if (res.ok && data.ok) return { ok: true };
    // 서버에 키가 없거나(503) 서버 함수가 없는 환경(404, 정적 미리보기 등) → 로컬 모드로 계속
    if (data.notConfigured || res.status === 404) {
      console.info("[api] 서버 저장이 꺼져 있어 브라우저에만 저장해요");
      return { ok: true, skipped: true };
    }
    console.error(`[api] ${type} 저장 실패 (${res.status})`, data.message);
    return { ok: false, message: data.message ?? "저장 실패" };
  } catch (error) {
    console.error(`[api] ${type} 요청 실패`, error);
    return { ok: false, message: "네트워크 오류" };
  }
};
