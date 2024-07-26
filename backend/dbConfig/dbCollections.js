// dbCollections.js
import { MongoClient, ServerApiVersion } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@joblistingportalapp.rfs6mis.mongodb.net/?retryWrites=true&w=majority&appName=JobListingPortalApp`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function connectDB() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
}

const jobsCollections = client.db("JobListingPortalApp").collection("demoJobs");

export { connectDB, jobsCollections };
