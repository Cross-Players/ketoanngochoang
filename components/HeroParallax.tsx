"use client";

import { useEffect } from "react";

/**
 * Parallax nhẹ trên ảnh hero (trang chủ).
 *
 * - Ảnh được scale sẵn 1.1 bằng CSS (chỉ khi không bật reduced-motion) nên lúc JS gắn vào không có "nhảy" hình;
 *   .hero-image có overflow:hidden → phần dư 5% mỗi cạnh là "đệm" để dịch ảnh mà không lộ mép.
 * - Ảnh dịch xuống 0 → ~95% phần đệm trong lúc hero cuộn khỏi màn hình (≈ 2–3% quãng cuộn): chậm hơn nội dung.
 * - Chỉ transform; listener scroll passive, gom về 1 lần/khung hình bằng requestAnimationFrame.
 * - IntersectionObserver: hero ngoài màn hình → bỏ qua cập nhật. prefers-reduced-motion: reduce → không chạy.
 */
const SCALE = 1.1;
const RANGE = 0.95; // dùng 95% phần đệm để luôn còn mép an toàn (không lộ khe)

export function HeroParallax() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const hero = document.querySelector<HTMLElement>(".hero");
    const wrap = hero?.querySelector<HTMLElement>(".hero-image");
    const img = wrap?.querySelector<HTMLElement>("img");
    if (!hero || !wrap || !img) return;

    let ticking = false;
    let onScreen = true;

    const update = () => {
      ticking = false;
      if (!onScreen) return;
      const heroRect = hero.getBoundingClientRect();
      const heroBottomInDoc = heroRect.bottom + window.scrollY;
      const progress = Math.min(1, Math.max(0, window.scrollY / Math.max(1, heroBottomInDoc)));
      const pad = ((SCALE - 1) / 2) * img.offsetHeight; // px đệm mỗi cạnh (kích thước chưa transform)
      const y = progress * pad * RANGE;
      img.style.transform = `translate3d(0, ${y.toFixed(2)}px, 0) scale(${SCALE})`;
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };

    const io = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
      if (onScreen) onScroll();
    });
    io.observe(hero);

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    update();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      io.disconnect();
      img.style.removeProperty("transform");
    };
  }, []);

  return null;
}
