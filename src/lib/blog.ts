import { getCollection, type CollectionEntry } from "astro:content";

export function includeDrafts(): boolean {
	return import.meta.env.DEV;
}

export async function getPublishedPosts(): Promise<CollectionEntry<"blog">[]> {
	const posts = await getCollection("blog", ({ data }) => includeDrafts() || !data.draft);
	posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
	return posts;
}

export type MonthKey = `${number}-${string}`;

export function monthKeyFromDate(d: Date): MonthKey {
	const y = d.getFullYear();
	const m = String(d.getMonth() + 1).padStart(2, "0");
	return `${y}-${m}`;
}

export function groupPostsByMonth(posts: CollectionEntry<"blog">[]): Map<MonthKey, CollectionEntry<"blog">[]> {
	const map = new Map<MonthKey, CollectionEntry<"blog">[]>();
	for (const post of posts) {
		const key = monthKeyFromDate(post.data.date);
		const list = map.get(key) ?? [];
		list.push(post);
		map.set(key, list);
	}
	return map;
}

export function formatMonthLabel(key: MonthKey): string {
	const [y, m] = key.split("-");
	return `${y}년 ${parseInt(m, 10)}월`;
}
