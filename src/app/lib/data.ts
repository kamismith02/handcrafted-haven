'use server'
import { sql } from '@vercel/postgres';
import { MongoClient, ObjectId } from 'mongodb';
import { User } from '../ui/profile/InitializeUser';
import { revalidatePath } from 'next/cache';

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

let cachedClient: any;
export async function connectToDatabase() {   // MongoDB Connection
  if (cachedClient) {
    return cachedClient;
  }
  try {
    const client = new MongoClient(process.env.MONGODB_URI!);

    await client.connect();
    console.log('connected to database')
    cachedClient = client;
    return client;}
  catch (error){
    console.log(error)
  }
}

// User Functions

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

export async function updateUser(id:string, fullName:string, address:string, phoneNumber:string){
  return await sql.query(`UPDATE users SET fullname = $1, address = $2, phone_number = $3 WHERE id = $4`, [fullName, address, phoneNumber, id])
}
//MongoDB  Code: 
      //   const client = await connectToDatabase();
    //   const collection = client.db('handcrafted-haven').collection('users');   //  Mongo DB Commands

    //   const data = await collection.find({_id: new ObjectId(id)}).toArray();
    //   return data;
    // }

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

export async function removeFromFavorites(userId: string, productId: string) {
  try {
    const query = await sql.query(`DELETE FROM favorites WHERE user_id = '${userId}' AND product_id = '${[productId]}'`)
    console.log(query.rowCount) 
    revalidatePath(`/profile/${userId}`)
  }
    catch (error){
      throw error;
    }
  // try {
  //   const client = await connectToDatabase();                                //  Mongo DB Commands
  //   const collection = client.db('handcrafted-haven').collection('users');
  //   const deleteFav = await collection.updateOne({_id: userId}, {"$pull" : {favoriteItems : {_id : productId}}})
  //   if (deleteFav.modifiedCount = 1){
  //     return true;
  //   }
  //   else {
  //     return false;
  //   }}
  // catch (error) {
  //   console.error(`Failed to delete favorite: `, error);
  //   throw new Error("Sorry, but " + error);
  // }
}

// Product Functions

async function getProductInfo(item: any){
//   const client = await connectToDatabase();        //  Mongo DB Commands
//   const collection = client.db('handcrafted-haven').collection('products');
//   const data = await collection.findOne({_id: item});
//   console.log(data)
//   return data;
// }

// export async function getProductInfo({ favorites }: { favorites: any[] }) {
//   const client = await connectToDatabase();
//   const collection = client.db('handcrafted-haven').collection('products');
//   favorites.map((item: any) => {
//     console.log(item);
//     const data = await collection.findOne({_id: item}, {projection: {productName: 1, image:1, price:1}})
//     console.log(data)
//     return data
//   })
//   return favorites;

// testing function
}

export async function getTableNames(){
  return await sql.query(
   "SELECT table_name FROM information_schema.tables WHERE table_schema='public' AND table_type='BASE TABLE';")

 }
 
 
 
