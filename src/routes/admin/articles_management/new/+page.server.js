import { createConnection } from '$lib/db/mysql';
import { redirect, error } from '@sveltejs/kit';
import { put } from '@vercel/blob';
import { BLOB_READ_WRITE_TOKEN } from '$env/static/private';


// Load articles for homepage (first 25, sorted by votes)
export async function load() {
	const connection = await createConnection();
	const [articles] = await connection.execute(
		'SELECT * FROM articles ORDER BY votes DESC LIMIT 25'
	);
	return { articles };
}

// Admin actions: Add, Delete, Upvote
export const actions = {
	uploadArticle: async ({ request }) => {
		const form = await request.formData();
		
		const connection = await createConnection();
		const image = form.get('image'); // expects image URL
		const description = form.get('description');
		const author = form.get('author');

		if(!image){
			throw error(400, {message: 'no file to upload'});
		}
		const {url} = await put('insta/' + image.name, image , {
			access: 'public',
			token: BLOB_READ_WRITE_TOKEN,
			allowOverwrite: true
	});
		
		await connection.execute(
			'INSERT INTO articles (image, description, author) VALUES (?, ?, ?)',
			[url, description, author]
		);
		throw redirect(303, '/');
	},

	

	
};
