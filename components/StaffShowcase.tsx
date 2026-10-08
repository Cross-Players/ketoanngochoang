import { STAFF, STAFF_PHOTO_WIDTHS } from "@/data/staff";
import { getPublicAssetPath } from "@/lib/site-paths";

const photoPath = (photo: string, width: number) => getPublicAssetPath(`/staff/${photo}-${width}.webp`);
const LARGEST = STAFF_PHOTO_WIDTHS[STAFF_PHOTO_WIDTHS.length - 1];

/**
 * Slogan trong ngoặc kép (tô cam qua .staff-quote). Hai vế "A — B": mỗi vế một khối (.staff-slogan-part, xuống dòng + cân dòng riêng) để không bị ngắt giữa vế.
 * Câu chữ giữ nguyên; khoảng trắng sau dấu gạch nằm trong vế đầu nên văn bản đọc/sao chép vẫn liền mạch.
 */
function sloganLines(slogan: string) {
  const open = <span className="staff-quote">“</span>;
  const close = <span className="staff-quote">”</span>;
  const [first, ...rest] = slogan.split(" — ");
  if (!rest.length) return <>{open}{slogan}{close}</>;
  return (
    <>
      <span className="staff-slogan-part">{open}{first} — </span>
      <span className="staff-slogan-part">{rest.join(" — ")}{close}</span>
    </>
  );
}

/**
 * Thẻ nhân sự (ảnh, họ tên, chức danh, slogan) – chỉ dùng ở trang Giới thiệu (/gioi-thieu/).
 * Ảnh nằm dưới màn hình đầu → loading="lazy"; `sizes` khớp bố cục trong globals.css (.staff-grid):
 * ≤760px thẻ dọc toàn chiều rộng (tối đa 420px); từ 761px lưới 3 cột trong khung tối đa 1100px (khe 30px).
 */
export function StaffShowcase() {
  return (
    <ul className="staff-grid">
      {STAFF.map((member) => (
        <li className="staff-card" key={member.photo}>
          <div className="staff-photo">
            <img
              src={photoPath(member.photo, 540)}
              srcSet={STAFF_PHOTO_WIDTHS.map((width) => `${photoPath(member.photo, width)} ${width}w`).join(", ")}
              sizes="(max-width: 760px) min(calc(100vw - 40px), 420px), (max-width: 1060px) calc((100vw - 100px) / 3), 347px"
              alt={`${member.name} – ${member.title}`}
              width={LARGEST}
              height={(LARGEST * 5) / 4}
              loading="lazy"
              decoding="async"
            />
          </div>
          <div className="staff-body">
            <h3 className="staff-name">{member.name}</h3>
            <p className="staff-title">{member.title}</p>
            <p className="staff-slogan">{sloganLines(member.slogan)}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
