<script>
	let { data } = $props();
</script>

<h1 class="text-3xl font-bold text-center mt-8 mb-6 text-gray-800">Create a New Article</h1>

<form method="POST" action="?/uploadArticle" class="max-w-2xl mx-auto bg-white p-6 rounded-2xl shadow-md space-y-4" enctype="multipart/form-data">
	<div>
		<label for="image" class="block text-sm font-medium text-gray-700">Image URL</label>
		<input type="file" name="image" id="image"
			class="mt-1 w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring focus:border-blue-300" />
	</div>

	<div>
		<label for="description" class="block text-sm font-medium text-gray-700">Description</label>
		<textarea name="description" id="description" required placeholder="Enter description"
			class="mt-1 w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring focus:border-blue-300 resize-none h-28"></textarea>
	</div>

	<div>
		<label for="author" class="block text-sm font-medium text-gray-700">Author</label>
		<input type="text" name="author" id="author" required placeholder="Enter author name"
			class="mt-1 w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring focus:border-blue-300" />
	</div>

	<button type="submit"
		class="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition">Upload Article</button>
</form>

