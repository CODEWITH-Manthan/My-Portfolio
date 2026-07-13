import { NextRequest, NextResponse } from 'next/server';

// Node.js runtime required for `next: { revalidate }` in fetch
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const revalidate = 0;

const GITHUB_USER = 'CODEWITH-Manthan';

const URLS: Record<string, string> = {
  stats: `https://github-readme-stats.vercel.app/api?username=${GITHUB_USER}&show_icons=true&theme=transparent&title_color=4F8CFF&icon_color=8B5CF6&text_color=ffffff60&border_color=ffffff10&count_private=true&bg_color=00000000`,
  streak: `https://streak-stats.demolab.com?user=${GITHUB_USER}&theme=transparent&background=00000000&border=ffffff10&stroke=ffffff10&ring=4F8CFF&fire=8B5CF6&currStreakLabel=ffffff60&sideLabels=ffffff30&dates=ffffff30`,
  langs: `https://github-readme-stats.vercel.app/api/top-langs/?username=${GITHUB_USER}&layout=compact&theme=transparent&title_color=4F8CFF&text_color=ffffff60&border_color=ffffff10&bg_color=00000000`,
  contrib: `https://github-readme-activity-graph.vercel.app/graph?username=${GITHUB_USER}&theme=github-compact&bg_color=00000000&color=4F8CFF&line=4F8CFF&point=8B5CF6&area=true&hide_border=true`,
};

export async function GET(req: NextRequest) {
  const type = req.nextUrl.searchParams.get('type') ?? 'stats';
  const url = URLS[type];
  if (!url) return new NextResponse('Invalid type', { status: 400 });

  try {
    const res = await fetch(url, {
      headers: { 'User-Agent': 'Mozilla/5.0' },
      cache: 'no-store', // Always fetch fresh data for real-time
    });

    if (!res.ok) throw new Error(`Upstream ${res.status}`);

    const body = await res.arrayBuffer();
    const contentType = res.headers.get('content-type') ?? 'image/svg+xml';

    return new NextResponse(body, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch {
    // Return a minimal SVG placeholder so the card doesn't look broken
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="120">
      <rect width="400" height="120" rx="8" fill="none"/>
      <text x="50%" y="55%" text-anchor="middle" fill="rgba(255,255,255,0.2)" font-size="13" font-family="sans-serif">Stats temporarily unavailable</text>
    </svg>`;
    return new NextResponse(svg, {
      status: 200,
      headers: { 'Content-Type': 'image/svg+xml', 'Cache-Control': 'no-store' },
    });
  }
}
