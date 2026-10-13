import app from './app.js';
import { connectDatabase } from './config/database.js';

const port = Number(process.env.PORT ?? 8000);
const codespaceName = process.env.CODESPACE_NAME;
const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

if (!Number.isInteger(port) || port < 1 || port > 65535) {
  throw new Error(`Invalid PORT value: ${process.env.PORT}`);
}

async function startServer() {
  await connectDatabase();
  app.listen(port, '0.0.0.0', () => {
    console.info(`Octofit API listening at ${apiBaseUrl}`);
  });
}

startServer().catch((error: unknown) => {
  console.error('Failed to start Octofit API:', error);
  process.exitCode = 1;
});
