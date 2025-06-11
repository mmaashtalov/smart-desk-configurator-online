import express from 'express'
import { renderPage } from 'vike/server'
// import { telefunc } from 'telefunc/server'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const isProduction = process.env.NODE_ENV === 'production'
const __dirname = dirname(fileURLToPath(import.meta.url))
const root = `${__dirname}/..`

startServer()

async function startServer() {
  const app = express()

  if (isProduction) {
    app.use(express.static(`${root}/dist/client`))
  } else {
    const vite = await import('vite')
    const viteDevMiddleware = (
      await vite.createServer({
        root,
        server: { middlewareMode: true }
      })
    ).middlewares
    app.use(viteDevMiddleware)
  }

  /*
  app.post('/_telefunc', (req, res) => {
    // @ts-ignore
    telefunc(req, res)
  })
  */

  app.get('(.*)', async (req, res, next) => {
    const pageContextInit = {
      urlOriginal: req.originalUrl,
      // Some dummy data
      user: {
        id: '123',
        name: 'John Doe'
      }
    }
    const pageContext = await renderPage(pageContextInit)
    const { httpResponse } = pageContext
    if (!httpResponse) return next()

    const { body, statusCode, headers, earlyHints } = httpResponse
    // @ts-ignore
    if (res.writeEarlyHints) res.writeEarlyHints({ link: earlyHints.map((e) => e.link) })

    headers.forEach(([name, value]) => res.setHeader(name, value))
    res.status(statusCode)
    res.send(body)
  })

  const port = process.env.PORT || 3000
  app.listen(port)
  console.log(`✅ Server running at http://localhost:${port}`)
}
