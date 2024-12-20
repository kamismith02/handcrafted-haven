import { sql } from '@vercel/postgres';
import { getSession } from 'next-auth/react';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const session = await getSession({ req: request as any });

  if (!session || !session.user || !session.user.id) {
    return new NextResponse('User is not authenticated', { status: 401 });
  }

  const { comment, rating, productId } = await request.json();

  const userId = session.user.id;

  try {
    await sql`
      INSERT INTO reviews (user_id, product_id, comments, rate)
      VALUES (${userId}, ${productId}, ${comment}, ${rating})
    `;
    
    return new NextResponse('Review submitted successfully', { status: 200 });
  } catch (error) {
    console.error('Error submitting review:', error);
    return new NextResponse('Error submitting review', { status: 500 });
  }
}
