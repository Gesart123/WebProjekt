<script>
	import '../app.css';

	let { children } = $props();
</script>

<nav class="bg-gray-900 text-white px-6 py-4 flex gap-6 items-center shadow-md">
	<a href="/" class="hover:underline text-white font-semibold text-lg hover:text-blue-400 transition-colors">Home</a>
	<a href="/admin/articles_management" class="hover:underline text-white font-semibold text-lg hover:text-blue-400 transition-colors">Articles</a>
	<a href="/admin/users" class="hover:underline text-white font-semibold text-lg hover:text-blue-400 transition-colors">Users</a>
</nav>
<main class="px-6 py-8">

{@render children()}
</main>
