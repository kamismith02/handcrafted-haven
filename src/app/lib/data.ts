'use server'

import { MongoClient, ObjectId } from 'mongodb';
const uri = process.env.MONGODB_URI;


if (!uri) {
  throw new Error('Please define the uri environment variable');
}

let cachedClient: any;

type FavoriteItem = {
  _id: string;
  sellerId: string;
  productName: string;
  description: string;
  price: number;
  category: string;
  images: string[];
};

export async function connectToDatabase() {
  if (cachedClient) {
    return cachedClient;
  }
  try {
    const client = new MongoClient(uri!);

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
  const client = await connectToDatabase();
  const collection = client.db('handcrafted-haven').collection('users');

  const data = await collection.find({_id: new ObjectId(id)}).toArray();
  return data;
}

export async function getFavorites(id: string): Promise<FavoriteItem[]>{
  const newArray: FavoriteItem[] = [];
  const client = await connectToDatabase();
  const collection = client.db('handcrafted-haven').collection('users');
  const data = await collection.findOne({_id: id}, {projection: {favoriteItems: 1}});
  const items = data.favoriteItems;
  console.log(items);

  for (const element of items) {
    try {
        const info = await getProductInfo(element); 
        if (info) {
            newArray.push(info); 
        }
    } catch (error) {
        console.error(`Failed to fetch product info for item ${element}:`, error);
    }
}

  return newArray || [];
}

export async function removeFromFavorites(userId: string, productId: string) {
  try {
    const client = await connectToDatabase();
    const collection = client.db('handcrafted-haven').collection('users');
    const deleteFav = await collection.updateOne({_id: userId}, {"$pull" : {favoriteItems : {_id : productId}}})
    if (deleteFav.modifiedCount = 1){
      return true;
    }
    else {
      return false;
    }}
  catch (error) {
    console.error(`Failed to delete favorite: `, error);
    throw new Error("Sorry, but " + error);
  }
}

// Product Functions

async function getProductInfo(item: any){
  const client = await connectToDatabase();
  const collection = client.db('handcrafted-haven').collection('products');
  const data = await collection.findOne({_id: item});
  console.log(data)
  return data;
}

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
// }
