"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Hiệu ứng xuất hiện khi cuộn (fade + nhích lên 14px), chạy MỘT lần cho mỗi phần tử.
 *
 * - Tăng cường dần: HTML tĩnh luôn hiển thị đầy đủ; chỉ khi JS chạy mới ẩn tạm các phần tử
 *   còn NẰM DƯỚI màn hình (phần tử đang thấy thì giữ nguyên, không nháy).
 * - Thẻ quy trình 01–04: so le đúng thứ tự DOM (desktop cả hàng cùng vào → 01,02,03,04; mobile từng thẻ khi vào).
 * - Chỉ dùng opacity/transform nên không gây dịch chuyển bố cục (CLS ≈ 0).
 * - prefers-reduced-motion: reduce → không làm gì cả.
 * - Số bước quy trình (01–04) đếm lên nhẹ khi thẻ xuất hiện.
 * - Tiêu đề section: hai vạch bên cạnh vẽ từ phía sát chữ ra ngoài (CSS, xem globals.css).
 */
const TARGETS = [
  ".section-title",
  ".service-card",
  ".workflow-card",
  ".news-grid > article",
  ".benefit-list > li",
  ".about-benefits > li",
].join(",");

const STAGGER_MS = 70;
const MAX_STAGGER_STEPS = 4;
const COUNT_MS = 480;

function countIn(el: HTMLElement, delay: number) {
  const final = el.textContent ?? "";
  const target = Number.parseInt(final, 10);
  if (!Number.isFinite(target) || target <= 0) return;
  const width = final.length;
  el.textContent = "0".padStart(width, "0");
  window.setTimeout(() => {
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / COUNT_MS);
      const eased = 1 - Math.pow(1 - t, 3);
      el.textContent = String(Math.round(eased * target)).padStart(width, "0");
      if (t < 1) requestAnimationFrame(tick);
      else el.textContent = final;
    };
    requestAnimationFrame(tick);
  }, delay);
}

export function RevealOnScroll() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const viewportBottom = window.innerHeight;
    const pending: HTMLElement[] = [];

    document.querySelectorAll<HTMLElement>(TARGETS).forEach((el) => {
      if (el.dataset.reveal) return;
      el.dataset.reveal = "done";
      // Đang nằm trong (hoặc phía trên) màn hình lúc tải → giữ nguyên, không ẩn.
      if (el.getBoundingClientRect().top < viewportBottom) return;
      el.classList.add("reveal-pending");
      pending.push(el);
    });

    if (pending.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // So le theo từng lượt xuất hiện: các phần tử anh em cùng vào màn hình một lúc (vd. một hàng thẻ)
        // lần lượt trễ 0/70/140…ms (tối đa 280ms); phần tử xuất hiện riêng lẻ thì không trễ.
        // Quan trọng: IntersectionObserver không đảm bảo thứ tự entries theo DOM → sắp xếp lại theo vị trí
        // trong document để thẻ quy trình luôn 01 → 02 → 03 → 04 trên desktop (cả 4 vào cùng lúc).
        // Trên mobile mỗi thẻ (hoặc từng cặp) vào riêng thì batch chỉ gồm những thẻ đang intersect.
        const intersecting = entries
          .filter((e) => e.isIntersecting)
          .map((e) => e.target as HTMLElement)
          .sort((a, b) => {
            if (a === b) return 0;
            const pos = a.compareDocumentPosition(b);
            if (pos & Node.DOCUMENT_POSITION_FOLLOWING) return -1;
            if (pos & Node.DOCUMENT_POSITION_PRECEDING) return 1;
            return 0;
          });
        const batchIndex = new Map<Element, number>();
        for (const el of intersecting) {
          observer.unobserve(el);
          const parent = el.parentElement ?? document.body;
          const index = batchIndex.get(parent) ?? 0;
          batchIndex.set(parent, index + 1);
          const delay = Math.min(index, MAX_STAGGER_STEPS) * STAGGER_MS;
          el.style.setProperty("--reveal-delay", `${delay}ms`);
          el.classList.add("is-revealed");
          const number = el.querySelector<HTMLElement>(".workflow-number");
          if (number) countIn(number, delay);
          // Dọn lớp khi transition transform CUỐI CÙNG kết thúc: với tiêu đề section là vạch bên phải (::after, 700ms
          // + trễ 80ms, dài hơn fade 560ms của chữ); gỡ lớp sớm hơn sẽ làm vạch nhảy thẳng tới cuối.
          const lastPseudo = el.matches(".section-title") ? "::after" : "";
          const cleanup = (event: TransitionEvent) => {
            if (event.target !== el || event.propertyName !== "transform" || event.pseudoElement !== lastPseudo) return;
            el.classList.remove("reveal-pending", "is-revealed");
            el.style.removeProperty("--reveal-delay");
            el.removeEventListener("transitionend", cleanup);
          };
          el.addEventListener("transitionend", cleanup);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    );
    pending.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
