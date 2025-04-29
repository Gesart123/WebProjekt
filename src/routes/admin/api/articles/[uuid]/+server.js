import { createConnection } from '$lib/db/mysql';
import { BASIC_AUTH_USER, BASIC_AUTH_PASSWORD } from '$env/static/private';

async function auth(request) {
    const auth = request.headers.get('authorization');
    if (!auth || auth !== `Basic ${btoa(`${BASIC_AUTH_USER}:${BASIC_AUTH_PASSWORD}`)}`) {
        return new Response(null, {
            status: 401,
            headers: { 'www-authenticate': 'Basic realm="Secure Area"' }
        });
    }
    const base64Credentials = auth.split(' ')[1];
    const credentials = atob(base64Credentials);
    const [username, password] = credentials.split(':');
    if (username !== BASIC_AUTH_USER || password !== BASIC_AUTH_PASSWORD) {
        return new Response(JSON.stringify({ message: 'Access denied' }), {
            status: 401,
            headers: { 'www-authenticate': 'Basic realm="Secure Area"' }
        });
    }
    return null;
}

export async function GET({ params }) {
    const { uuid } = params;
    const connection = await createConnection();

    const [rows] = await connection.execute('SELECT * FROM articles WHERE id = ?;', [uuid]);
    const article = rows[0];

    return new Response(JSON.stringify(article), {
        status: 200,
        headers: { 'content-type': 'application/json' }
    });
}

export async function PUT({ params, request }) {
    const authResponse = await auth(request);
    if (authResponse) return authResponse;

    const { uuid } = params;
    const data = await request.json();
    const connection = await createConnection();

    try {
        const [rows] = await connection.execute('SELECT * FROM articles WHERE id = ?;', [uuid]);
        if (rows.length === 0) {
            return new Response(JSON.stringify({ error: 'Article not found' }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' }
            });
        }
        await connection.execute(
            'UPDATE articles SET image = ?, description = ?, author = ?, votes = ? WHERE id = ?;',
            [data.image, data.description, data.author, data.votes ?? 0, uuid]
        );
        const [updatedRows] = await connection.execute('SELECT * FROM articles WHERE id = ?;', [uuid]);
        return new Response(JSON.stringify(updatedRows[0]), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}

export async function DELETE({ params, request }) {
    const authResponse = await auth(request);
    if (authResponse) return authResponse;

    const { uuid } = params;
    const connection = await createConnection();

    try {
        const [result] = await connection.execute('DELETE FROM articles WHERE id = ?;', [uuid]);
        if (result.affectedRows === 0) {
            return new Response(JSON.stringify({ error: 'Article not found' }), { status: 404 });
        }
        return new Response(null, { status: 204 });
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}