export async function onRequest({ request, env, next }) {
  const user = env.BASIC_USER || "demo";
  const pass = env.BASIC_PASS; // défini en Secret dans Pages
  if (!pass) return next();    // si pas de mot de passe défini, on laisse passer

  // Laisser passer l'API (si tu veux)
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
