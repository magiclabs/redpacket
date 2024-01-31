export function addProtocol(url: string): string {
  if (url.startsWith('localhost')) {
    return 'http://' + url
  }
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url
  }
  return 'https://' + url
}
