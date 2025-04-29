<script>
	let { data } = $props();
	import { flip } from 'svelte/animate';

	let filteredArticles = $state(data.articles);
	let selectedAuthor = $state('all');

	let authors = Array.from(new Set(data.articles.map(a => a.author)));

	function filterArticles() {
		if (selectedAuthor === 'all') {
			filteredArticles = data.articles;
		} else {
			filteredArticles = data.articles.filter(a => a.author === selectedAuthor);
		}
	}
</script>


<div class="p-6 max-w-4xl mx-auto">
	{#if data.user}
		<div class="flex justify-between items-center bg-blue-200 p-4 rounded-lg shadow">
			<p class="text-lg font-semibold text-blue-800">Welcome back, {data.user.username}!</p>
			<div class="flex gap-2">
				<form action="/logout?/logout" method="POST">
                    <button type="submit" class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Logout</button>
                </form>
			</div>
		</div>
	{:else}
		<div class="text-center p-4 bg-blue-100 rounded-lg shadow">
			<p class="text-lg font-medium text-blue-800">You are not logged in.</p>
			<p class="mt-2">
				<a href="/login" class="text-blue-600 hover:underline">Login</a>
				or
				<a href="/register" class="text-blue-600 hover:underline">Register</a>
			</p>
		</div>
	{/if}
</div>


<h1 class="text-3xl font-bold text-center mt-6 text-blue-700">Image Blog</h1>
<p class="text-center text-blue-500 mt-2">Filtern nach Autor:</p>


<div class="flex justify-center mt-4">
	<select class="border rounded px-4 py-2 shadow bg-white text-blue-700 border-blue-400" bind:value={selectedAuthor} onchange={filterArticles} >
		<option value="all">Alle Autoren</option>
		{#each authors as author}
			<option value={author}>{author}</option>
		{/each}
	</select>
</div>

<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6 p-6">
	{#each filteredArticles.slice(0, 25) as article (article.id)}
		<div class="bg-blue-50 p-4 rounded-lg shadow hover:shadow-lg transition border border-blue-300" animate:flip>
			<a href={`/admin/api/articles/${article.id}`}>
				<img src={article.image} alt="uploaded" class="w-full h-auto rounded" />
			</a>
			<p class="mt-2 font-semibold">{article.description}</p>
			<p class="text-sm text-gray-700">Autor: {article.author}</p>
			<p class="text-sm text-blue-800">Votes: {article.votes}</p>

			<form method="POST" action='?/upvote' class="mt-2">
				<input type="hidden" value={article.id} name="id">
				<button class="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">Upvote</button>
			</form>
		</div>
	{/each}
</div>
