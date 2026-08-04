import { BlobClient } from '@vercel/blob';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const pathname = searchParams.get("pathname");
  const token = searchParams.get("token"); // We receive the token from the HTML

  if (!pathname || !token) {
    return Response.json({ error: "Missing pathname or token" }, { status: 400 });
  }

  try {
    const client = new BlobClient({ token });
    const result = await client.get(pathname);

    if (!result) {
      return new Response("Not found", { status: 404 });
    }

    const headers = new Headers();
    headers.set("Cache-Control", "private, no-cache");
    headers.set("Content-Type", result.blob.contentType);
    headers.set("X-Content-Type-Options", "nosniff");

    return new Response(result.stream, { headers });
  } catch (error) {
    return new Response("Error fetching file", { status: 500 });
  }
}
