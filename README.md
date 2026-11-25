# Enternet 2026

React + Vite project with Docker support.

## Local development with Docker

Docker Desktop must be running. Start the development server:

```bash
docker compose up --build app
```

Open [http://localhost:5173](http://localhost:5173). Changes in `src/` and `public/` reload automatically. Stop it with `Ctrl+C`, or run `docker compose down` from another terminal.

## Production preview

Build and serve the production version locally:

```bash
docker compose --profile production up --build production
```

Open [http://localhost:8080](http://localhost:8080).

## GitHub workflow

Git tracks your code locally. GitHub receives it only after you explicitly push.

```bash
# First time only, after creating an empty GitHub repository named enternet
git init
git add .
git commit -m "Initial project setup"
git branch -M main
git remote add origin https://github.com/dizainas-source/enternet.git
git push -u origin main
```

For later work:

```bash
git status
git add .
git commit -m "Describe the change"
git push
```

Never commit passwords, API keys, or `.env` files. The `.gitignore` file excludes them, as well as `node_modules` and `dist`.
