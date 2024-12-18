import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

export async function GET() {
  try {
    const result = await sql`
      SELECT 
        id, 
        price, 
        seller_id, 
        product_name, 
        description, 
        category, 
        image 
      FROM products
    `;

    const products = result.rows;

    console.log('Fetched products:', products);

    return NextResponse.json({ products });
  } catch (error) {
    console.error('Failed to fetch products:', error);

    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}
