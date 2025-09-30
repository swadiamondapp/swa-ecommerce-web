import { NextResponse } from 'next/server';

export async function GET() {
  const targetUrl = 'https://swavlog.zinfog.in/';

  try {
    const response = await fetch(targetUrl, {
      headers: { 'User-Agent': 'Mozilla/5.0' },
    });
    let html = await response.text();

    // Rewrite relative URLs
    html = html.replace(/href="\//g, 'href="https://swavlog.zinfog.in/');
    html = html.replace(/src="\//g, 'src="https://swavlog.zinfog.in/');
    html = html.replace(/url\("\//g, 'url("https://swavlog.zinfog.in/');

    return new NextResponse(html, {
      headers: { 'Content-Type': 'text/html' },
    });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to fetch content' }, { status: 500 });
  }
}
