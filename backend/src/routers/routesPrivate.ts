import { Router } from "express";
import { isAuthenticated } from "../middleware/isAutheticated";
import getAllProduct from "../controllers/private/getAllProduct";
import getUserInfo from "../controllers/private/getUserInfo";
import getProductByID from "../controllers/private/productByID";
import updateProductQuantity from "../controllers/private/productByID";

const routesPrivate = (app: Router) => {
  const router = Router();

  router.get("user", [isAuthenticated], getUserInfo);
  router.get("products", [isAuthenticated], getAllProduct);
  router.post("product/:id", [isAuthenticated], updateProductQuantity);
  app.use("/", router);
};

export default routesPrivate;
