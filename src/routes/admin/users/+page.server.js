import { createConnection } from "$lib/db/mysql";
import { redirect } from "@sveltejs/kit";

export async function load({locals}) {
    if (!locals.user || locals.user.role !== "admin") {
        redirect(302, '/login');
    }    
	const connection = await createConnection();
	const [users] = await connection.execute('SELECT id, email, username, role FROM users ORDER BY id DESC');
	return {
		users
	};
}

export const actions = {
	deleteUser: async ({ request }) => {
		const form = await request.formData();
		const userId = form.get('id');

		const connection = await createConnection();
		await connection.execute('DELETE FROM users WHERE id = ?', [userId]);

		throw redirect(303, '/admin/users');
	}
};
