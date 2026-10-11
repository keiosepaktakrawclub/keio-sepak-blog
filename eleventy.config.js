import { HtmlBasePlugin } from "@11ty/eleventy";
import site from "./src/_data/site.js";

export default function (eleventyConfig) {
  // GitHub Pages のサブパス（/リポジトリ名/）に自動対応
  eleventyConfig.addPlugin(HtmlBasePlugin);

  eleventyConfig.addPassthroughCopy("src/images");
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/admin");
  eleventyConfig.ignores.add("src/admin/**");

  // 卒業年度(西暦) → 代
  const genOf = (gradYear) => Number(gradYear) - site.firstGradYear + 1;
  eleventyConfig.addFilter("gen", genOf);
  // 2027 → "27卒"
  eleventyConfig.addFilter("sotsu", (y) => `${String(y).slice(-2)}卒`);

  eleventyConfig.addFilter("date", (d) => {
    const x = new Date(d);
    return `${x.getFullYear()}.${String(x.getMonth() + 1).padStart(2, "0")}.${String(x.getDate()).padStart(2, "0")}`;
  });
  eleventyConfig.addFilter("isoDate", (d) => new Date(d).toISOString().slice(0, 10));
  eleventyConfig.addFilter("excerpt", (html = "", n = 90) => {
    const t = html.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
    return t.length > n ? t.slice(0, n) + "…" : t;
  });
  eleventyConfig.addFilter("byAuthor", (posts, id) => posts.filter((p) => p.data.author === id));
  eleventyConfig.addFilter("byGen", (posts, gradYear, members) =>
    posts.filter((p) => members.find((m) => m.id === p.data.author)?.gradYear == gradYear)
  );
  eleventyConfig.addFilter("member", (members, id) => members.find((m) => m.id === id));
  eleventyConfig.addFilter("membersOf", (members, gradYear) =>
    members.filter((m) => m.gradYear == gradYear)
  );
  // リレーの状態：最新記事を書いた人の「次」がバトン保持者
  eleventyConfig.addFilter("relayState", (order = [], posts = []) => {
    if (!order.length) return { current: null, next: null, lastAuthor: null };
    const latest = posts.find((p) => order.includes(p.data.author));
    const i = latest ? order.indexOf(latest.data.author) : -1;
    const cur = (i + 1) % order.length;
    return {
      lastAuthor: latest ? latest.data.author : null,
      current: order[cur],
      next: order[(cur + 1) % order.length],
      index: cur,
    };
  });
  eleventyConfig.addFilter("limit",(arr, n) => arr.slice(0, n));

  eleventyConfig.addCollection("posts", (api) =>
    api.getFilteredByGlob("src/posts/*.md").sort((a, b) => b.date - a.date)
  );

  return {
    dir: { input: "src", output: "_site", includes: "_includes", data: "_data" },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    pathPrefix: process.env.PATH_PREFIX || "/",
  };
}
