import { NextResponse } from 'next/server';

export async function GET(req) {
  const id = req.nextUrl.pathname.split('/').pop();

  // Safety fallback
  if (!id || id.length < 10) {
    return NextResponse.json({ error: 'Invalid album ID' }, { status: 400 });
  }

  const tokenRes = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/api/spotify/token`);
  const { access_token } = await tokenRes.json();

  if (!access_token) {
    return NextResponse.json({ error: 'Missing access token' }, { status: 500 });
  }

  const res = await fetch(`https://api.spotify.com/v1/albums/${id}`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });

  if (!res.ok) {
    const errorText = await res.text();
    return NextResponse.json({ error: 'Spotify fetch failed', details: errorText }, { status: res.status });
  }

  const album = await res.json();

  return NextResponse.json({
    title: album.name,
    artists: album.artists.map((a) => a.name).join(', '),
    image: album.images[0]?.url,
    url: album.external_urls.spotify,
  });
}