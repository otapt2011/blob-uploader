import { NextResponse } from "next/server";

// Your exact private store URL
const STORE_URL = "https://2r41oxkmyzk4u3to.private.blob.vercel-storage.com";
// Paste your new token here (starts with vercel_blob_rw_)
const TOKEN = "vercel_blob_rw_2R41OxKmYZk4u3TO_AibX9MaGZWlw9A4PK47lzcxY24kAp6"; 

export async function POST(request) {
  const { searchParams } = new URL(request.url);
  const filename = searchParams.get("filename");

  if (!filename) {
    return NextResponse.json({ error: "Missing filename" }, { status: 400 });
  }

  try {
    // Raw REST API request to Vercel Blob
    const response = await fetch(`${STORE_URL}/${filename}`, {
      method: 'PUT',
      headers: { 'Authorization': `Bearer ${TOKEN}` },
      body: request.body,
    });

    if (!response.ok) throw new Error(`Upload failed: ${response.statusText}`);

    // This is why I used .json() - the raw REST API returns the metadata as JSON
    const blobData = await response.json();
    return NextResponse.json(blobData);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
