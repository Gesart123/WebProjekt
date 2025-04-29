<script>
	let { data } = $props();
</script>

<h1>📸 Image Blog – Discover Photos</h1>
<div class="flex items-center justify-center flex-col">
	<a href="/">article overview</a>
	<a href="/admin/articles_management/new">Create new article</a>

</div>
	

<ul class="space-y-4 mt-4">
	{#each data.articles as article}
		<li class="w-full h-[150px] flex items-center justify-between bg-white border border-gray-200 rounded-xl shadow-sm px-4 py-2">
			<!-- Image -->
			<img src={article.image} alt=""
				class="h-full w-[150px] object-cover rounded-lg mr-4" />

			<!-- Info -->
			<div class="flex-1 overflow-hidden pr-4">
				<a href={`/api/articles/${article.id}`} class="block text-lg font-semibold text-blue-600 truncate hover:underline">
					{article.author}'s post
				</a>
				<p class="text-sm text-gray-700 truncate">{article.description}</p>
				<p class="text-xs text-gray-500 mt-1">❤️ Votes: {article.votes}</p>
			</div>

			<!-- Delete button -->
			<form action="?/deleteArticle" method="POST" class="ml-4">
				<input type="hidden" value={article.id} name="id" />
				<button type="submit"
					class="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 text-sm transition">
					Delete
				</button>
			</form>
		</li>
	{/each}
</ul>


