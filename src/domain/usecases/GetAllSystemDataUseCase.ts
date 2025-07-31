import { Donation } from "@/domain/entities/Donation";
import { Request } from "@/domain/entities/Request";
import { IRepository } from "@/contracts/IRepository";
import { IUseCase } from "@/contracts/IUseCase";

export interface SystemDataResponse {
  donations: Donation[];
  requests: Request[];
}

export class GetAllSystemDataUseCase implements IUseCase<void, SystemDataResponse> {
  donationRepository: IRepository<Donation>;
  requestRepository: IRepository<Request>;

  constructor(
    donationRepository: IRepository<Donation>,
    requestRepository: IRepository<Request>
  ) {
    this.donationRepository = donationRepository;
    this.requestRepository = requestRepository;
  }

  async perform(): Promise<SystemDataResponse> {
    const [donations, requests] = await Promise.all([
      this.donationRepository.findAll(),
      this.requestRepository.findAll()
    ]);

    return { donations, requests };
  }
}
