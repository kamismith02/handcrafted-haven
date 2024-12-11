import { MongoClient } from 'mongodb';
import { NextResponse } from 'next/server';

const uri = process.env.MONGODB_URI as string; // Type assertion to assume it's a string

if (!uri) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

let cachedClient: MongoClient;

async function connectToDatabase() {
  if (cachedClient) {
    return cachedClient;
  }
  try {
    cachedClient = new MongoClient(uri);
    await cachedClient.connect();
    console.log('Connected to database');
    return cachedClient;
  } catch (error) {
    console.error('Failed to connect to database', error);
    throw new Error('Database connection failed');
  }
}

export async function GET() {
  const client = await connectToDatabase(); // Connect to database
  const db = client.db('handcrafted-haven'); // Access the database
  const products = await db.collection('products').find().toArray(); // Fetch products
  
  console.log('Fetched products:', products); // Log the fetched products

  return NextResponse.json({ products }); // Return products as JSON
}
