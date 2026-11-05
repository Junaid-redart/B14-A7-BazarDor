import dns from "node:dns";
import { MongoClient } from "mongodb";

dns.setServers(["1.1.1.1", "8.8.8.8"]);

const client = new MongoClient(process.env.MONGODB_URI);

try {
  await client.connect();
  await client.db("admin").command({ ping: 1 });

  console.log("MongoDB connected successfully!");
} catch (error) {
  console.error("MongoDB connection failed:", error.message);
} finally {
  await client.close();
}
