import { Router } from "express";
import { isAdmin } from "../middleware/isAdmin";
import createProduct from "../controllers/private/createProduct";
import allUsers from "../controllers/private/allUsers";
import deleteProduct from "../controllers/private/deleteProduct";

const adminRouter = (app: Router) => {
  const router = Router();

  router.post("/product", [isAdmin], createProduct);
  router.get("/users", [isAdmin], allUsers);
  router.delete("/product/:id", [isAdmin], deleteProduct);
  app.use("/", router);
};

export default adminRouter;
