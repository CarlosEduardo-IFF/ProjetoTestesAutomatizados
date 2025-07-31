import dotenv from "dotenv";
dotenv.config();

import { MongoClient as Mongo, Db } from "mongodb";

export const MongoClient = {
  client: undefined as unknown as Mongo,
  db: undefined as unknown as Db,

  async connect(): Promise<void> {
    const url = process.env.MONGODB_URL;
    const username = process.env.MONGODB_USERNAME;
    const password = process.env.MONGODB_PASSWORD;

    if (!url || !username || !password) {
      throw new Error("Variáveis não estão definidas!");
    }

    const client = new Mongo(url, {
      auth: { username, password }
    });

    await client.connect();

    const db = client.db("database");

    this.client = client;
    this.db = db;

    console.log("Conectou ao MongoDB!");
  }
};
