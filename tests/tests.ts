import { runTests as runDonationRepositoryTests } from "./repositories/repositoryDonation.test";
import { runTests as runRequestRepositoryTests } from "./repositories/repositoryRequest.test";
import { runTests as runControllerGetAllTests} from "./controllers/controllerGetAll.test";
import { runTests as runUseCaseGetAllTests} from "./usecases/usecaseGetAll.test";

async function runTests() {
  
  await runDonationRepositoryTests();
  await runRequestRepositoryTests();
  await runControllerGetAllTests();
  await runUseCaseGetAllTests();
  
}

runTests();
