import next from 'next';
import { parse } from 'url';
import { createServer } from 'http';

const dev = process.env.NODE_ENV !== 'production';

const app = next({ dev });
let server;

app.prepare().then(() => {
    console.log('NEXT JS started ')
    server = createServer(async (req, res) => {
        try {
            const parseUrl = parse(req.url, true);
            const { pathname, query } = parseUrl;
            if (pathname !== '/api') {
                await app.render(req, res, '/', query);
            }
        } catch (error) {

        }
    }).listen(3000)
})
