"use client";

import Lenis from "lenis";
import { useEffect } from "react";

/**
 * Cuộn mượt (Lenis, ~5 KB gzip) cho chuột/touchpad trên máy tính.
 *
 * - Cảm ứng (điện thoại/máy tính bảng) giữ cuộn gốc của hệ điều hành (syncTouch: false) → không "trễ tay".
 * - prefers-reduced-motion: reduce → không khởi tạo, trang cuộn bình thường.
 * - Link neo cùng trang (#lien-he, /#lien-he, #dich-vu, /#dv-…): cuộn mượt tới đích và DỪNG ĐÚNG dưới thanh menu dính
 *   (Lenis đọc scroll-margin-top của đích, xem :where([id]) trong globals.css). Chỉ preventDefault — không chặn
 *   propagation — nên onClick của React (vd. đóng menu mobile) vẫn chạy; next/link thấy defaultPrevented thì bỏ qua.
 *   URL vẫn cập nhật #hash qua history.pushState (Next.js App Router hỗ trợ). Bấm bằng bàn phím → chuyển focus tới đích.
 * - Menu mobile (cuộn riêng khi mở) và link có phím bổ trợ / target=_blank giữ hành vi gốc.
 */
const ANCHOR_EASE = (t: number) => (t < 0.5 ? 16 * t ** 5 : 1 - (-2 * t + 2) ** 5 / 2);

export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      autoRaf: true,
      lerp: 0.085,
      smoothWheel: true,
      syncTouch: false,
      stopInertiaOnNavigate: true,
      prevent: (node) => node instanceof Element && node.closest(".primary-nav.is-open") !== null,
    });

    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = (event.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!link || link.classList.contains("skip-link") || (link.target && link.target !== "_self")) return;
      const url = new URL(link.href, window.location.href);
      if (!url.hash || url.origin !== window.location.origin || url.pathname !== window.location.pathname) return;
      const target = document.getElementById(decodeURIComponent(url.hash.slice(1)));
      if (!target) return;
      event.preventDefault();
      const fromKeyboard = event.detail === 0;
      if (url.hash !== window.location.hash) window.history.pushState(null, "", url.hash);
      // Đợi 1 khung hình để React đóng menu mobile trước khi đo vị trí đích.
      requestAnimationFrame(() => {
        lenis.scrollTo(target, {
          duration: 1.3,
          easing: ANCHOR_EASE,
          onComplete: () => {
            if (!fromKeyboard) return;
            if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
            target.focus({ preventScroll: true });
          },
        });
      });
    };
    // Capture ở window: chạy trước handler của React/next-link (gắn ở document).
    window.addEventListener("click", onClick, true);

    return () => {
      window.removeEventListener("click", onClick, true);
      lenis.destroy();
    };
  }, []);

  return null;
}
