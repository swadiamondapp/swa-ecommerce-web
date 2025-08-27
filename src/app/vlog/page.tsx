// src/app/vlogs/page.tsx
import { NextResponse } from 'next/server';

export default async function VlogsPage() {
  const targetUrl = 'https://swavlog.zinfog.in/';
  const res = await fetch(targetUrl, { headers: { 'User-Agent': 'Mozilla/5.0' } });
  let html = await res.text();

  html = html.replace(/href="\//g, 'href="https://swavlog.zinfog.in/');
  html = html.replace(/src="\//g, 'src="https://swavlog.zinfog.in/');
  html = html.replace(/url\("\//g, 'url("https://swavlog.zinfog.in/');

  return (
    <div dangerouslySetInnerHTML={{ __html: html }} />
  );
}
