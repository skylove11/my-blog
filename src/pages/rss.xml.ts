import rss from "@astrojs/rss";
import type { APIRoute } from "astro";
import { getPublishedPosts } from "../lib/blog";
import { siteDescription, siteTitle } from "../site.config";

export const GET: APIRoute = async (context) => {
	const posts = await getPublishedPosts();
	if (!context.site) {
		throw new Error("astro.config.mjs에 site(절대 URL)를 설정하세요.");
	}
	const basePath = import.meta.env.BASE_URL.endsWith("/")
		? import.meta.env.BASE_URL
		: `${import.meta.env.BASE_URL}/`;
	const siteRoot = new URL(basePath, context.site);
	return rss({
		title: siteTitle,
		description: siteDescription,
		site: siteRoot.href,
		items: posts.map((post) => ({
			link: new URL(`blog/${post.id}/`, siteRoot).href,
			title: post.data.title,
			pubDate: post.data.date,
			description: post.data.description ?? "",
		})),
		customData: "<language>ko-kr</language>",
	});
};
