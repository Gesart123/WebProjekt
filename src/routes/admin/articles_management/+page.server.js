import { createConnection } from "$lib/db/mysql";
import { redirect } from "@sveltejs/kit";

export async function load() {
	const connection = await createConnection();
	const [articles] = await connection.execute('SELECT * FROM articles ORDER BY votes DESC LIMIT 25');

	return {
		articles
	};
}

export const actions = {
	deleteArticle: async ({ request }) => {
		const form = await request.formData();
		const articleId = form.get('id');

		const connection = await createConnection();
		await connection.execute('DELETE FROM articles WHERE id = ?', [articleId]);

		throw redirect(303, '/admin/articles_management'); // adjust if needed
	}
};
