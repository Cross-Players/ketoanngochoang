"use client";

import { useState, type FormEvent } from "react";

export function ConsultationForm() {
  const [status, setStatus] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("Đây là bản trình diễn: thông tin chưa được gửi hoặc lưu.");
    event.currentTarget.reset();
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <label className="sr-only" htmlFor="contact-name">Tên của bạn</label>
      <input id="contact-name" name="name" type="text" placeholder="Tên của bạn" autoComplete="name" required />
      <label className="sr-only" htmlFor="contact-phone">Số điện thoại hoặc Zalo</label>
      <input id="contact-phone" name="phone" type="tel" placeholder="Số điện thoại hoặc Zalo" autoComplete="tel" required />
      <label className="sr-only" htmlFor="contact-message">Nội dung cần tư vấn</label>
      <textarea id="contact-message" name="message" rows={4} placeholder="Nội dung cần tư vấn (Ví dụ: đóng BHXH cho nhân viên, gia hạn BHYT hộ gia đình)" required />
      <button className="button button-orange" type="submit">GỬI YÊU CẦU TƯ VẤN</button>
      <p className="form-status" aria-live="polite">{status}</p>
    </form>
  );
}
