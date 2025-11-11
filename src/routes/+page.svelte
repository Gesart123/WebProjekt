<script>
	let { data } = $props();

	import { flip } from 'svelte/animate';
	import { setLocale } from '$lib/paraglide/runtime';
	import { m } from '$lib/paraglide/messages.js';

	// language selector
	let selectedLang = $state('en');
	const languages = [
		{ code: 'en', label: 'English' },
		{ code: 'es', label: 'Español' },
		{ code: 'fr', label: 'Français' },
		{ code: 'sq', label: 'Shqip' },
		{ code: 'de', label: 'Deutsch' }
	];
	function changeLang(e) {
		selectedLang = e.target.value;
		setLocale(selectedLang);
	}

	// article filter
	let filteredArticles = $state(data.articles);
	let selectedAuthor = $state('all');
	let authors = Array.from(new Set(data.articles.map(a => a.author)));

	function filterArticles() {
		filteredArticles =
			selectedAuthor === 'all'
				? data.articles
				: data.articles.filter(a => a.author === selectedAuthor);
	}
</script>

<!-- BEAUTIFUL BACKGROUND -->
<div class="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-white">

	<!-- FLOATING LANGUAGE SELECTOR -->
	<div class="fixed top-4 right-4">
		<select
			class="px-4 py-2 rounded-lg border shadow bg-white text-blue-700 hover:shadow-lg transition"
			bind:value={selectedLang}
			onchange={changeLang}
		>
			{#each languages as lang}
				<option value={lang.code}>{lang.label}</option>
			{/each}
		</select>
	</div>

	<!-- MAIN CONTENT CONTAINER -->
	<div class="max-w-6xl mx-auto px-6 pt-10">

		<!-- USER BOX -->
		<div class="flex justify-center">
			<div class="w-full md:w-3/4 bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-blue-100">
				{#if data.user}
					<div class="flex justify-between items-center ">
						<p class="text-xl font-semibold text-blue-800">
							{m.welcome_back({ user: data.user.username })}
						</p>

						<form action="/logout?/logout" method="POST">
							<button class="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 shadow">
								{m.logout()}
							</button>
						</form>
					</div>

				{:else}
					<div class="text-center">
						<p class="text-lg font-medium text-blue-800">
							{m.not_logged_in()}
						</p>
						<p class="mt-2 text-blue-700">
							<a href="/login" class="underline hover:text-blue-900">{m.login()}</a>
							<span class="mx-1">{m.or()}</span>
							<a href="/register" class="underline hover:text-blue-900">{m.register()}</a>
						</p>
					</div>
				{/if}
			</div>
		</div>

		<!-- TITLE -->
		<div class="text-center mt-10">
			<h1 class="text-4xl md:text-5xl font-extrabold text-blue-700 drop-shadow-sm">
				{m.image_blog()}
			</h1>

			<p class="text-blue-500 text-lg mt-3">
				{m.filter_by_author()}
			</p>

			<!-- AUTHOR FILTER -->
			<div class="mt-4">
				<select
					class="border rounded-xl px-5 py-2 shadow bg-white text-blue-700 border-blue-300 hover:shadow-lg"
					bind:value={selectedAuthor}
					onchange={filterArticles}
				>
					<option value="all">{m.all_authors()}</option>
					{#each authors as author}
						<option value={author}>{author}</option>
					{/each}
				</select>
			</div>
		</div>

		<!-- ARTICLE GRID -->
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12 pb-16">
			{#each filteredArticles.slice(0, 25) as article (article.id)}
				<div
					class="bg-white p-4 rounded-xl shadow-md hover:shadow-xl transition border border-blue-100"
					animate:flip
				>
					<a href={`/admin/api/articles/${article.id}`}>
						<img
							src={article.image}
							alt="uploaded"
							class="w-full h-60 object-cover rounded-lg border"
						/>
					</a>

					<p class="mt-3 font-semibold text-blue-900">{article.description}</p>

					<div class="flex justify-between text-sm text-gray-600 mt-2">
						<p>{m.author()}: <span class="text-gray-800">{article.author}</span></p>
						<p>{m.votes()}: <span class="text-blue-700 font-semibold">{article.votes}</span></p>
					</div>

					<form method="POST" action='?/upvote' class="mt-4">
						<input type="hidden" value={article.id} name="id">

						<button class="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 shadow">
							{m.upvote()}
						</button>
					</form>
				</div>
			{/each}
		</div>

	</div>

</div>
