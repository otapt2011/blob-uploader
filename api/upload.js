const STORE_URL = "https://2r41oxkmyzk4u3to.private.blob.vercel-storage.com";

export async function POST(request) {
  const { searchParams } = new URL(request.url);
  const filename = searchParams.get("filename");
  const token = searchParams.get("token"); // Read token from frontend query

  if (!filename || !token) {
    return Response.json({ error: "Missing filename or token" }, { status: 400 });
  }

  try {
    const response = await fetch(`${STORE_URL}/${filename}`, {
      method: 'PUT',
      headers: { 'Authorization': `Bearer ${token}` },
      body: request.body,
      duplex: 'half',
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
