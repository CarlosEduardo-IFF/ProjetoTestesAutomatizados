import { IRepository } from "@/contracts/IRepository";
import { Donation } from "@/domain/entities/Donation";
import { IDatabase } from "@/contracts/IDatabase";

export class DonationRepository implements IRepository<Donation> {
  db: IDatabase;
  constructor(db: IDatabase) {
    this.db = db;
  }

  async findAll(): Promise<Donation[]> {
    return await this.db.findAll<Donation>("donations");
  }
}