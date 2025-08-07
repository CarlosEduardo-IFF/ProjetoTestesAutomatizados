import { RequestRepository } from "../../src/data/repositories/RequestRepository";
import { Request } from "../../src/domain/entities/Request";
import { IDatabase } from "../../src/contracts/IDatabase";

// um fake do MongoDB
class FakeDatabase implements IDatabase {
  constructor(private data: Request[]) {}

  async findAll<T>(collectionName: string): Promise<T[]> {
    if (collectionName === "requests") {
      return this.data.map((request: any) => ({
        ...request,
        id: request._id.toHexString(),
      })) as T[];
    }
    throw new Error("Collection não encontrada");
  }
}

// compara se duas listas de doacoes sao iguais
function deepEqual(a: Request[], b: Request[]): boolean {
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i++) {
    if (
      a[i].id !== b[i].id ||
      a[i].item !== b[i].item ||
      a[i].quantity !== b[i].quantity ||
      a[i].date.getTime() !== b[i].date.getTime()
    ) {
      return false;
    }
  }
  return true;
}

// cria um SUT com dados simulados
function createSUT(mockRequests: any[]) {
  const fakeDb = new FakeDatabase(mockRequests);
  return new RequestRepository(fakeDb);
}

// ======== Teste 1: verifica se retorna os dados corretamente ========
async function testFindAllReturnsMappedRequests() {
  const mockData = [
    {
      _id: { toHexString: () => "688b7577ed499f362f095be5" },
      item: "Saco de Cimento",
      quantity: 20,
      client: "Pedro",
      status: "Pendente",
      date: new Date("2025-07-01"),
    },
    {
      _id: { toHexString: () => "688b7586ed499f362f095be9" },
      item: "Caixa de Azulejos",
      quantity: 15,
      client: "Mario",
      status: "Pendente",
      date: new Date("2025-07-15"),
    },
    {
      _id: { toHexString: () => "688b7597ed499f362f095beb" },
      item: "Lata de Tinta Branca",
      quantity: 10,
      client: "Maria",
      status: "Pendente",
      date: new Date("2025-07-20"),
    },
  ];

  const expected = [
    new Request("688b7577ed499f362f095be5", "Saco de Cimento", 20, "Pedro", "Pendente", new Date("2025-07-01")),
    new Request("688b7586ed499f362f095be9", "Caixa de Azulejos", 15, "Mario", "Pendente", new Date("2025-07-15")),
    new Request("688b7597ed499f362f095beb", "Lata de Tinta Branca", 10, "Maria", "Pendente", new Date("2025-07-20")),
  ];

  const repository = createSUT(mockData);
  const result = await repository.findAll();

  // analisa se o resultado bate com o esperado
  console.assert(deepEqual(result, expected), "testFindAllReturnsMappedRequests falhou");
  if (deepEqual(result, expected)) {
    console.log("testFindAllReturnsMappedRequests passou");
  }
}

// ======== Teste 2: verifica se retorna vazio quando nao tem dados ========
async function testFindAllReturnsEmptyArrayRequests() {
  const repository = createSUT([]);
  const result = await repository.findAll();

  // analisa se o arry esta vazio
  console.assert(Array.isArray(result) && result.length === 0, "testFindAllReturnsEmptyArrayRequests falhou");
  if (Array.isArray(result) && result.length === 0) {
    console.log("testFindAllReturnsEmptyArrayRequests passou");
  }
}

//executa os testes
export async function runTests() {
  await testFindAllReturnsMappedRequests();
  await testFindAllReturnsEmptyArrayRequests();
}