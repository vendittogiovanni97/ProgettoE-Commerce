import { Router } from "express";
import productPublic from "../controllers/public/productPublic";

const routesPublic = (app: Router) => {
  const router = Router();

  router.get("product/public", productPublic);
  app.use("/", router);
};

export default routesPublic;
