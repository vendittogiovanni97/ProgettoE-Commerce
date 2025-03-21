import { Router } from "express";
import register from "../controllers/auth/register";
import login from "../controllers/auth/login";

const accountRoutes = (app: Router) => {
  const router = Router();

  router.post("/register", register);
  router.post("/login", login);

  app.use("/", router);
};

export default accountRoutes;
