export function readFileAsDataURL(file: File) {
  const reader = new FileReader();
  return new Promise<string>(resolve => {
    reader.addEventListener('load', () => resolve(reader.result as string));
    reader.readAsDataURL(file);
  });
}
