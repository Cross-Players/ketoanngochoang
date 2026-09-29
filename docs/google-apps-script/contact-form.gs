/**
 * Nhận biểu mẫu "Gửi yêu cầu tư vấn" của website Ngọc Hoàng và ghi vào Google Sheet.
 *
 * Website gửi POST application/x-www-form-urlencoded với các trường:
 *   name, phone, message, page (URL trang gửi), website (bẫy spam – người thật luôn để trống).
 * Dữ liệu ghi vào sheet "LienHe" (tự tạo nếu chưa có) với các cột:
 *   Thời gian | Họ tên | SĐT/Zalo | Nội dung | Trang
 *
 * Cách cài đặt: xem README.md cùng thư mục.
 */
function doPost(e) {
  var p = (e && e.parameter) || {};
  // Bẫy spam: có giá trị ở ô "website" → bỏ qua, vẫn trả "ok" để bot không biết.
  if (p.website) return ContentService.createTextOutput('ok');
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName('LienHe') || ss.insertSheet('LienHe');
  // Sheet trống → thêm dòng tiêu đề.
  if (sheet.getLastRow() === 0) sheet.appendRow(['Thời gian', 'Họ tên', 'SĐT/Zalo', 'Nội dung', 'Trang']);
  sheet.appendRow([new Date(), p.name || '', p.phone || '', p.message || '', p.page || '']);
  return ContentService.createTextOutput('ok');
}
