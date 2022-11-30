import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const mongoClient = new MongoClient(process.env.MONGO_URL);

try {
  console.log("Connecting to MongoDB...");
  await mongoClient.connect();
  console.log("Banco de Dados conectado");
} 
catch (error) {
  console.log("Erro ao conectar o banco de dados");
}

const db = mongoClient.db("DrivenCracy");
export const dbPolls = db.collection("polls");