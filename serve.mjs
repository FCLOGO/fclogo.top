import { createReadStream } from 'node:fs'
import { stat } from 'node:fs/promises'
import { createServer } from 'node:http'
import { extname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const projectRoot = fileURLToPath(new URL('./', import.meta.url))
const serveRoot = resolve(projectRoot, process.argv[2] ?? '.')
const port = Number(process.env.PORT ?? 8000)

const contentTypes = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml'
}

const publicFiles = new Set([
  'index.html',
  'styles.css',
  'assets/fclogo.svg',
  'assets/logo-share.png'
])

const server = createServer(async (request, response) => {
  const pathname = decodeURIComponent(new URL(request.url ?? '/', 'http://localhost').pathname)
  const requestedFile = pathname === '/' ? 'index.html' : pathname.slice(1)

  if (!publicFiles.has(requestedFile)) {
    response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' })
    response.end('Not found')
    return
  }

  const filePath = resolve(serveRoot, requestedFile)

  try {
    const file = await stat(filePath)
    if (!file.isFile()) throw new Error('Not a file')

    response.writeHead(200, {
      'Cache-Control': 'no-store',
      'Content-Type': contentTypes[extname(filePath)] ?? 'application/octet-stream'
    })
    createReadStream(filePath).pipe(response)
  } catch {
    response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' })
    response.end('Not found')
  }
})

server.listen(port, '127.0.0.1', () => {
  console.log(`Local site: http://127.0.0.1:${port}`)
  console.log(`Serving: ${serveRoot}`)
})
