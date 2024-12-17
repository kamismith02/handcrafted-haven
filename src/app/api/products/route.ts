import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

export async function GET() {
  try {
    // Consulta SQL para buscar os produtos
    const result = await sql`
      SELECT 
        id, 
        price, 
        sale_info, 
        seller_id, 
        product_name, 
        description, 
        category, 
        image 
      FROM products
    `;

    const products = result.rows; // Obter os dados retornados

    console.log('Fetched products:', products);

    // Retornar os produtos como JSON
    return NextResponse.json({ products });
  } catch (error) {
    console.error('Failed to fetch products:', error);

    // Retornar erro em caso de falha
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}
