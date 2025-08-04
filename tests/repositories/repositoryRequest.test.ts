import { RequestRepository } from "../../src/data/repositories/RequestRepository";
import { MongoClient } from "../../src/data/mongo/Mongo";
import { Request } from "../../src/domain/entities/Request";

// fake do cursor que é retornado pelo MongoDB
class FakeCursor<T> {
  constructor(private data: T[]) {}
  
  async toArray(): Promise<T[]> {
    return this.data;
  }
}

// um fake da coleção
class FakeCollection<T> {
  constructor(private data: T[]) {}

  find(): FakeCursor<T> {
    return new FakeCursor<T>(this.data);
  }
}

// um fake do MongoDB
class FakeDb {
  constructor(private data: Request[]) {}

  collection(name: string) {
    if (name === "requests") {
      return new FakeCollection(this.data);
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
  MongoClient.db = new FakeDb(mockRequests) as any;
  return new RequestRepository();
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