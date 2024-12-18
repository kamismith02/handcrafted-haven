import bcrypt from 'bcrypt';
import { db } from '@vercel/postgres';
import { invoices, users, products } from '../lib/placeholderdata';

const client = await db.connect();

async function seedUsers() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  
  // Users table with roles
  await client.sql`
    CREATE TABLE IF NOT EXISTS users (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL
    );
  `;

  // Profiles table linked to users
  await client.sql`
    CREATE TABLE IF NOT EXISTS profiles (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      user_id UUID REFERENCES users(id) ON DELETE CASCADE,
      role VARCHAR(50) NOT NULL CHECK (role IN ('Seller', 'Customer')),
      image_url VARCHAR(255)
    );
  `;

  const insertedUsers = await Promise.all(
    users.map(async (user) => {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      return client.sql`
        INSERT INTO users (id, name, email, password)
        VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword})
        ON CONFLICT (id) DO NOTHING;
      `;
    })
  );

  // Insert profiles linked to users
  const insertedProfiles = await Promise.all(
    users.map((user) =>
      client.sql`
        INSERT INTO profiles (user_id, role, image_url)
        VALUES (${user.id}, ${user.role}, ${user.image_url})
        ON CONFLICT (id) DO NOTHING;
      `
    )
  );

  return { insertedUsers, insertedProfiles };
}

async function seedInvoices() {
  await client.sql`
    CREATE TABLE IF NOT EXISTS invoices (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      user_id UUID REFERENCES users(id) ON DELETE CASCADE,
      amount INT NOT NULL,
      status VARCHAR(255) NOT NULL,
      date DATE NOT NULL
    );
  `;

  const insertedInvoices = await Promise.all(
    invoices.map((invoice) =>
      client.sql`
        INSERT INTO invoices (user_id, amount, status, date)
        VALUES (${invoice.user_id}, ${invoice.amount}, ${invoice.status}, ${invoice.date})
        ON CONFLICT (id) DO NOTHING;
      `
    )
  );

  return insertedInvoices;
}

async function seedProducts() {
  await client.sql`
    CREATE TABLE IF NOT EXISTS products (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      seller_id UUID REFERENCES users(id) ON DELETE CASCADE,
      product_name VARCHAR(255) NOT NULL,
      price INT NOT NULL,
      description TEXT,
      category VARCHAR(255),
      image VARCHAR(255)
    );
  `;

  const insertedProducts = await Promise.all(
    products.map((product) =>
      client.sql`
        INSERT INTO products (seller_id, product_name, price, description, category, image)
        VALUES (${product.user_id}, ${product.name}, ${product.price}, ${product.description}, ${product.category}, ${product.image})
        ON CONFLICT (id) DO NOTHING;
      `
    )
  );

  return insertedProducts;
}

export async function GET() {
  try {
    await client.sql`BEGIN`;
    await seedUsers();
    await seedProducts();
    await seedInvoices();
    await client.sql`COMMIT`;

    return Response.json({ message: 'Database seeded successfully' });
  } catch (error) {
    await client.sql`ROLLBACK`;
    return Response.json({ error }, { status: 500 });
  }
}
