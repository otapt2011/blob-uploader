import { NextResponse } from "next/server";

const STORE_URL = "https://2r41oxkmyzk4u3to.private.blob.vercel-storage.com";
const TOKEN = "vercel_blob_rw_2R41OxKmYZk4u3TO_AibX9MaGZWlw9A4PK47lzcxY24kAp6"; 

export async function GET(request) {
  const pathname = request.nextUrl.searchParams.get("pathname");
  if (!pathname) {
    return NextResponse.json({ error: "Missing pathname" }, { status: 400 });
  }

  try {
    const response = await fetch(`${STORE_URL}/${pathname}`, {
      headers: { 'Authorization': `Bearer ${TOKEN}` },
    });

    if (!response.ok) {
      return new NextResponse("Not found", { status: 404 });
    }

    const headers = new Headers();
    headers.set("Cache-Control", "private, no-cache");
    headers.set("Content-Type", response.headers.get("content-type") || "application/octet-stream");
    headers.set("X-Content-Type-Options", "nosniff");

    // Stream the file back to the browser securely
    return new NextResponse(response.body, { headers });
  } catch (error) {
    return new NextResponse("Error fetching file", { status: 500 });
  }
}
