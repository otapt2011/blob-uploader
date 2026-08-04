import { get } from '@vercel/blob';

// Use the exact same token you have in upload.js!
const TOKEN = "vercel_blob_rw_Gk9GPvdVvphlILt6_6kTmdBNw8NuEjPvsJroF9cBitGsiIt"; 

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const pathname = searchParams.get("pathname");

  if (!pathname) {
    return Response.json({ error: "Missing pathname" }, { status: 400 });
  }

  try {
    // We will use access: 'public' to perfectly match your upload.js
    const result = await get(pathname, {
      access: 'public',
      token: TOKEN,
    });

    if (!result) {
      return new Response("File not found", { status: 404 });
    }

    return new Response(result.stream, {
      headers: {
        "Cache-Control": "public, max-age=31536000, immutable",
        "Content-Type": result.blob.contentType,
      },
    });
  } catch (error) {
    // This catch block prevents the 500 crash! It returns a clean error message instead.
    return new Response("Error fetching file: " + error.message, { status: 500 });
  }
}
