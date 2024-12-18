import { sql } from '@vercel/postgres';

export async function POST(req: Request) {
  const { comment, rating, userId } = await req.json();

  try {
    await sql`
      INSERT INTO reviews (user_id, product_id, comments, rate)
      VALUES (${userId}, 1, ${comment}, ${rating})`;

    return new Response('Review submitted', { status: 200 });
  } catch (error) {
    console.error('Error submitting review:', error);
    return new Response('Failed to submit review', { status: 500 });
  }
}
