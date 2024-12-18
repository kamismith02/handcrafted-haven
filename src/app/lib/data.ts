import { sql } from '@vercel/postgres';
import { User } from '../ui/profile/InitializeUser';
import { revalidatePath } from 'next/cache';
import { Seller } from '../profile/[id]/actions';
import { Product } from '../ui/products/tempProductInfo';


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

export async function getUser(id: string){


const response = await sql<User>`SELECT * FROM users WHERE id = ${id}`;
const user : User = {
 id: response.rows[0].id,
 full_name: response.rows[0].full_name, 
 address: response.rows[0].address,
 phone_number : response.rows[0].phone_number,
 status: response.rows[0].status,
 email: response.rows[0].email,
 avatar: response.rows[0].avatar
}
return user
}

export async function getUserStatus(id:string){

  const status = await sql.query(`SELECT status FROM users WHERE id = $1`, [id])
  return status
}

export async function updateUser(id:string, full_name:string, address:string, phone_number:string, avatar:string){
  const query = await sql.query(`UPDATE users 
   SET full_name = $1, address = $2, phone_number = $3, avatar = $4 
   WHERE id = $5`,
  [full_name, address, phone_number, avatar, id])

  return query
}

export async function getSeller(id: string) {
  const query = `SELECT * FROM sellers WHERE user_id = '${id}'`
  const response = await sql.query(query)
  
  if (response.rows[0] == undefined || null){
    return null;
  } // Add in validation here!
  const seller : Seller = {
  
      id: response.rows[0].id,
      shop_name: response.rows[0].shop_name,
      avatar: response.rows[0].avatar,
  }
  return seller;
}

export async function getFavorites(id: string) : Promise<FavoriteItem[]>{

  try{
    const query = 
    await sql.query(`SELECT 
     f.user_id AS id,
     p.seller_id AS seller_id,
     p.id AS product_id,
     p.product_name AS product_name,
     p.description AS description,
     p.price AS price,
     p.category AS category,
     p.image AS product_image
    FROM favorites f INNER JOIN products p ON f.product_id = p.id 
	  WHERE user_id = $1`,[id]);
  const favorites = query.rows.map((row ) =>({
    id: row.id,
    seller_id : row.seller_id,
    product_id : row.product_id,
    product_name : row.product_name,
    description : row.description,
    price : row.price,
    category : row.category,
    image : row.product_image
  }));
  return favorites;
}catch (error){
  return [];
} }


export async function removeFromFavorites(userId: string, productId: string) {
  try {
    const query = await sql.query(`DELETE FROM favorites WHERE user_id = '${userId}' AND product_id = '${[productId]}'`)
    revalidatePath(`/profile/${userId}`)
  }
    catch (error){
      throw error;
    }
}


// Product Functions
export async function getProductList(id: string) : Promise<Product[]>{
  try {const result = await sql.query("SELECT * FROM products WHERE seller_id = $1", [id]);
  if (!result.rows){
    return []};
  const products = result.rows.map((row) => ({
    id: row.id,
    price: row.price,
    sale_info: row.sale_info,
    seller_id: row.seller_id,
    product_name: row.product_name,
    description: row.description,
    category: row.category,
    image: row.image,
  }));
  return products;} 
  catch{
    return [];
  }
}

export async function getProductInfo(item: any){
  const response = await sql.query(`GET * FROM sellers WHEN id = ${item}`)
  const product : Product = {
    id: response.rows[0].id,
    price: response.rows[0].price,
    sale_info: response.rows[0].sale_info,
    seller_id: response.rows[0].seller_id,
    product_name: response.rows[0],
    description: response.rows[0],
    category: response.rows[0],
    image: response.rows[0]
    };
  return product }

export async function deleteProduct(id: string){
    try{const response= await sql.query(`DELETE FROM products WHERE id = $1`, [id])

    }
    catch(error){
      console.error('Error deleting product' + error)

  }
  }
  
export async function deleteProductFromAllFavorites(id: string){
    const query = `DELETE FROM favorites WHERE product_id = ${id} RETURNING product_id`;
    try {
      const response = await sql.query(query);
    } 
    catch(error){
      console.error('Error deleting product' + error)
    }
  }