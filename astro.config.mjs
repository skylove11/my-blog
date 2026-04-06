// @ts-check
import { defineConfig } from "astro/config";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";

// GitHub Pages (프로젝트 사이트): https://skylove11.github.io/my-blog/
// CI(.github/workflows/deploy.yml)에서 ASTRO_SITE / ASTRO_BASE를 설정합니다. 로컬에서 동일 경로로 미리보려면:
//   $env:ASTRO_SITE="https://skylove11.github.io"; $env:ASTRO_BASE="/my-blog"; npm run build; npm run preview
const site = process.env.ASTRO_SITE ?? "https://skylove11.github.io";
const base = process.env.ASTRO_BASE ?? "/my-blog";

// https://astro.build/config
export default defineConfig({
	site,
	base,
	output: "static",
	markdown: {
		gfm: true,
		smartypants: true,
		syntaxHighlight: "shiki",
		shikiConfig: {
			/* github-* 는 문자열·키워드에 청색이 많음 → 그루브박스로 톤을 따뜻하게 */
			themes: {
				light: "gruvbox-light-medium",
				dark: "gruvbox-dark-medium",
			},
			wrap: true,
		},
		rehypePlugins: [
			rehypeSlug,
			[
				rehypeAutolinkHeadings,
				{
					behavior: "append",
					properties: {
						class: "heading-anchor",
					},
					content: {
						type: "text",
						value: "#",
					},
				},
			],
		],
	},
});
