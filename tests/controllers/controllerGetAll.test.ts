import { GetAllSystemDataController } from "../../src/controllers/GetAllSystemDataController";
import { SystemDataResponse } from "../../src/domain/usecases/GetAllSystemDataUseCase";
import { Donation } from "../../src/domain/entities/Donation";
import { Request } from "../../src/domain/entities/Request";
import { IUseCase } from "../../src/contracts/IUseCase";

// fake de um caso de uso sem problema
class FakeUseCaseSuccess implements IUseCase<void, SystemDataResponse> {
  async perform(): Promise<SystemDataResponse> {
    return {
      donations: [
        new Donation("688b7577ed499f362f095be5", "Saco de Cimento", 20, new Date("2025-07-01")),
        new Donation("688b7586ed499f362f095be9", "Caixa de Azulejos", 15, new Date("2025-07-15")),
        new Donation("688b7597ed499f362f095beb", "Lata de Tinta Branca", 10, new Date("2025-07-20"))
      ],
      requests: [
        new Request("688b75b6ed499f362f095bee", "Saco de Cimento", 10, "Obra Social São Lucas", "pendente", new Date("2025-07-25")),
        new Request("688b75c5ed499f362f095bf3", "Lata de Tinta Branca", 5, "Projeto Mãos à Obra", "em andamento", new Date("2025-07-28")),
        new Request("688b75dced499f362f095bf6", "Caixa de Azulejos", 8, "Construindo Esperança", "concluído", new Date("2025-07-30"))
      ]
    };
  }
}

// fake de um caso de uso com problema
class FakeUseCaseError implements IUseCase<void, SystemDataResponse> {
  async perform(): Promise<SystemDataResponse> {
    throw new Error("Falha ao obter dados do sistema");
  }
}

// compara objetos usando JSON
function deepEqual<T>(a: T, b: T): boolean {
  try {
    return JSON.stringify(a) === JSON.stringify(b);
  } catch {
    return false;
  }
}

// ======== Teste 1: verifica se retorna os dados do sistema corretamente ========
async function testHandleReturnsSystemData() {
  const fakeUseCase = new FakeUseCaseSuccess();
  const controller = new GetAllSystemDataController(fakeUseCase);

  const expected: SystemDataResponse = {
    donations: [
      new Donation("688b7577ed499f362f095be5", "Saco de Cimento", 20, new Date("2025-07-01")),
      new Donation("688b7586ed499f362f095be9", "Caixa de Azulejos", 15, new Date("2025-07-15")),
      new Donation("688b7597ed499f362f095beb", "Lata de Tinta Branca", 10, new Date("2025-07-20"))
    ],
    requests: [
      new Request("688b75b6ed499f362f095bee", "Saco de Cimento", 10, "Obra Social São Lucas", "pendente", new Date("2025-07-25")),
      new Request("688b75c5ed499f362f095bf3", "Lata de Tinta Branca", 5, "Projeto Mãos à Obra", "em andamento", new Date("2025-07-28")),
      new Request("688b75dced499f362f095bf6", "Caixa de Azulejos", 8, "Construindo Esperança", "concluído", new Date("2025-07-30"))
    ]
  };

  try {
    const result = await controller.handle();

    // analisa se o resultado retornado é igual ao esperado
    console.assert(deepEqual(result, expected), "testHandleReturnsSystemData falhou");
    if (deepEqual(result, expected)) {
      console.log("testHandleReturnsSystemData passou");
    }
  } catch (error) {
    console.error("testHandleReturnsSystemData falhou com erro:", error);
  }
}

//  ======== Teste 2: lanca erro se o caso de uso estiver com problema ========
async function testHandlePropagatesError() {
  const fakeUseCase = new FakeUseCaseError();
  const controller = new GetAllSystemDataController(fakeUseCase);

  try {
    await controller.handle();
    console.error("testHandlePropagatesError falhou: esperava erro mas não lançou");
  } catch (error) {
    if ((error as Error).message === "Falha ao obter dados do sistema") {
      console.log("testHandlePropagatesError passou");
    } else {
      console.error("testHandlePropagatesError falhou com mensagem inesperada:", error);
    }
  }
}

// executa os testes
export async function runTests() {
  await testHandleReturnsSystemData();
  await testHandlePropagatesError();
}
