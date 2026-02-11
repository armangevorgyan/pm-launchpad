import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
    plugins: [
      react(),
      {
        name: 'api-chat-local',
        configureServer(server) {
          server.middlewares.use(async (req, res, next) => {
            if (req.url === '/api/chat' && req.method === 'POST') {
              let body = '';
              for await (const chunk of req) {
                body += chunk;
              }

              try {
                const { messages, model, temperature, systemPrompt } = JSON.parse(body);
                const apiKey = env.OPENAI_API_KEY;

                if (!apiKey) {
                  res.statusCode = 500;
                  res.setHeader('Content-Type', 'application/json');
                  res.end(JSON.stringify({ error: { message: 'OPENAI_API_KEY not found in .env' } }));
                  return;
                }

                const response = await fetch('https://api.openai.com/v1/chat/completions', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`
                  },
                  body: JSON.stringify({
                    model: model || 'gpt-4o',
                    messages: [
                      { role: 'system', content: systemPrompt },
                      ...messages
                    ],
                    temperature: temperature || 0.7,
                  })
                });

                const data = await response.json();
                res.statusCode = response.status;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify(data));
              } catch (err) {
                res.statusCode = 500;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ error: { message: err.message } }));
              }
              return;
            }
            next();
          });
        }
      }
    ],
    server: {
      open: true,
    },
  };
});