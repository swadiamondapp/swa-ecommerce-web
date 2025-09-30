//src/app/api/vlog-proxy/route.js
import { NextResponse } from 'next/server';

export async function GET() {
  const targetUrl = 'https://swavlog.zinfog.in/';
  
  try { 
    let response = await fetch(targetUrl, {
      headers: { 'User-Agent': 'Mozilla/5.0' },
    });
    let html = await response.text();

    // Rewrite relative URLs to absolute
    html = html.replace(/href="\//g, 'href="https://swavlog.zinfog.in/');
    html = html.replace(/src="\//g, 'src="https://swavlog.zinfog.in/');

    return new NextResponse(html, {
      headers: { 'Content-Type': 'text/html' },
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch content' }, { status: 500 });
  }
}
