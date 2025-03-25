import { Router, Express } from "express";
import accountRoutes from "./accountRouter";
import adminRouter from "./adminRoutes";
import routesPrivate from "./routesPrivate";
import routesPublic from "./routesPublic";

const addrouter = (app: Express) => {
  const router = Router();
  const privateRouter = Router();

  accountRoutes(router);
  routesPublic(router);
  adminRouter(privateRouter);
  routesPrivate(privateRouter);

  app.use("/rest", router);
  app.use("/rest/private", privateRouter);
};

export default addrouter;
