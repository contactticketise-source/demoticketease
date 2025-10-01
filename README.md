# TicketEase UI (Cloudflare Pages)
Static UI ready to deploy on Cloudflare Pages.

## Structure
- `index.html` — your UI
- `_headers` — optional security headers for Pages

## Quick deploy
1) Create a new GitHub repo and push this folder.
2) In Cloudflare Dashboard → Workers & Pages → Create application → Pages → Connect to Git → select the repo.
3) Build command: (empty). Output directory: `/`.
4) (Optional) Add a Pages Functions proxy `/api/*` to your Worker later.
