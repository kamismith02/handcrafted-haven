import mongoose, { Connection } from "mongoose";

let cachedConnection: Connection | null = null;

export async function connectToDatabase() {
     if (cachedConnection) {
       console.log("Using cached database connection");
       return cachedConnection;
     }

     try {
       const cnx = await mongoose.connect(process.env.MONGODB_URI!);
       cachedConnection = cnx.connection;
       console.log("New MongoDB connection established");
       return cachedConnection;
     } catch (error) {
       console.error("Error connecting to MongoDB:", error);
       throw error;
     }
}