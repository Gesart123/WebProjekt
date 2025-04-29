<script>
	import { onMount } from "svelte";
	import { get } from 'svelte/store';
	import { page } from '$app/stores';

	let { data, form } = $props();
	let article = $state();
	let uuid = get(page).params.uuid;

	onMount(async () => {
		const res = await fetch(`/admin/api/articles/${uuid}`);
		article = await res.json();
	});
</script>

{#if article}
	<div class="max-w-4xl mx-auto mt-10 px-4 space-y-10">
		
		<!-- Article Section -->
		<div class="space-y-4">
			<img src={article.image} alt=""
				class="w-full h-[300px] object-cover rounded-xl shadow-md" />

			<div class="space-y-2">
				<h1 class="text-3xl font-bold text-gray-800">{article.author}'s Article</h1>
				<p class="text-gray-700 text-base">{article.description}</p>
				<p class="text-sm text-gray-500">❤️ Votes: {article.votes}</p>
			</div>
		</div>

		<!-- Comments List -->
		<div class="space-y-4">
			<h2 class="text-2xl font-semibold text-gray-800">🗨️ Comments</h2>


				<ul class="space-y-4">
					{#each data.comments as comment}
					<h1>{comment.name}</h1>
						<li class="bg-gray-50 p-4 rounded-lg shadow-sm border">
							<p class="font-semibold text-blue-700">{comment.name}</p>
							<p class="text-sm text-gray-700 mt-1">{comment.text}</p>
						</li>
					{/each}
				</ul>	

		</div>

		<!-- Comment Form -->
		<div class="pt-6 border-t">
			<h2 class="text-xl font-semibold text-gray-800 mb-4">💬 Write a Comment</h2>

			<form method="POST" action="?/writeComment" class="space-y-4">
				<input type="hidden" name="articleID" value={article.id} />

				<div>
					<label for="name" class="block text-sm font-medium text-gray-700">Your Name</label>
					<input type="text" name="name" id="name" required
						class="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-400" />
				</div>

				<div>
					<label for="text" class="block text-sm font-medium text-gray-700">Your Comment</label>
					<textarea name="comment" id="text" required rows="4"
						class="w-full mt-1 px-4 py-2 border rounded-md resize-none focus:outline-none focus:ring focus:border-blue-400"></textarea>
				</div>

				<button type="submit"
					class="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition">
					Post Comment
				</button>
			</form>
		</div>
	</div>
{/if}
