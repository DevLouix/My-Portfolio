import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://devlouix.com",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    {
      url: "https://blog.devlouix.com",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    // {
    // //   url: 'https://devlouix.com/blog',
    // //   lastModified: new Date(),
    // //   changeFrequency: 'weekly',
    // //   priority: 0.5,
    // }
  ];
}
