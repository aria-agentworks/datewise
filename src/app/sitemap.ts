export default function sitemap() {
  return [
    { url: 'https://datewise-app.vercel.app', lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 1 },
    { url: 'https://datewise-app.vercel.app/#pricing', lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.8 },
  ]
}
