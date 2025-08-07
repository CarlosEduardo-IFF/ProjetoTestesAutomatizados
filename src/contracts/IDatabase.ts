import { Document } from "mongodb";

export interface IDatabase {
  findAll<T extends Document>(collectionName: string): Promise<T[]>;

}