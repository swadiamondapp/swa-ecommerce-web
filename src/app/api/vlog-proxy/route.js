// src/app/api/vlog-proxy/route.js
import { NextResponse } from 'next/server';

export async function GET(request) {
  const targetUrl = 'https://swavlog.zinfog.in/'; // WordPress site

  try {
    const response = await fetch(targetUrl, {
      headers: { 'User-Agent': 'Mozilla/5.0' },
    });

    const data = await response.text();
    return new NextResponse(data, {
      headers: { 'Content-Type': 'text/html' },
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch content' },
      { status: 500 }
    );
  }
}
