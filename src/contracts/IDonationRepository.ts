import { Donation } from "@/domain/entities/Donation";
import { IRepository } from "@/contracts/IRepository";

export interface IDonationRepository extends IRepository<Donation> {}
