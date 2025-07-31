import express from 'express';
import { config } from 'dotenv';
import { MongoClient } from '@/data/mongo/Mongo';
import { routeGetAllSystemData } from '@/infra/routes/routeGetAllSystemData';

const start = async () => {
  config();

  const app = express();
  const port = process.env.PORT;

  await MongoClient.connect();

  app.use("/api", routeGetAllSystemData);

  app.listen(port, () => {
    console.log(`Diponivel na porta: ${port}!`);
  });
};

start();
