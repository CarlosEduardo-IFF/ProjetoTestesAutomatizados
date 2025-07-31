import { DonationRepository } from "../../src/data/repositories/DonationRepository";
import { MongoClient } from "../../src/data/mongo/Mongo";
import { Donation } from "../../src/domain/entities/Donation";

// fake do cursor que é retornado pelo MongoDB
class FakeCursor {
  constructor(private data: any[]) {}

  // imita o toArray do mongoDb
  async toArray() {
    return this.data;
  }
}

// um fake da coleção
class FakeCollection {
  constructor(private data: any[]) {}

  // retorna o cursor falso
  find() {
    return new FakeCursor(this.data);
  }
}

// um fake do MongoDB
class FakeDb {
  constructor(private data: any[]) {}

  collection(name: string) {
    if (name === "donations") {
      return new FakeCollection(this.data);
    }
    throw new Error("Collection não encontrada");
  }
}

// compara se duas listas de doacoes sao iguais
function deepEqual(a: Donation[], b: Donation[]): boolean {
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
function createSUT(mockDonations: any[]) {
  MongoClient.db = new FakeDb(mockDonations) as any;
  return new DonationRepository();
}

// ======== Teste 1: verifica se retorna os dados corretamente ========
async function testFindAllReturnsMappedDonations() {
  const mockData = [
    {
      _id: { toHexString: () => "688b7577ed499f362f095be5" },
      item: "Saco de Cimento",
      quantity: 20,
      date: new Date("2025-07-01"),
    },
    {
      _id: { toHexString: () => "688b7586ed499f362f095be9" },
      item: "Caixa de Azulejos",
      quantity: 15,
      date: new Date("2025-07-15"),
    },
    {
      _id: { toHexString: () => "688b7597ed499f362f095beb" },
      item: "Lata de Tinta Branca",
      quantity: 10,
      date: new Date("2025-07-20"),
    },
  ];

  const expected = [
    new Donation("688b7577ed499f362f095be5", "Saco de Cimento", 20, new Date("2025-07-01")),
    new Donation("688b7586ed499f362f095be9", "Caixa de Azulejos", 15, new Date("2025-07-15")),
    new Donation("688b7597ed499f362f095beb", "Lata de Tinta Branca", 10, new Date("2025-07-20")),
  ];

  const repository = createSUT(mockData);
  const result = await repository.findAll();

  // analisa se o resultado bate com o esperado
  console.assert(deepEqual(result, expected), "testFindAllReturnsMappedDonations falhou");
  if (deepEqual(result, expected)) {
    console.log("testFindAllReturnsMappedDonations passou");
  }
}

// ======== Teste 2: verifica se retorna vazio quando nao tem dados ========
async function testFindAllReturnsEmptyArray() {
  const repository = createSUT([]);
  const result = await repository.findAll();

  // analisa se o arry esta vazio
  console.assert(Array.isArray(result) && result.length === 0, "testFindAllReturnsEmptyArray falhou");
  if (Array.isArray(result) && result.length === 0) {
    console.log("testFindAllReturnsEmptyArray passou");
  }
}

//executa os testes
export async function runTests() {
  await testFindAllReturnsMappedDonations();
  await testFindAllReturnsEmptyArray();
}
