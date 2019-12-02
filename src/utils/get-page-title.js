import defaultSettings from '@/settings'

const title = defaultSettings.title || '性能众测 - 可信云'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
