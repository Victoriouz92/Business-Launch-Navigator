import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/settings", "/dashboard", "/step/", "/expenses"],
      },
    ],
    sitemap: "https://navigator-wheat.vercel.app/sitemap.xml",
  }
}
