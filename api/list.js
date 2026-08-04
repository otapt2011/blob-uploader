import { list } from '@vercel/blob';

// Use the exact same token you used in upload.js and view.js
const TOKEN = "vercel_blob_rw_Gk9GPvdVvphlILt6_6kTmdBNw8NuEjPvsJroF9cBitGsiIt"; 

export async function GET(request) {
  try {
    // Fetch the list of files (default limit is 50, you can add "limit: 100" if needed)
    const { blobs, cursor } = await list({
      token: TOKEN,
    });

    return Response.json({ blobs, cursor });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
