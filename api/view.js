const STORE_URL = "https://2r41oxkmyzk4u3to.private.blob.vercel-storage.com";
// Replace this with the exact same token
const TOKEN = "vercel_blob_rw_2R41OxKmYZk4u3TO_AibX9MaGZWlw9A4PK47lzcxY24kAp6"; 

export async function GET(request) {
  const pathname = new URL(request.url).searchParams.get("pathname");

  if (!pathname) {
    return Response.json({ error: "Missing pathname" }, { status: 400 });
  }

  try {
    const response = await fetch(`${STORE_URL}/${pathname}`, {
      headers: { 'Authorization': `Bearer ${TOKEN}` },
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
