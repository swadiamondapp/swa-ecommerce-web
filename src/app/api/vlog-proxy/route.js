// app/api/vlog-proxy/route.js
import fetch from "node-fetch";

export async function GET(req) {
  const targetUrl = "https://swavlog.zinfog.in/";

  try {
    const response = await fetch(targetUrl);
    const html = await response.text();

    return new Response(html, {
      status: 200,
      headers: {
        "Content-Type": "text/html",
      },
    });
  } catch (error) {
    console.error(error);
    return new Response("Error fetching blog content", { status: 500 });
  }
}
