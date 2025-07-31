import { IRepository } from "@/contracts/IRepository";
import { Request } from "@/domain/entities/Request";
import { MongoClient } from "@/data/mongo/Mongo"

export class RequestRepository implements IRepository<Request> {
  async findAll(): Promise<Request[]> {
    const requests = await MongoClient.db
      .collection<Request>("requests")
      .find({})
      .toArray();
    
    return requests.map(({ _id, ...rest }) => ({
      ...rest,
      id: _id.toHexString(),
    }));
  }
}