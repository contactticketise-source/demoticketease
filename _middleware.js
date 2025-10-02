// functions/_middleware.js
export async function onRequest({ request, env, next }) {
  // Utilisateur par défaut "demo", mot de passe dans BASIC_PASS
  const user = env.BASIC_USER || "demo";
  const pass = env.BASIC_PASS;          // <- à définir dans Cloudflare Pages (Secret)
  if (!pass) return next();             // si pas défini, pas de protection

  // Exception: laisser passer les appels API sans authentification
  const { pathname } = new URL(request.url);
  if (pathname.startsWith("/api/")) return next();

  const auth = request.headers.get("Authorization") || "";
  if (!auth.startsWith("Basic ")) {
    return new Response("Unauthorized", {
      status: 401,
      headers: { "WWW-Authenticate": 'Basic realm="TicketEase"' },
    });
  }

  const [u, p] = atob(auth.slice(6)).split(":");
  if (u === user && p === pass) return next();

  return new Response("Forbidden", {
    status: 403,
    headers: { "WWW-Authenticate": 'Basic realm="TicketEase"' },
  });
}
