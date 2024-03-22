import { createServer } from 'node:http';
import { readFile } from "fs";

const hostname = 'localhost';
const port = 8080;

let errorPage;
readFile('./404.html', (err, data) => {
    if (err) errorPage = `Error 404: Page could not be found.`;
    else errorPage = data
});

const server = createServer((req, res) => {
    let filePath = '';
   
    switch (req.url) {
        case '/':
            filePath = 'index.html';
            break;
        case '/about':
            filePath = 'about.html';
            break;
        case '/contact':
            filePath = 'contact.html';
            break;
        default:
            filePath = '404.html';
            res.statusCode = 404;
            break;
    }


    readFile(filePath, (err, data) => {
        res.setHeader('Content-Type', 'text/html');
        if (err) {            
            res.statusCode = 404;
            res.end(errorPage)
        }
        else res.end(data);
    });

})

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`)
})

