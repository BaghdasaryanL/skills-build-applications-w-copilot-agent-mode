const codespaceName = process.env.CODESPACE_NAME;
export const frontendOrigin = codespaceName
  ? `https://${codespaceName}-5173.app.github.dev`
  : 'http://localhost:5173';
