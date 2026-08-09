import { defineConfig, loadEnv, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import { verifyPassword, isPasswordConfigured } from './lib/verify-password.js'

function devAuthApiPlugin(env: Record<string, string>): Plugin {
  return {
    name: 'dev-auth-api',
    configureServer(server) {
      server.middlewares.use('/api/verify-password', (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ error: 'Method not allowed' }))
          return
        }

        let body = ''
        req.on('data', (chunk) => {
          body += chunk
        })
        req.on('end', () => {
          res.setHeader('Content-Type', 'application/json')

          process.env.DEMO_PASSWORD = env.DEMO_PASSWORD

          if (!isPasswordConfigured()) {
            res.statusCode = 500
            res.end(JSON.stringify({ error: 'Server configuration error' }))
            return
          }

          try {
            const { password } = JSON.parse(body) as { password?: string }

            if (!password || typeof password !== 'string') {
              res.statusCode = 400
              res.end(JSON.stringify({ error: 'Password required' }))
              return
            }

            if (verifyPassword(password)) {
              res.statusCode = 200
              res.end(JSON.stringify({ ok: true }))
              return
            }

            res.statusCode = 401
            res.end(JSON.stringify({ error: 'Invalid password' }))
          } catch {
            res.statusCode = 400
            res.end(JSON.stringify({ error: 'Invalid request' }))
          }
        })
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [react(), devAuthApiPlugin(env)],
  }
})
