import { Router } from "express";
import { isAuthenticated } from "../middleware/isAutheticated";
import getAllProduct from "../controllers/private/getAllProduct";
import getUserInfo from "../controllers/private/getUserInfo";
import getProductByID from "../controllers/private/productByID";
import updateProductQuantity from "../controllers/private/productByID";

const routesPrivate = (app: Router) => {
  const router = Router();

  router.get("/user", getUserInfo);
  router.get("/products", getAllProduct);
  router.post("/product/:id", updateProductQuantity);
  app.use("/", [isAuthenticated], router);
};

export default routesPrivate;
