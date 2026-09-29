"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Chuyển động xuất hiện khi cuộn, chạy MỘT lần cho mỗi phần tử. Toàn bộ hình ảnh chuyển động nằm trong globals.css
 * (mục "Motion"); file này chỉ quyết định PHẦN TỬ NÀO, KIỂU NÀO và KHI NÀO.
 *
 * Kiểu (data-motion):
 * - title: chữ tiêu đề section nổi lên sau mặt nạ (clip-path + blur → nét), sau đó hai vạch bên vẽ ra ngoài.
 * - card:  thẻ dịch vụ / form liên hệ / khối giới thiệu: mờ + thu nhỏ 0.96 + nhích lên → rõ nét; icon "bật" nhẹ, các dòng lần lượt.
 * - step:  thẻ quy trình 01→04 lần lượt; khối màu số "quét" từ trái sang (clip-path), số đếm lên, icon bật nhẹ.
 * - news:  thẻ tin: nổi lên, ảnh mở dần từ trên xuống (clip-path).
 * - item:  dòng lợi ích: trượt từ trái + blur → nét, dấu tick bật nhẹ.
 * - lines: đoạn chữ dải CTA: từng dòng hiện lần lượt.
 * - rise:  đoạn văn / nút / câu hỏi FAQ: mờ + nhích lên.
 *
 * Nguyên tắc AN TOÀN (round 5c — trước đây nội dung dưới hero có thể bị ẩn vĩnh viễn):
 * - MẶC ĐỊNH HIỂN THỊ. Không có CSS nào ẩn nội dung trước khi JS chạy (không JS / JS lỗi / chunk 404 → thấy đủ ngay).
 * - Chỉ ẩn một phần tử khi IntersectionObserver ĐÃ trả về lần đầu cho chính phần tử đó (chứng minh observer hoạt động)
 *   VÀ phần tử đang nằm hẳn dưới màn hình (ẩn nó không ai thấy → không nháy). Phần tử đang thấy / đã cuộn qua: giữ nguyên.
 * - Lưới an toàn độc lập với observer và với Lenis: mỗi lần cuộn (sự kiện scroll gốc của window, gom theo rAF), khi đổi
 *   kích thước, và định kỳ 1s, mọi phần tử đang chờ mà đã vào hoặc ở trên màn hình đều được hiện ngay.
 * - Cleanup (StrictMode chạy effect 2 lần, HMR, đổi route, unmount) TRẢ LẠI mọi phần tử chưa hiện về trạng thái hiển thị
 *   và bỏ đánh dấu → lần chạy sau nhận lại từ đầu. Không bao giờ còn phần tử bị ẩn mà không có observer theo dõi.
 * - MutationObserver nhận thêm phần tử được React gắn sau (đổi route, Suspense).
 * - Chỉ transform, opacity, filter, clip-path → không dịch chuyển bố cục (CLS ≈ 0), chạy trên compositor.
 * - So le theo lượt vào màn hình, SẮP THEO THỨ TỰ DOM (IntersectionObserver không đảm bảo thứ tự) → quy trình luôn 01→04.
 * - Dọn lớp sau khi chuỗi chuyển động của phần tử kết thúc (hover và transition gốc hoạt động lại như cũ).
 */
type Variant = "title" | "card" | "step" | "news" | "item" | "lines" | "rise";

const GROUPS: ReadonlyArray<readonly [string, Variant]> = [
  [".section-title", "title"],
  [".service-card, .contact-form, .about-teaser-inner", "card"],
  [".workflow-card", "step"],
  [".news-grid > article", "news"],
  [".benefit-list > li, .about-benefits > li", "item"],
  [".callout p", "lines"],
  [
    ".section-intro, .services-more, .pricing .button, .faq-list > details, .faq-contact, .callout .button-row",
    "rise",
  ],
];

/** Khoảng so le giữa các phần tử anh em vào cùng lượt, và số bước tối đa. */
const STAGGER_MS: Record<Variant, number> = { title: 0, card: 110, step: 150, news: 100, item: 80, lines: 0, rise: 80 };
const MAX_STAGGER_STEPS = 5;
/** Thời gian (tính từ lúc bắt đầu, chưa gồm trễ) để toàn bộ chuỗi chuyển động con của một phần tử kết thúc. */
const SETTLE_MS: Record<Variant, number> = { title: 1500, card: 1500, step: 1700, news: 1400, item: 1200, lines: 1500, rise: 1200 };
const COUNT_MS = 700;
const COUNT_DELAY_MS = 380;
/** Lưới an toàn định kỳ (ms): hiện mọi phần tử chờ đã vào/ở trên màn hình, kể cả khi không có sự kiện nào. */
const SWEEP_MS = 1000;
/** Phần tử đã hiện (hoặc được giữ nguyên vì đang thấy) → không bao giờ ẩn lại, kể cả khi effect chạy lại. */
const settled = new WeakSet<Element>();

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

function byDocumentOrder(a: Element, b: Element) {
  if (a === b) return 0;
  const pos = a.compareDocumentPosition(b);
  if (pos & Node.DOCUMENT_POSITION_FOLLOWING) return -1;
  if (pos & Node.DOCUMENT_POSITION_PRECEDING) return 1;
  return 0;
}

const TARGETS = GROUPS.map(([selector]) => selector).join(", ");

function variantOf(el: Element): Variant {
  for (const [selector, variant] of GROUPS) if (el.matches(selector)) return variant;
  return "rise";
}

export function RevealOnScroll() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;

    // Vòng lặp trang trí (ánh sáng lướt qua dải CTA) chỉ chạy khi đang thấy trên màn hình.
    const loopObserver = new IntersectionObserver((entries) => {
      for (const entry of entries) (entry.target as HTMLElement).dataset.inview = entry.isIntersecting ? "true" : "false";
    });
    document.querySelectorAll<HTMLElement>(".callout").forEach((el) => loopObserver.observe(el));

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return () => loopObserver.disconnect();

    /** Phần tử effect này đang quản lý (đang theo dõi, đang ẩn chờ hoặc đang chạy chuyển động). */
    const tracked = new Set<HTMLElement>();
    /** Phần tử đang ẩn chờ (đã gắn .reveal-pending, chưa .is-revealed). */
    const hidden = new Set<HTMLElement>();
    const timers = new Map<HTMLElement, number>();
    let alive = true;

    const finish = (el: HTMLElement) => {
      el.classList.remove("reveal-pending", "is-revealed");
      el.style.removeProperty("--reveal-delay");
      delete el.dataset.motion;
      tracked.delete(el);
      hidden.delete(el);
      timers.delete(el);
    };

    // Các phần tử anh em (cùng cha, cùng kiểu) xuất hiện trong cùng lượt → trễ 0, 1×, 2×… (tối đa 5 bước),
    // SẮP THEO THỨ TỰ DOM (IntersectionObserver không đảm bảo thứ tự entries) → quy trình luôn 01 → 02 → 03 → 04.
    const reveal = (batch: HTMLElement[]) => {
      const due = batch.filter((el) => hidden.has(el));
      if (!due.length) return;
      const batchIndex = new Map<string, number>();
      const parents = new Map<Element, number>();
      for (const el of due.sort(byDocumentOrder)) {
        hidden.delete(el);
        settled.add(el);
        observer.unobserve(el);
        const variant = (el.dataset.motion ?? "rise") as Variant;
        const parent = el.parentElement ?? document.body;
        if (!parents.has(parent)) parents.set(parent, parents.size);
        const key = `${parents.get(parent)}:${variant}`;
        const index = batchIndex.get(key) ?? 0;
        batchIndex.set(key, index + 1);
        const delay = Math.min(index, MAX_STAGGER_STEPS) * STAGGER_MS[variant];
        el.style.setProperty("--reveal-delay", `${delay}ms`);
        el.classList.add("is-revealed");
        const number = el.querySelector<HTMLElement>(".workflow-number");
        if (number) countIn(number, delay + COUNT_DELAY_MS);
        timers.set(el, window.setTimeout(() => finish(el), delay + SETTLE_MS[variant] + 120));
      }
    };

    /** Đã tới vạch xuất hiện (90% chiều cao màn hình) hoặc đã cuộn qua; ở cuối trang: bất kỳ phần nào đang thấy. */
    const reached = (el: Element) => {
      const vh = window.innerHeight;
      const atEnd = window.scrollY + vh >= document.documentElement.scrollHeight - 4;
      return el.getBoundingClientRect().top < (atEnd ? vh : vh * 0.9);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (!alive) return;
        const toHide: HTMLElement[] = [];
        const toReveal: HTMLElement[] = [];
        for (const entry of entries) {
          const el = entry.target as HTMLElement;
          if (!tracked.has(el)) continue;
          if (hidden.has(el)) {
            if (entry.isIntersecting || reached(el)) toReveal.push(el);
          } else if (!el.classList.contains("reveal-pending")) {
            // Lần trả về đầu tiên cho phần tử này: observer hoạt động. Chỉ ẩn khi phần tử nằm hẳn dưới màn hình.
            if (entry.boundingClientRect.top >= window.innerHeight && el.getBoundingClientRect().top >= window.innerHeight) toHide.push(el);
            else {
              settled.add(el);
              tracked.delete(el);
              observer.unobserve(el);
            }
          }
        }
        for (const el of toHide) {
          el.dataset.motion = variantOf(el);
          el.classList.add("reveal-pending");
          hidden.add(el);
        }
        if (toReveal.length) {
          // Chốt trạng thái "ẩn chờ" trước khi gắn .is-revealed (để transition chạy từ trạng thái ẩn).
          void document.body.offsetWidth;
          reveal(toReveal);
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: [0, 0.12] },
    );

    const scan = () => {
      if (!alive) return;
      document.querySelectorAll<HTMLElement>(TARGETS).forEach((el) => {
        if (settled.has(el) || tracked.has(el)) return;
        tracked.add(el);
        observer.observe(el);
      });
    };

    // Lưới an toàn: không phụ thuộc observer hay Lenis. Bất kỳ phần tử chờ nào đã vào / ở trên màn hình → hiện ngay.
    let sweepQueued = false;
    const sweep = () => {
      sweepQueued = false;
      if (!alive || hidden.size === 0) return;
      const due = [...hidden].filter((el) => !el.isConnected || reached(el));
      if (due.length) {
        void document.body.offsetWidth;
        reveal(due);
      }
    };
    const queueSweep = () => {
      if (sweepQueued) return;
      sweepQueued = true;
      requestAnimationFrame(sweep);
    };
    window.addEventListener("scroll", queueSweep, { passive: true });
    window.addEventListener("resize", queueSweep, { passive: true });
    window.addEventListener("hashchange", queueSweep);
    const interval = window.setInterval(sweep, SWEEP_MS);

    // Phần tử được gắn sau (đổi route, Suspense, HMR) → nhận thêm.
    let scanQueued = false;
    const mutations = new MutationObserver(() => {
      if (scanQueued) return;
      scanQueued = true;
      requestAnimationFrame(() => {
        scanQueued = false;
        scan();
      });
    });
    mutations.observe(document.body, { childList: true, subtree: true });

    scan();

    return () => {
      // StrictMode / HMR / đổi route / unmount: trả mọi phần tử về trạng thái hiển thị, bỏ đánh dấu để lần chạy sau nhận lại.
      alive = false;
      observer.disconnect();
      mutations.disconnect();
      loopObserver.disconnect();
      window.removeEventListener("scroll", queueSweep);
      window.removeEventListener("resize", queueSweep);
      window.removeEventListener("hashchange", queueSweep);
      window.clearInterval(interval);
      timers.forEach((t) => window.clearTimeout(t));
      [...tracked].forEach(finish);
    };
  }, [pathname]);

  return null;
}
