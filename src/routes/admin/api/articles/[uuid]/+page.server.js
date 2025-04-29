
import { createConnection } from "$lib/db/mysql";
import { fromStore } from "svelte/store";


export async function load({ locals }){
    const connection = await createConnection();
    const [commentRows] = await connection.execute('select * from comments');
    return{
        user: locals.user,
        comments: commentRows
    }
}


export const actions = {
    writeComment: async ({ request }) => {
        const connection = await createConnection();
        const formData = await request.formData();

        const articleID = await formData.get('articleID');
        const name = await formData.get('name');
        const comment = await formData.get('comment');

        connection.execute('insert into comments (article_id, name,text) values (?,?,?)',[articleID,name,comment]);
    }
}