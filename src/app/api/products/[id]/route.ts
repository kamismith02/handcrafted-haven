import { sql } from '@vercel/postgres';

interface Review {
  reviewId: number;
  userId: string;
  userName: string;
  comment: string;
  rating: number;
  createdAt: string;
}

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = await params;
  console.log("id", id);

  try {
    const data = await sql`
    SELECT p.id, p.price, p.sale_info, p.seller_id, p.product_name, p.description, p.category, p.image,
           r.id AS review_id, r.user_id, u.full_name AS user_name, r.comments AS comment, r.rate AS rating, r.created_at
    FROM products p
    LEFT JOIN reviews r ON r.product_id = p.id
    LEFT JOIN users u ON u.id = r.user_id
    WHERE p.id = ${id}
  `;

    const product = data.rows[0];

    // Tipando o map com a interface Review
    const reviews: Review[] = data.rows.map((row) => ({
      reviewId: row.review_id,
      userId: row.user_id,
      userName: row.user_name,
      comment: row.comment,
      rating: row.rating,
      createdAt: row.created_at,
    }));

    return new Response(
      JSON.stringify({
        product: {
          id: product.id,
          price: product.price,
          sale_info: product.sale_info,
          seller_id: product.seller_id,
          product_name: product.product_name,
          description: product.description,
          category: product.category,
          image: product.image,
        },
        reviews,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return new Response('Error fetching product', { status: 500 });
  }
}
