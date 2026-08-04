const STORE_URL = "https://2r41oxkmyzk4u3to.private.blob.vercel-storage.com";
// Replace this with your actual new token
const TOKEN = "vercel_blob_rw_2R41OxKmYZk4u3TO_AibX9MaGZWlw9A4PK47lzcxY24kAp6"; 

export async function POST(request) {
  const { searchParams } = new URL(request.url);
  const filename = searchParams.get("filename");

  if (!filename) {
    return Response.json({ error: "Missing filename" }, { status: 400 });
  }

  try {
    const response = await fetch(`${STORE_URL}/${filename}`, {
      method: 'PUT',
      headers: { 'Authorization': `Bearer ${TOKEN}` },
      body: request.body,
    });

    if (!response.ok) {
      throw new Error(`Upload failed: ${response.statusText}`);
    }

    const blobData = await response.json();
    return Response.json(blobData);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
