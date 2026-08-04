import { put } from '@vercel/blob';

// ✅ Hardcode your token here. No more dashboard errors!
const TOKEN = "vercel_blob_rw_2R41OxKmYZk4u3TO_AibX9MaGZWlw9A4PK47lzcxY24kAp6"; 

export async function POST(request) {
  const { searchParams } = new URL(request.url);
  const filename = searchParams.get("filename");

  if (!filename) {
    return Response.json({ error: "Missing filename" }, { status: 400 });
  }

  try {
    // We simply return the signed URL { url: ... }
    const blob = await put(filename, request.body, {
      access: 'public', // or 'private', doesn't matter here
      token: TOKEN, // ✅ Passes your hardcoded token directly
    });

    // ⚠️ CRITICAL: The Client SDK expects exactly { url: "..." }
    return Response.json({ url: blob.url });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
