import { Request } from "@/domain/entities/Request";
import { IRepository } from "@/contracts/IRepository";

export interface IRequestRepository extends IRepository<Request> {}
