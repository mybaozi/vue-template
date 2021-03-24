const http = require('http');

const hostname = '192.168.7.123'
const port = 9900

const server = http.createServer((req,res)=>{
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'text/plain')
    let data = {
        code: 200,
        list: [
            { label: 'a', value: 0 },
            { label: 'b', value: 1 },
        ],
    }
    res.end(JSON.stringify(data))
})

server.listen(port,hostname,()=>{
    console.log(`服务器运行在 http://${hostname}:${port}`)
})

