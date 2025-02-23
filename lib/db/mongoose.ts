import mongoose, { Mongoose } from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

interface MongooseConnection {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

type GlobalWithMongoose = typeof globalThis & {
  mongoose?: MongooseConnection;
};

let cached: MongooseConnection | undefined = (global as GlobalWithMongoose)
  .mongoose;

if (!cached) {
  cached = (global as GlobalWithMongoose).mongoose = {
    conn: null,
    promise: null,
  };
}

export const connectToDatabase = async () => {
  if (cached.conn) return cached.conn;

  if (!MONGODB_URI) throw new Error("Missing MONGODB_URI");

  cached.promise =
    cached.promise ||
    mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
    });

  cached.conn = await cached.promise;

  return cached.conn;
};
