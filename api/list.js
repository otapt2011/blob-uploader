import { list } from '@vercel/blob';

export async function GET(request) {
  try {
    // 👇 Read the token securely from the environment
    const { blobs, cursor } = await list({
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });

    return Response.json({ blobs, cursor });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
