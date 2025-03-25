import { Request, Response, NextFunction } from "express";
import { isAuthenticated } from "./isAutheticated";

interface User {
  email: string;
  isAdmin: boolean;
  // altri campi dell'utente...
}

declare module "express-session" {
  interface SessionData {
    user?: User;
  }
}

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  // Prima verifica l'autenticazione
  isAuthenticated(req, res, (err?: any) => {
    if (err) {
      next(err)
      return;
    }

    // Poi verifica se è admin
    if (req.session.user && req.session.user.isAdmin === true) {
      next();
      return;
    }

    // Se l'utente non è admin, restituisci errore 403 Forbidden
    res.status(403).json({
      error: "Accesso negato. Sono richiesti privilegi di amministratore.",
    });
    return;
  });
};
