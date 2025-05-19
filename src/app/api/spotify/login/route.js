import { NextResponse } from 'next/server';

export function GET() {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const redirectUri = process.env.SPOTIFY_REDIRECT_URI;
  const scope = 'user-read-currently-playing user-read-playback-state';

  const authUrl = `https://accounts.spotify.com/authorize?` +
    `response_type=code&client_id=${clientId}` +
    `&scope=${encodeURIComponent(scope)}` +
    `&redirect_uri=${encodeURIComponent(redirectUri)}`;

  return NextResponse.redirect(authUrl);
}