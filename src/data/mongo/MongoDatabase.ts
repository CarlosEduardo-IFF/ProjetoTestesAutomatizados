import { IDatabase } from "@/contracts/IDatabase";
import { MongoClient } from "../mongo/Mongo";
import { Document } from "mongodb";

export class MongoDatabase implements IDatabase {
  async findAll<T extends Document>(collectionName: string): Promise<T[]> {
    const items = await MongoClient.db
      .collection<T>(collectionName)
      .find({})
      .toArray();

    return items.map(({ _id, ...rest }: any) => ({
      ...rest,
      id: _id?.toHexString?.() ?? undefined,
    }));
  }
}
