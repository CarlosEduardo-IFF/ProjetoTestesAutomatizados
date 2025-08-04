import { GetAllSystemDataUseCase } from "../../src/domain/usecases/GetAllSystemDataUseCase";
import { Donation } from "../../src/domain/entities/Donation";
import { Request } from "../../src/domain/entities/Request";
import { IRepository } from "../../src/contracts/IRepository";

// repositorio fake de Donation
class FakeDonationRepository implements IRepository<Donation> {
  constructor(private donations: Donation[]) {}

  async findAll(): Promise<Donation[]> {
    return this.donations;
  }
}

// repositorio fake de Request
class FakeRequestRepository implements IRepository<Request> {
  constructor(private requests: Request[]) {}

  async findAll(): Promise<Request[]> {
    return this.requests;
  }
}

// repositorio com erro
class FakeRepositoryError<T> implements IRepository<T> {
  async findAll(): Promise<T[]> {
    throw new Error("Erro ao buscar dados");
  }
}

// funcao para comparar objetos
function deepEqual(a: any, b: any): boolean {
  try {
    return JSON.stringify(a) === JSON.stringify(b);
  } catch {
    return false;
  }
}

// ======== Teste 1: verificar criacao da instancia ========
function testInstanceCreation() {
  const sut = new GetAllSystemDataUseCase(new FakeDonationRepository([]), new FakeRequestRepository([]));
  console.assert(sut instanceof GetAllSystemDataUseCase, "testInstanceCreation falhou");
  console.log("testInstanceCreation passou");
}

// ======== Teste 2: caso feliz ========
async function testPerformReturnsCorrectData() {
  const donations = [
    new Donation("1", "Saco de Cimento", 10, new Date("2025-07-01")),
    new Donation("2", "Caixa de Azulejos", 5, new Date("2025-07-02"))
  ];
  const requests = [
    new Request("1", "Saco de Cimento", 3, "Pedro", "pendente", new Date("2025-07-03"))
  ];

  const sut = new GetAllSystemDataUseCase(
    new FakeDonationRepository(donations),
    new FakeRequestRepository(requests)
  );

  try {
    const result = await sut.perform();
    const expected = { donations, requests };

    console.assert(deepEqual(result, expected), "testPerformReturnsCorrectData falhou");
    console.log("testPerformReturnsCorrectData passou");
  } catch (err) {
    console.error("testPerformReturnsCorrectData falhou com erro:", err);
  }
}

// ======== Teste 3: repositorio de Donation com erro ========
async function testErrorOnDonationRepository() {
  const sut = new GetAllSystemDataUseCase(
    new FakeRepositoryError<Donation>(),
    new FakeRequestRepository([])
  );

  try {
    await sut.perform();
    console.error("testErrorOnDonationRepository falhou: esperava erro mas não lançou");
  } catch (err) {
    console.assert(
      (err as Error).message === "Erro ao buscar dados",
      "testErrorOnDonationRepository falhou com mensagem inesperada"
    );
    console.log("testErrorOnDonationRepository passou");
  }
}

// ======== Teste 4: repositorio de Request com erro ========
async function testErrorOnRequestRepository() {
  const sut = new GetAllSystemDataUseCase(
    new FakeDonationRepository([]),
    new FakeRepositoryError<Request>()
  );

  try {
    await sut.perform();
    console.error("testErrorOnRequestRepository falhou: esperava erro mas não lançou");
  } catch (err) {
    console.assert(
      (err as Error).message === "Erro ao buscar dados",
      "testErrorOnRequestRepository falhou com mensagem inesperada"
    );
    console.log("testErrorOnRequestRepository passou");
  }
}

//executa os testes
export async function runTests() {
  testInstanceCreation();
  await testPerformReturnsCorrectData();
  await testErrorOnDonationRepository();
  await testErrorOnRequestRepository();
}
