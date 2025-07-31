import { IRepository } from "@/contracts/IRepository";
import { Donation } from "@/domain/entities/Donation";
import { MongoClient } from "../mongo/Mongo";

export class DonationRepository implements IRepository<Donation> {
  async findAll(): Promise<Donation[]> {
    const donations = await MongoClient.db
      .collection<Donation>("donations")
      .find({})
      .toArray();

    return donations.map(({ _id, ...rest }) => ({
      ...rest,
      id: _id.toHexString(),
    }));
  }
}