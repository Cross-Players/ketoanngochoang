"use client";

import { useState, type FormEvent } from "react";
import { COMPANY } from "@/data/site";
import {
  CONTACT_FORM_ENDPOINT,
  MAX_MESSAGE_LENGTH,
  submitContact,
  validateContact,
  type ContactField,
} from "@/lib/contact-form";

type Status =
  | { kind: "idle" }
  | { kind: "sending" }
  | { kind: "done"; message: string }
  | { kind: "error"; message: string; field?: ContactField };

const SUCCESS_MESSAGE = "Cảm ơn bạn! Ngọc Hoàng đã nhận yêu cầu và sẽ liên hệ lại sớm.";
const DEMO_MESSAGE = "Đây là bản trình diễn: thông tin chưa được gửi hoặc lưu.";
const NETWORK_ERROR = `Chưa gửi được yêu cầu, vui lòng thử lại hoặc gọi ${COMPANY.hotline}.`;

export function ConsultationForm() {
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const invalid = (field: ContactField) => status.kind === "error" && status.field === field;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const read = (key: string) => String(data.get(key) ?? "").trim();
    const fields = { name: read("name"), phone: read("phone"), message: read("message") };

    const error = validateContact(fields);
    if (error) {
      setStatus({ kind: "error", ...error });
      const target = form.elements.namedItem(error.field);
      if (target instanceof HTMLElement) target.focus();
      return;
    }
    // Bẫy spam: người dùng thật không thấy ô "website"; bot điền vào → giả vờ thành công, không gửi.
    if (read("website")) {
      setStatus({ kind: "done", message: SUCCESS_MESSAGE });
      form.reset();
      return;
    }
    if (!CONTACT_FORM_ENDPOINT) {
      setStatus({ kind: "done", message: DEMO_MESSAGE });
      form.reset();
      return;
    }

    setStatus({ kind: "sending" });
    try {
      await submitContact(CONTACT_FORM_ENDPOINT, fields, window.location.href);
      setStatus({ kind: "done", message: SUCCESS_MESSAGE });
      form.reset();
    } catch {
      setStatus({ kind: "error", message: NETWORK_ERROR });
    }
  }

  const sending = status.kind === "sending";
  const statusText = status.kind === "done" || status.kind === "error" ? status.message : sending ? "Đang gửi yêu cầu…" : "";

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate aria-busy={sending}>
      <label className="sr-only" htmlFor="contact-name">Tên của bạn</label>
      <input id="contact-name" name="name" type="text" placeholder="Tên của bạn" autoComplete="name" required aria-invalid={invalid("name")} aria-describedby="contact-status" />
      <label className="sr-only" htmlFor="contact-phone">Số điện thoại hoặc Zalo</label>
      <input id="contact-phone" name="phone" type="tel" inputMode="tel" placeholder="Số điện thoại hoặc Zalo" autoComplete="tel" required aria-invalid={invalid("phone")} aria-describedby="contact-status" />
      <label className="sr-only" htmlFor="contact-message">Nội dung cần tư vấn</label>
      <textarea id="contact-message" name="message" rows={4} placeholder="Nội dung cần tư vấn" maxLength={MAX_MESSAGE_LENGTH} required aria-invalid={invalid("message")} aria-describedby="contact-status" />
      {/* Bẫy spam (honeypot): ẩn với người dùng và trình đọc màn hình; phải để trống. */}
      <div className="sr-only" aria-hidden="true">
        <label htmlFor="contact-website">Website</label>
        <input id="contact-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <button className="button button-orange" type="submit" disabled={sending}>{sending ? "ĐANG GỬI…" : "GỬI YÊU CẦU TƯ VẤN"}</button>
      <p id="contact-status" className={`form-status${status.kind === "error" ? " is-error" : ""}`} role="status" aria-live="polite">{statusText}</p>
    </form>
  );
}
