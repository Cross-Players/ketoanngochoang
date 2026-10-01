export const PUBLIC_BASE_PATH = "";

export function getPublicAssetPath(path: string): string {
  if (
    !path.startsWith("/") ||
    path === PUBLIC_BASE_PATH ||
    path.startsWith(`${PUBLIC_BASE_PATH}/`)
  ) {
    return path;
  }

  return `${PUBLIC_BASE_PATH}${path}`;
}
