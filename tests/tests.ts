import { runTests as runDonationRepositoryTests } from "./repositories/repositoryDonation.test";
import { runTests as runControllerGetAllTests} from "./controllers/controllerGetAll.test";

async function runTests() {
  
  await runDonationRepositoryTests();
  await runControllerGetAllTests();

}

runTests();
