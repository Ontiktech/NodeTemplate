export function convertToBase64(value: string): string {
  return Buffer.from(value).toString('base64');
}
