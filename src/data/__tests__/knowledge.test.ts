import { describe, it, expect } from "vitest"
import { ARTICLES, getArticleBySlug, getAllArticleSlugs } from "../knowledge"

describe("knowledge aggregator", () => {
  it("finds an article by its slug", () => {
    const article = getArticleBySlug("kak-se-registrira-eood")
    expect(article?.slug).toBe("kak-se-registrira-eood")
  })

  it("returns undefined for an unknown slug", () => {
    expect(getArticleBySlug("this-slug-does-not-exist")).toBeUndefined()
  })

  it("returns one slug per article, with no duplicates", () => {
    const slugs = getAllArticleSlugs()
    expect(slugs.length).toBe(ARTICLES.length)
    expect(new Set(slugs).size).toBe(slugs.length)
  })

  it("every article has non-empty blocks and required metadata", () => {
    for (const article of ARTICLES) {
      expect(article.blocks.length).toBeGreaterThan(0)
      expect(article.title.length).toBeGreaterThan(0)
      expect(article.metaDescription.length).toBeGreaterThan(0)
      expect(article.publishedDate).toMatch(/^\d{4}-\d{2}-\d{2}$/)
    }
  })
})
