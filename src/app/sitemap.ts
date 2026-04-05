export default function sitemap() {
  return [
    { url: 'https://datewise.app', lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 1 },
    { url: 'https://datewise.app/#pricing', lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.8 },
  ]
}
