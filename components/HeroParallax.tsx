"use client";

import { useEffect } from "react";

/**
 * Chiều sâu cho hero trang chủ khi cuộn (parallax nhiều lớp).
 *
 * - Ảnh: scale sẵn 1.14 bằng CSS (chỉ khi không bật reduced-motion) → .hero-image overflow:hidden cắt phần dư 7% mỗi cạnh;
 *   JS dịch ảnh xuống 0 → 95% phần đệm trong lúc hero cuộn khỏi màn hình (chậm hơn nội dung, không lộ mép).
 * - Khung ảnh trôi xuống nhẹ (translate), khối chữ trôi lên + mờ dần một chút (chỉ desktop), vòng tròn cam nền
 *   trôi ngược chiều (biến --hero-p cho ::after) → 3 lớp chuyển động khác tốc độ tạo chiều sâu.
 * - Dùng thuộc tính `translate` / `scale` riêng nên không đè lên animation giới thiệu (CSS) của cùng phần tử.
 * - Chỉ transform/opacity; scroll passive, gom 1 lần/khung hình bằng rAF; IntersectionObserver bỏ qua khi hero ngoài
 *   màn hình và gắn data-inview để CSS tạm dừng vòng lặp ánh sáng nền. prefers-reduced-motion: reduce → không chạy.
 */
const SCALE = 1.14;
const RANGE = 0.95; // dùng 95% phần đệm để luôn còn mép an toàn (không lộ khe)

export function HeroParallax() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const hero = document.querySelector<HTMLElement>(".hero");
    const content = hero?.querySelector<HTMLElement>(".hero-content");
    const wrap = hero?.querySelector<HTMLElement>(".hero-image");
    const img = wrap?.querySelector<HTMLElement>("img");
    if (!hero || !content || !wrap || !img) return;

    const desktop = window.matchMedia("(min-width: 761px)");
    let ticking = false;
    let onScreen = true;

    const update = () => {
      ticking = false;
      if (!onScreen) return;
      const heroRect = hero.getBoundingClientRect();
      const heroBottomInDoc = heroRect.bottom + window.scrollY;
      const progress = Math.min(1, Math.max(0, window.scrollY / Math.max(1, heroBottomInDoc)));
      const pad = ((SCALE - 1) / 2) * img.offsetHeight; // px đệm mỗi cạnh (kích thước chưa transform)
      img.style.transform = `translate3d(0, ${(progress * pad * RANGE).toFixed(2)}px, 0) scale(${SCALE})`;
      const big = desktop.matches;
      wrap.style.translate = `0 ${(progress * (big ? 56 : 28)).toFixed(2)}px`;
      if (big) {
        content.style.translate = `0 ${(progress * -44).toFixed(2)}px`;
        content.style.opacity = (1 - progress * 0.5).toFixed(3);
      } else {
        content.style.removeProperty("translate");
        content.style.removeProperty("opacity");
      }
      hero.style.setProperty("--hero-p", progress.toFixed(4));
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };

    const io = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
      hero.dataset.inview = onScreen ? "true" : "false";
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
      wrap.style.removeProperty("translate");
      content.style.removeProperty("translate");
      content.style.removeProperty("opacity");
      hero.style.removeProperty("--hero-p");
      delete hero.dataset.inview;
    };
  }, []);

  return null;
}
