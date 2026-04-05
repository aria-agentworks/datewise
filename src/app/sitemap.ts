export default function sitemap() {
  return [
    { url: 'https://ariaagent.agency', lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 1 },
    { url: 'https://ariaagent.agency/#pricing', lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.8 },
  ]
}
