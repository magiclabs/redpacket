export function validateUrl(url: string): boolean {
  // 정규표현식 패턴
  const pattern1 = /^http:\/\/localhost:\d+\/claim\/.+$/
  const pattern2 = /^https:\/\/[^/]+\.magic\.link\/claim\/.+$/
  const pattern3 = /^https:\/\/[^/]+\.magiclabs\.vercel\.app\/claim\/.+$/

  return pattern1.test(url) || pattern2.test(url) || pattern3.test(url)
}
