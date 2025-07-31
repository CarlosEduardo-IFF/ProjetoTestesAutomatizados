import { IController } from "@/contracts/IController";
import { IUseCase } from "@/contracts/IUseCase";
import { SystemDataResponse } from "@/domain/usecases/GetAllSystemDataUseCase";

export class GetAllSystemDataController implements IController<void, SystemDataResponse> {
  useCase: IUseCase<void, SystemDataResponse>;

  constructor( useCase: IUseCase<void, SystemDataResponse>) {
    this.useCase = useCase;
  }

  async handle(): Promise<SystemDataResponse> {
    return await this.useCase.perform();
  }
}