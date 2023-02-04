<script lang="ts">
type Post = {
	id: number;
	title: string;
	content: string;
};

export let data: Record<'posts', Post[]>;
</script>

<div class="code">
	<h1>All Posts</h1>
	<pre>{JSON.stringify(data.posts, null, '  ')}</pre>
</div>

<div class="send">
	<h1>Send Post</h1>
	<form method="POST" action="?/send">
		<label for="post-title">Title</label>
		<input name="post-title" type="text" />
		<label for="post-content">Content</label>
		<textarea name="post-content" />
		<button formaction="?/send">Send</button>
	</form>
</div>

<style>
.code {
	border: 1px solid black;
	padding: 0 1rem 2rem;
}
.send form {
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
}
.send button {
	padding: 0.5rem;
}
textarea {
	resize: vertical;
}
</style>
