import { createConnection } from '$lib/db/mysql';

export async function load({ locals }) {
	const connection = await createConnection();
	const [articles] = await connection.query('SELECT * FROM articles ORDER BY id DESC LIMIT 100');

	return {
		user: locals.user || null,
		articles
	};
}

export const actions = {
	upvote: async ({ request }) => {
		const formData = await request.formData();
		const articleId = formData.get('id');

		const connection = await createConnection();
		const [result] = await connection.execute(
			'UPDATE articles SET votes = votes + 1 WHERE id = ?',
			[articleId]
		);

		if (result.affectedRows === 0) {
			return { success: false, message: 'Artikel nicht gefunden' };
		}

		return { success: true };
	}
};
