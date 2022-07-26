import next from 'next';
import { parse } from 'url';
import { createServer } from 'http';

const dev = process.env.NODE_ENV !== 'production';

const app = next({ dev });

// let server;
// app.prepare().then(() => {
//     server = createServer(async (req, res) => {
//         try {
//             const parseUrl = parse(req.url, true);
//             const { pathname, query } = parseUrl;
//             console.log(pathname)
//             if (pathname !== '/api') {
//                 console.log('Inside react')
//                 await app.render(req, res, '/', query);
//             }
//         } catch (error) {

//         }
//     }).listen(3000)

// })

export default async () => {
    await app.prepare();
    const server = createServer(async (req,res) => {
        try {
           const parseUrl = parse(req.url, true);
           const {pathname, query} = parseUrl;
           if (pathname !== '/api') {
            console.log('Inside react')
            await app.render(req, res, '/', query);
           }
        } catch (error) {
            console.log(error);
        }
    }).listen(3000);
    console.log(server);
    return {
        websocket: {
            httpServer: server,
            adapter: 'native',
            port: '3000'
        }
    }
}