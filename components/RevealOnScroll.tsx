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
 * Nguyên tắc:
 * - Tăng cường dần: HTML tĩnh luôn hiển thị đầy đủ. Script nội tuyến trong <head> (layout.tsx) gắn html.m-js trước lần vẽ
 *   đầu → CSS ẩn tạm các phần tử động (kèm "failsafe": tự hiện sau 3s nếu JS không chạy được). Không JS /
 *   prefers-reduced-motion: reduce → không có lớp m-js, mọi thứ hiện sẵn, tĩnh.
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
    ".benefit-content > h2, .section-intro, .services-more, .pricing .button, .faq-list > details, .faq-contact, .contact h2, .callout .button-row",
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
/** Phần tử đang thấy lúc tải: bắt đầu ngay sau các từ đầu tiên của tiêu đề hero. */
const INITIAL_DELAY_MS = 260;

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

export function RevealOnScroll() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;

    // Vòng lặp trang trí (ánh sáng lướt qua dải CTA) chỉ chạy khi đang thấy trên màn hình.
    const loops = Array.from(document.querySelectorAll<HTMLElement>(".callout"));
    const loopObserver = new IntersectionObserver((entries) => {
      for (const entry of entries) (entry.target as HTMLElement).dataset.inview = entry.isIntersecting ? "true" : "false";
    });
    loops.forEach((el) => loopObserver.observe(el));

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return () => loopObserver.disconnect();

    const viewportBottom = window.innerHeight;
    // JS tới quá muộn (mạng chậm): CSS "failsafe" đã cho hiện phần tử sau 3s → không ẩn lại những gì đang thấy.
    const late = performance.now() > 2800;
    const pending: HTMLElement[] = [];
    const initial: HTMLElement[] = [];
    const timers: number[] = [];

    for (const [selector, variant] of GROUPS) {
      document.querySelectorAll<HTMLElement>(selector).forEach((el) => {
        if (el.dataset.reveal) return;
        el.dataset.reveal = "done";
        const rect = el.getBoundingClientRect();
        const inView = rect.top < viewportBottom && rect.bottom > 0;
        // Đã cuộn qua (phía trên màn hình) → hiện ngay, tĩnh. Đang thấy + JS tới muộn → giữ nguyên.
        if (rect.bottom <= 0 || (late && inView)) return;
        // Phần tử đang thấy lúc tải đã được CSS (html.m-js, gắn bằng script nội tuyến trước lần vẽ đầu) ẩn sẵn nên không
        // nháy: chúng xuất hiện ngay, nối tiếp intro của hero. Phần tử nằm dưới: chờ tới khi cuộn vào màn hình.
        el.dataset.motion = variant;
        el.classList.add("reveal-pending");
        (inView ? initial : pending).push(el);
      });
    }
    if (pending.length === 0 && initial.length === 0) return () => loopObserver.disconnect();
    // Chốt trạng thái "ẩn chờ" trước khi gắn .is-revealed (để transition chạy từ trạng thái ẩn).
    void document.body.offsetWidth;

    // Các phần tử anh em (cùng cha, cùng kiểu) xuất hiện trong cùng lượt → trễ 0, 1×, 2×… (tối đa 5 bước),
    // SẮP THEO THỨ TỰ DOM (IntersectionObserver không đảm bảo thứ tự entries) → quy trình luôn 01 → 02 → 03 → 04.
    const reveal = (batch: HTMLElement[], baseDelay = 0) => {
      const batchIndex = new Map<string, number>();
      const parents = new Map<Element, number>();
      for (const el of [...batch].sort(byDocumentOrder)) {
        const variant = (el.dataset.motion ?? "rise") as Variant;
        const parent = el.parentElement ?? document.body;
        if (!parents.has(parent)) parents.set(parent, parents.size);
        const key = `${parents.get(parent)}:${variant}`;
        const index = batchIndex.get(key) ?? 0;
        batchIndex.set(key, index + 1);
        const delay = baseDelay + Math.min(index, MAX_STAGGER_STEPS) * STAGGER_MS[variant];
        el.style.setProperty("--reveal-delay", `${delay}ms`);
        el.classList.add("is-revealed");
        const number = el.querySelector<HTMLElement>(".workflow-number");
        if (number) countIn(number, delay + COUNT_DELAY_MS);
        timers.push(
          window.setTimeout(() => {
            el.classList.remove("reveal-pending", "is-revealed");
            el.style.removeProperty("--reveal-delay");
            delete el.dataset.motion;
          }, delay + SETTLE_MS[variant] + 120),
        );
      }
    };

    if (initial.length) reveal(initial, INITIAL_DELAY_MS);

    const observer = new IntersectionObserver(
      (entries) => {
        const batch = entries.filter((e) => e.isIntersecting).map((e) => e.target as HTMLElement);
        batch.forEach((el) => observer.unobserve(el));
        reveal(batch);
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.12 },
    );
    pending.forEach((el) => observer.observe(el));
    return () => {
      observer.disconnect();
      loopObserver.disconnect();
      timers.forEach((t) => window.clearTimeout(t));
    };
  }, [pathname]);

  return null;
}
