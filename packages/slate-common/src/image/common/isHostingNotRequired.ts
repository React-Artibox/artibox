export function isHostingNotRequired(src: string) {
  return /^https?:\/\/.*/.test(src) || src.startsWith('data:image');
}
