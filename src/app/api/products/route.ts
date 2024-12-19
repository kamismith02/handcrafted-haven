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

export async function POST(req: Request) {
  try {
    const { price, product_name, description, category, image, seller_id } = await req.json();

    const result = await sql`
      INSERT INTO products (price, product_name, description, category, image, seller_id)
      VALUES (${price}, ${product_name}, ${description}, ${category}, ${image}, ${seller_id})
      RETURNING id, product_name, price, description, category, image, seller_id
    `;

    const product = result.rows[0];

    return NextResponse.json({ product });
  } catch (error) {
    console.error('Failed to create product:', error);

    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    );
  }
}
