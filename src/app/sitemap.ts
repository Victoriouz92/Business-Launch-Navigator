import type { MetadataRoute } from "next"
import { ARTICLES } from "@/data/knowledge"
import { SITE_URL as BASE_URL } from "@/lib/site"

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE_URL}/guides`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/support`, changeFrequency: "monthly", priority: 0.3 },
    { url: `${BASE_URL}/contact`, changeFrequency: "monthly", priority: 0.3 },
  ]

  const articleRoutes: MetadataRoute.Sitemap = ARTICLES.map((article) => ({
    url: `${BASE_URL}/guides/${article.slug}`,
    lastModified: article.updatedDate ?? article.publishedDate,
    changeFrequency: "monthly",
    priority: 0.7,
  }))

  return [...staticRoutes, ...articleRoutes]
}
