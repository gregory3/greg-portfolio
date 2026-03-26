import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error("Missing MONGODB_URI environment variable.");
}

declare global {
  var __mongoClientPromise__: Promise<MongoClient> | undefined;
}

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {
  // Reuse the client during local hot reloads to avoid opening a new
  // connection on every file save.
  if (!global.__mongoClientPromise__) {
    client = new MongoClient(uri);
    global.__mongoClientPromise__ = client.connect();
  }

  clientPromise = global.__mongoClientPromise__;
} else {
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

export default clientPromise;
