const codespaceName = process.env.CODESPACE_NAME;

export const frontendOrigins = [
  'http://localhost:5173',
  ...(codespaceName ? [`https://${codespaceName}-5173.app.github.dev`] : []),
];
