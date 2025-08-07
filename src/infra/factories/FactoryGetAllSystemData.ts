import { DonationRepository } from "@/data/repositories/DonationRepository";
import { RequestRepository } from "@/data/repositories/RequestRepository";
import { GetAllSystemDataUseCase } from "@/domain/usecases/GetAllSystemDataUseCase";
import { GetAllSystemDataController } from "@/controllers/GetAllSystemDataController";
import { MongoDatabase } from "@/data/mongo/MongoDatabase";

export function factoryGetAllSystemData() {
  const dataBase = new MongoDatabase();
  const donationRepository = new DonationRepository(dataBase);
  const requestRepository = new RequestRepository(dataBase);
  const useCase = new GetAllSystemDataUseCase(donationRepository, requestRepository);
  const controller = new GetAllSystemDataController(useCase);
  return controller;
}