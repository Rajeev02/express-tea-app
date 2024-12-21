import { serve } from 'bun';
serve({
    fetch(request) {
        const url = new URL(request.url);
        if (url.pathname === '/') {
            return new Response('Hello World');
        } else if (url.pathname === '/api/courses') {
            return new Response(JSON.stringify([1, 2, 3]));
        } else if (url.pathname === '/api/posts') {
            return fetch(request);
        } else {
            return new Response('404 Not found', { status: 404 });
        }
    },
    port: 3000,
    hostname: '127.0.0.1'
})