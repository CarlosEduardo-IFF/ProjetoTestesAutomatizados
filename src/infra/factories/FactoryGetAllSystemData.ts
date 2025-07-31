import { DonationRepository } from "@/data/repositories/DonationRepository";
import { RequestRepository } from "@/data/repositories/RequestRepository";
import { GetAllSystemDataUseCase } from "@/domain/usecases/GetAllSystemDataUseCase";
import { GetAllSystemDataController } from "@/controllers/GetAllSystemDataController";

export function factoryGetAllSystemData() {
  const donationRepository = new DonationRepository();
  const requestRepository = new RequestRepository();
  const useCase = new GetAllSystemDataUseCase(donationRepository, requestRepository);
  const controller = new GetAllSystemDataController(useCase);
  return controller;
}