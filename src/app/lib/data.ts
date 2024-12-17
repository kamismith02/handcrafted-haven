import { sql } from '@vercel/postgres';
import { formatCurrency } from './utils';

const ITEMS_PER_PAGE = 6;

export async function fetchSellers() {
  try {
    const data = await sql`SELECT id, shop_name, user_id FROM sellers`;
    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch sellers.');
  }
}

export async function fetchUsers() {
  try {
    const data = await sql`SELECT id, full_name, address, phone_number, status, avatar, email FROM users`;
    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch users.');
  }
}

export async function fetchFavorites(userId: string) {
  try {
    const data = await sql`SELECT product_id FROM favorites WHERE user_id = ${userId}`;
    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch favorites.');
  }
}

export async function fetchOrderItems(orderId: string) {
  try {
    const data = await sql`
      SELECT id, product_id, quantity, price
      FROM order_items
      WHERE order_id = ${orderId}`;
    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch order items.');
  }
}

export async function fetchOrders() {
  try {
    const data = await sql`
      SELECT orders.id, orders.total_price, orders.address, users.full_name, users.email
      FROM orders
      JOIN users ON orders.user_id = users.id`;
    return data.rows.map((order) => ({
      ...order,
      total_price: formatCurrency(order.total_price),
    }));
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch orders.');
  }
}

export async function fetchFilteredProducts(query: string, currentPage: number) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  try {
    const products = await sql`
      SELECT id, price, sale_info, seller_id, product_name, description, category, image
      FROM products
      WHERE
        product_name ILIKE ${`%${query}%`} OR
        description ILIKE ${`%${query}%`} OR
        category ILIKE ${`%${query}%`}
      ORDER BY product_name ASC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}`;
    return products.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch products.');
  }
}

export async function fetchProductPages(query: string) {
  try {
    const count = await sql`
      SELECT COUNT(*)
      FROM products
      WHERE
        product_name ILIKE ${`%${query}%`} OR
        description ILIKE ${`%${query}%`} OR
        category ILIKE ${`%${query}%`}`;
    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch product pages.');
  }
}

// Fetch product by ID
export async function fetchProductById(id: string) {
  console.log("fetching product")
  try {
    const data = await sql`
      SELECT id, price, sale_info, seller_id, product_name, description, category, image
      FROM products
      WHERE id = ${id}`;
      console.log("product found")
    return data.rows[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch product.');
  }
}

export async function fetchCustomersWithOrders() {
  try {
    const data = await sql`
      SELECT users.id, users.full_name, users.email, COUNT(orders.id) AS total_orders
      FROM users
      LEFT JOIN orders ON users.id = orders.user_id
      GROUP BY users.id, users.full_name, users.email
      ORDER BY users.full_name ASC`;
    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch customers with orders.');
  }
}
