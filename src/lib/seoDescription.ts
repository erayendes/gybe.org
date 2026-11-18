/**
 * Meta descriptions built from a page's own data: the summary first, then factual
 * sentences from the same record until the text reaches a useful length.
 * Bing flags descriptions that are too short; search results cut off near 160.
 */
const MIN = 120;
const MAX = 160;

const sentence = (text: string) => {
  const t = text.trim();
  return /[.!?]$/.test(t) ? t : `${t}.`;
};

export function seoDescription(summary: string, extras: (string | false | undefined)[]): string {
  let out = sentence(summary);
  for (const extra of extras) {
    if (out.length >= MIN) break;
    if (!extra) continue;
    const next = `${out} ${sentence(extra)}`;
    if (next.length <= MAX) out = next;
  }
  return out;
}
