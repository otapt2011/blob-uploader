import { get } from '@vercel/blob';

const TOKEN = "vercel_blob_rw_Gk9GPvdVvphlILt6_XVlPuoRJdeLPvS73Roqhx3c5KCIfye"; 

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const pathname = searchParams.get("pathname");

  if (!pathname) {
    return Response.json({ error: "Missing pathname" }, { status: 400 });
  }

  try {
    // ✅ FIXED: Removed 'access: "public"' because get() does not accept it.
    const result = await get(pathname, {
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
    return new Response("Error fetching file: " + error.message, { status: 500 });
  }
}
