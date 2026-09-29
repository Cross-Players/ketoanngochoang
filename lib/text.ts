/** "TIẾP NHẬN THÔNG TIN" → "Tiếp nhận thông tin" (chữ hoa đầu câu, theo quy tắc tiếng Việt). */
export function sentenceCase(text: string): string {
  return text.charAt(0) + text.slice(1).toLocaleLowerCase("vi");
}
