import { NextResponse } from 'next/server';

// Use Node.js runtime so fetch caching with `next: { revalidate }` works
export const runtime = 'nodejs';
export const revalidate = 3600;

const LEETCODE_USER = 'Manthan_Ilake';

const QUERY = `
  query getUserProfile($username: String!) {
    matchedUser(username: $username) {
      submitStatsGlobal {
        acSubmissionNum {
          difficulty
          count
        }
      }
    }
  }
`;

// Fallback static data in case LeetCode blocks the request
const FALLBACK = { total: 118, easy: 57, medium: 58, hard: 3 };

export async function GET() {
  try {
    const res = await fetch('https://leetcode.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Referer': 'https://leetcode.com',
        'Origin': 'https://leetcode.com',
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      },
      body: JSON.stringify({ query: QUERY, variables: { username: LEETCODE_USER } }),
      next: { revalidate: 3600 },
    });

    if (!res.ok) throw new Error(`LeetCode responded with ${res.status}`);

    const json = await res.json();
    const submissions: Array<{ difficulty: string; count: number }> =
      json?.data?.matchedUser?.submitStatsGlobal?.acSubmissionNum ?? [];

    if (submissions.length === 0) throw new Error('No data returned');

    const get = (d: string) => submissions.find(s => s.difficulty === d)?.count ?? 0;

    const data = {
      total: get('All'),
      easy: get('Easy'),
      medium: get('Medium'),
      hard: get('Hard'),
    };

    return NextResponse.json(data, {
      headers: { 'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400' },
    });
  } catch {
    // Return fallback static data so the UI always shows something
    return NextResponse.json(FALLBACK, {
      headers: { 'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=3600' },
    });
  }
}
