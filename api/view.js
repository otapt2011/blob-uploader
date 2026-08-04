import { get } from '@vercel/blob';

const TOKEN = "vercel_blob_rw_Gk9GPvdVvphlILt6_6kTmdBNw8NuEjPvsJroF9cBitGsiIt"; 

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const pathname = searchParams.get("pathname");

  if (!pathname) {
    return Response.json({ error: "Missing pathname" }, { status: 400 });
  }

  try {
    const result = await get(pathname, {
      access: 'public', // ✅ Matches upload.js
      token: TOKEN,
    });

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
