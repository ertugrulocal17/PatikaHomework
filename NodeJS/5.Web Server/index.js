const http = require('http')

const server = http.createServer((req, res) => {
    const url = req.url

    if (url === '/') {
        res.writeHead(200, {'Content-Type': 'text/html'})
        res.write('<h2>Anasayfaya Hos Geldiniz</h2>')
    } else if (url === '/hakkimizda') {
        res.writeHead(200, {'Content-Type': 'text/html'})
        res.write('<h2>Hakkimizda Sayfasina Hos Geldiniz</h2>')
    } else if (url === '/iletisim') {
        res.writeHead(200, {'Content-Type': 'text/html'})
        res.write('<h2>Iletisim Sayfasina Hos Geldiniz</h2>')
    } else {
        res.writeHead(404, {'Content-Type': 'text/html'})
        res.write('<h2>404 Hatasi Sayfa Bulunamadi</h2>')
    }

    res.end()
})

const port = 5500
server.listen(port, () => {
    console.log(`Server Started on port ${port}`)
})