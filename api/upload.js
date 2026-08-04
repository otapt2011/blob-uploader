import { put } from '@vercel/blob';

const TOKEN = "vercel_blob_rw_Gk9GPvdVvphlILt6_6kTmdBNw8NuEjPvsJroF9cBitGsiIt"; 

export async function POST(request) {
  const { searchParams } = new URL(request.url);
  const filename = searchParams.get("filename");

  if (!filename) {
    return Response.json({ error: "Missing filename" }, { status: 400 });
  }

  try {
    const blob = await put(filename, request.body, {
      access: 'public', // ✅ Changed to private
      token: TOKEN,
    });
    // Return pathname, not url, because private URLs aren't public.
    return Response.json({ pathname: blob.pathname });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
