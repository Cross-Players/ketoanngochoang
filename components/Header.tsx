"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { COMPANY, NAVIGATION, ROUTES, SERVICES, serviceItemHref } from "@/data/site";
import { getPublicAssetPath } from "@/lib/site-paths";

function normalizePath(path: string | null): string {
  if (!path) return "/";
  const trimmed = path.replace(/\/+$/, "");
  return trimmed === "" ? "/" : trimmed;
}

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const pathname = normalizePath(usePathname());

  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMenuOpen(false);
        setServicesOpen(false);
      }
    }

    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, []);

  // Thanh tiến độ cuộn mỏng ở đáy header: scaleX theo % trang đã cuộn (rAF, passive). Ẩn khi reduced-motion (CSS).
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const bar = progressRef.current;
    if (!bar) return;
    let ticking = false;
    const update = () => {
      ticking = false;
      const doc = document.documentElement;
      const max = Math.max(1, doc.scrollHeight - window.innerHeight);
      const p = Math.min(1, Math.max(0, window.scrollY / max));
      bar.style.transform = `scaleX(${p.toFixed(4)})`;
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    update();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  function closeAll() {
    setMenuOpen(false);
    setServicesOpen(false);
  }

  function isCurrent(href: string) {
    if (href === ROUTES.home) return pathname === "/";
    if (href.startsWith("/#")) return false;
    return normalizePath(href) === pathname;
  }

  return (
    <header className="site-header" id="top">
      <div className="topline">
        <div className="container topline-inner">
          <p className="topline-contact">
            <span className="topline-address">{COMPANY.address}, {COMPANY.city}</span>
            <a href={COMPANY.hotlineHref}>Hotline: <strong>{COMPANY.hotline}</strong></a>
          </p>
          <p className="topline-actions">
            <Link href={ROUTES.contact}>Gửi yêu cầu tư vấn</Link>
            <b aria-hidden="true">/</b>
            <a href={COMPANY.zaloHref}>Zalo {COMPANY.phone}</a>
          </p>
        </div>
      </div>
      <div className="nav-wrap">
        <div className="container nav-row">
          <button
            id="primary-menu-toggle"
            className="menu-toggle"
            type="button"
            aria-expanded={menuOpen}
            aria-controls="primary-nav"
            aria-label={menuOpen ? "Đóng menu" : "Mở menu"}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span className={`menu-icon${menuOpen ? " is-open" : ""}`} aria-hidden="true"><i /><i /><i /></span>
          </button>
          {/* Tên truy cập = chữ hiển thị ("CÔNG TY TNHH TƯ VẤN & DỊCH VỤ NGỌC HOÀNG"); logo cạnh chữ là trang trí (alt rỗng). */}
          <Link className="brand" href={ROUTES.home} onClick={closeAll}>
            <img src={getPublicAssetPath("/logo-ngoc-hoang-128.png")} width="128" height="128" alt="" />
            <span className="brand-text">
              {/* Tên pháp nhân đầy đủ: "CÔNG TY TNHH TƯ VẤN & DỊCH VỤ" trên, "NGỌC HOÀNG" dưới. */}
              <span className="brand-sub">CÔNG TY TNHH TƯ VẤN &amp; DỊCH VỤ</span>
              <span className="brand-name">NGỌC HOÀNG</span>
            </span>
          </Link>
          <nav className={`primary-nav${menuOpen ? " is-open" : ""}`} id="primary-nav" aria-label="Điều hướng chính">
            <ul className="nav-list">
              {NAVIGATION.map((item) => {
                if (item.href === ROUTES.services) {
                  return (
                    <li key={item.label} className={`nav-item nav-item-services${servicesOpen ? " is-open" : ""}`}>
                      <div className="nav-item-head">
                        <Link href={item.href} onClick={closeAll}>{item.label}</Link>
                        <button
                          className="submenu-toggle"
                          type="button"
                          aria-expanded={servicesOpen}
                          aria-controls="mega-services"
                          aria-label={servicesOpen ? "Thu gọn danh sách dịch vụ" : "Mở danh sách dịch vụ"}
                          onClick={() => setServicesOpen((open) => !open)}
                        >
                          <span aria-hidden="true" className="chevron" />
                        </button>
                      </div>
                      <div className="mega-menu" id="mega-services">
                        <div className="container mega-grid">
                          {SERVICES.map((service) => (
                            <div className="mega-col" key={service.slug}>
                              <p className="mega-title">
                                <img src={getPublicAssetPath(service.image)} alt="" width="28" height="28" loading="lazy" />
                                <Link href={service.href} onClick={closeAll}>{service.title}</Link>
                              </p>
                              <ul>
                                {service.subServices.map((sub) => (
                                  <li key={sub}><Link href={serviceItemHref(sub)} onClick={closeAll}>{sub}</Link></li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </div>
                    </li>
                  );
                }
                const cta = Boolean(item.cta);
                return (
                  <li key={item.label} className={`nav-item${cta ? " nav-item-cta" : ""}`}>
                    <Link href={item.href} aria-current={isCurrent(item.href) ? "page" : undefined} onClick={closeAll}>{item.label}</Link>
                  </li>
                );
              })}
            </ul>
          </nav>
          <a className="nav-phone" href={COMPANY.phoneHref} aria-label={`Gọi hotline ${COMPANY.phone}`}>
            <img src={getPublicAssetPath("/phone-icon.svg")} alt="" width="18" height="18" />
            <span>{COMPANY.phone}</span>
          </a>
        </div>
      </div>
      <div className="scroll-progress" ref={progressRef} aria-hidden="true" />
    </header>
  );
}
