import { IRepository } from "@/contracts/IRepository";
import { Request } from "@/domain/entities/Request";
import { IDatabase } from "@/contracts/IDatabase";

export class RequestRepository implements IRepository<Request> {

  db: IDatabase;
  constructor(db: IDatabase) {
    this.db = db;
  }

  async findAll(): Promise<Request[]> {
    return await this.db.findAll<Request>("requests");
  }
}