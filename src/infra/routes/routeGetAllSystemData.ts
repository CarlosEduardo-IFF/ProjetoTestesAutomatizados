import { Router, Request, Response } from "express";
import { factoryGetAllSystemData } from "@/infra/factories/FactoryGetAllSystemData";

const router = Router();

router.get("/getAll", async (req: Request, res: Response) => {
  try {
    const controller = factoryGetAllSystemData();
    const result = await controller.handle();
    res.status(200).json(result);

  } catch (error) {
    console.error("Erro ao buscar dados do sistema", error);
    res.status(500).json({ error: "Erro interno" });
  }
});

export { router as routeGetAllSystemData };