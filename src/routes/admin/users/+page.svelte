<script>
	let {data} = $props();
</script>

<h1 class="text-2xl font-bold mb-4">All Users</h1>

{#each data.users as user}
	<div class="border rounded p-4 mb-4">
		<p><strong>ID:</strong> {user.id}</p>
		<p><strong>Email:</strong> {user.email}</p>
		<p><strong>Username:</strong> {user.username}</p>
		<p><strong>Role:</strong> {user.role}</p>

		<form method="POST" class="mt-2">
			<input type="hidden" name="id" value={user.id} />
			<button
				type="submit"
				formaction="?/deleteUser"
				class="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
				onclick={() => confirm('Are you sure you want to delete this user?')}
			>
				Delete User
			</button>
		</form>
	</div>
{/each}
