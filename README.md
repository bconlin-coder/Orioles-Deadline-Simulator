# You're the Orioles GM

A self-contained, mobile-responsive Orioles trade deadline decision game.

## Files

- `index.html`
- `style.css`
- `script.js`

## Publish with GitHub Pages

1. Download and unzip the project.
2. Create a new **public** GitHub repository.
3. Upload all three files to the repository root.
4. Commit the files.
5. Open **Settings → Pages**.
6. Under **Build and deployment**, select **Deploy from a branch**.
7. Choose the `main` branch and `/ (root)`.
8. Save.

Your site will appear at:

`https://YOUR-USERNAME.github.io/YOUR-REPOSITORY/`

## WordPress embed

Replace the URL below with the GitHub Pages URL:

```html
<iframe
  src="https://YOUR-USERNAME.github.io/YOUR-REPOSITORY/"
  title="Orioles trade deadline GM game"
  width="100%"
  height="2200"
  loading="lazy"
  style="border:0; width:100%;"
></iframe>
```

The results page is long, so an iframe height around 2000–2400 pixels is recommended.

## Editing the game

All trade copy, offers, consequences and scoring are in `script.js`.

Search for:

```js
const trades = [
```

The layout is in `index.html`, and all styling is in `style.css`.

## Editorial note

The game uses hypothetical trade packages and editorial outlook scores. It does not use official team logos, player photos or external assets.
