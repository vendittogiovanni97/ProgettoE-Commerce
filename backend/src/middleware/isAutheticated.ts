import { NextFunction, Request, Response } from "express";
import { Session, SessionData } from "express-session";

// Estendi l'interfaccia SessionData per includere userId
declare module "express-session" {
  interface SessionData {
    userId?: number | string; // Usa il tipo appropriato per il tuo userId
  }
}

export const isAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let isLoggedIn = false;

  if (req.session.user?.email !== undefined) {
    isLoggedIn = true;
  }
  if (!isLoggedIn) {
    res.status(401).json("User must be logged in to access this resource");
    return;
  }

  next();
};
