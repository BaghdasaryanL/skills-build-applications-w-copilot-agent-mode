# Octofit Tracker Frontend

React 19 + Vite presentation tier using `react-router-dom` and Bootstrap.

## Configuration

`VITE_CODESPACE_NAME` **must be defined** when running in GitHub Codespaces so the app can reach the API at `https://$VITE_CODESPACE_NAME-8000.app.github.dev`. Define it in `.env.local` (git-ignored):

```bash
VITE_CODESPACE_NAME=your-codespace-name
```

In a Codespace, the name is available as `$CODESPACE_NAME`:

```bash
echo "VITE_CODESPACE_NAME=$CODESPACE_NAME" > octofit-tracker/frontend/.env.local
```

If `VITE_CODESPACE_NAME` is unset, the app falls back to `http://localhost:8000`. Restart the dev server after changing environment files.

## Commands

```bash
npm run dev --prefix octofit-tracker/frontend
npm run build --prefix octofit-tracker/frontend
npm run lint --prefix octofit-tracker/frontend
```

## Views

Routes `/activities`, `/leaderboard`, `/teams`, `/users`, and `/workouts` read from the matching `/api/<resource>/` endpoint. Both plain array and paginated (`{ results: [...] }`) responses are supported.
