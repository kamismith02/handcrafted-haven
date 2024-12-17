import { sql } from '@vercel/postgres';
import { formatCurrency } from './utils';
import { User } from '../ui/profile/InitializeUser';
import { revalidatePath } from 'next/cache';

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


// const { Pool} = require('pg')
// const pool = new Pool({
//   connectionString: process.env.POSTRES_URL,
//   ssl: true,
//       extra: {
//           ssl: {
//               rejectUnauthorized: false,
//           },
// }
// });

export type FavoriteItem = {
  id: string;
  seller_id: string;
  product_id: string;
  product_name: string;
  description: string;
  price: number;
  category: string;
  image: string;
};

// User Functions
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

export async function removeFromFavorites(userId: string, productId: string) {
  try {
    const query = await sql.query(`DELETE FROM favorites WHERE user_id = '${userId}' AND product_id = '${[productId]}'`)
    console.log(query.rowCount) 
    revalidatePath(`/profile/${userId}`)
  }
    catch (error){
      throw error;
    }
  
}

export async function getUser(id: string){

const query = `SELECT * FROM users WHERE id = '${id}'`
const response = await sql.query(query);
console.log(response.rows[0].address);
const user : User = {
 id: response.rows[0].id,
 fullName: response.rows[0].full_name, 
 address: response.rows[0].address,
 phoneNumber : response.rows[0].phone_number,
 status: response.rows[0].status,
 isAuth: true,
 email: response.rows[0].email,
 avatar: response.rows[0].avatar
}
console.log(response.rows[0]);
return user
}

export async function getUserStatus(id:string){

  const status = await sql.query(`SELECT status FROM users WHERE id = $1`, [id])
  return status
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

export async function updateUser(id:string, fullName:string, address:string, phoneNumber:string){
  return await sql.query(`UPDATE users SET fullname = $1, address = $2, phone_number = $3 WHERE id = $4`, [fullName, address, phoneNumber, id])
}

export async function getFavorites(id: string) : Promise<FavoriteItem[]>{

  try{
    const command = 
    `SELECT 
     f.user_id AS id,
     p.seller_id AS seller_id,
     p.id AS product_id,
     p.product_name AS product_name,
     p.description AS description,
     p.price AS price,
     p.category AS category,
     p.image AS image
    FROM favorites f INNER JOIN products p ON f.product_id = p.id 
	  WHERE user_id = '${id}'`;
    const query = await sql.query(command);
  const favorites = query.rows.map((row ) =>({
    id: row.id,
    seller_id : row.seller_id,
    product_id : row.product_id,
    product_name : row.product_name,
    description : row.description,
    price : row.price,
    category : row.category,
    image : row.image
  }));
  if (favorites.length > 0){
    return favorites
  } else {
    throw Error("no favorites");
  }
}
   
  catch (error){
    throw error;
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

export async function getTableNames(){
  return await sql.query(
   "SELECT table_name FROM information_schema.tables WHERE table_schema='public' AND table_type='BASE TABLE';")

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
