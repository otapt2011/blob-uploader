const STORE_URL = "https://2r41oxkmyzk4u3to.vercel.app";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const pathname = searchParams.get("pathname");
  const token = searchParams.get("token"); // Read token from frontend query

  if (!pathname || !token) {
    return Response.json({ error: "Missing pathname or token" }, { status: 400 });
  }

  try {
    const response = await fetch(`${STORE_URL}/${pathname}`, {
      headers: { 'Authorization': `Bearer ${token}` },
    });

    if (!response.ok) {
      return new Response("Not found", { status: 404 });
    }

    const headers = new Headers();
    headers.set("Cache-Control", "private, no-cache");
    headers.set("Content-Type", response.headers.get("content-type") || "application/octet-stream");
    headers.set("X-Content-Type-Options", "nosniff");

    return new Response(response.body, { headers });
  } catch (error) {
    return new Response("Error fetching file", { status: 500 });
  }
}
