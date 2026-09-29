/**
 * Gửi biểu mẫu tư vấn tới Google Sheet qua Google Apps Script Web App (docs/google-apps-script/).
 *
 * Site là static export nên trình duyệt gửi thẳng tới Apps Script: POST application/x-www-form-urlencoded
 * (URLSearchParams) với đúng các trường name, phone, message, page, website (bẫy spam – phải rỗng).
 * `mode: "no-cors"`: Apps Script không trả header CORS, nên phản hồi là "opaque" – request tới nơi là coi như thành công;
 * chỉ lỗi mạng mới báo lỗi.
 *
 * URL lấy từ NEXT_PUBLIC_CONTACT_FORM_ENDPOINT lúc build. Không có (hoặc không phải https) → chế độ trình diễn, không gửi.
 */
function readEndpoint(): string | undefined {
  const value = process.env.NEXT_PUBLIC_CONTACT_FORM_ENDPOINT?.trim();
  if (!value) return undefined;
  try {
    return new URL(value).protocol === "https:" ? value : undefined;
  } catch {
    return undefined;
  }
}

export const CONTACT_FORM_ENDPOINT = readEndpoint();

export interface ContactFields {
  name: string;
  phone: string;
  message: string;
}

export type ContactField = keyof ContactFields;

export const MAX_MESSAGE_LENGTH = 2000;
/** Số di động/cố định Việt Nam: 0xxxxxxxxx hoặc +84xxxxxxxxx (cho phép dấu cách, chấm, gạch). */
const PHONE_PATTERN = /^(?:\+?84|0)\d{8,10}$/;

/** Trả về trường lỗi đầu tiên kèm thông báo tiếng Việt, hoặc undefined khi hợp lệ. */
export function validateContact(fields: ContactFields): { field: ContactField; message: string } | undefined {
  if (fields.name.length < 2) return { field: "name", message: "Vui lòng nhập tên của bạn." };
  if (!PHONE_PATTERN.test(fields.phone.replace(/[\s.-]/g, ""))) {
    return { field: "phone", message: "Số điện thoại chưa đúng, vui lòng kiểm tra lại (ví dụ 0963 548 333)." };
  }
  if (!fields.message) return { field: "message", message: "Vui lòng cho biết nội dung cần tư vấn." };
  if (fields.message.length > MAX_MESSAGE_LENGTH) {
    return { field: "message", message: `Nội dung tối đa ${MAX_MESSAGE_LENGTH} ký tự.` };
  }
  return undefined;
}

export async function submitContact(endpoint: string, fields: ContactFields, page: string): Promise<void> {
  await fetch(endpoint, {
    method: "POST",
    mode: "no-cors",
    body: new URLSearchParams({ ...fields, page, website: "" }),
  });
}
