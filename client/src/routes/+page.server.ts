import type { Action } from './$types';

// @ts-ignore
export async function load({ fetch }) {
	const res = await fetch('http://blog-deno:8081/posts');
	const posts = await res.json();

	return { posts };
}

export const actions: Record<string, Action> = {
	send: async ({ request }) => {
		const data = await request.formData();
		const title = data.get('post-title')?.toString();
		const content = data.get('post-content')?.toString();

		const res = await fetch('http://blog-deno:8081/posts', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ title, content })
		});

		return { success: res.ok };
	}
};
