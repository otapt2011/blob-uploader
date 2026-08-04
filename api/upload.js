import { BlobClient } from '@vercel/blob';

export async function POST(request) {
  const { searchParams } = new URL(request.url);
  const filename = searchParams.get("filename");
  const token = searchParams.get("token"); // We receive the token from the HTML

  if (!filename || !token) {
    return Response.json({ error: "Missing filename or token" }, { status: 400 });
  }

  try {
    // Create the SDK client using the token passed from frontend
    const client = new BlobClient({ token });
    const blob = await client.put(filename, request.body, { access: 'private' });

    // The SDK returns the exact JSON object the frontend expects
    return Response.json(blob);
  } catch (error) {
    return Response.json({ error: error.message || "Unknown upload error", stack: error.stack }, { status: 500 });
  }
}
