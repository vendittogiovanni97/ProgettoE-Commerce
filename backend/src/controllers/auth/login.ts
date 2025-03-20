import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { SessionManager } from "../../sessionData";
import { Cookie, SessionData } from "express-session";

import { AppSuccess } from "../../types/succesType";
import { ErrorCodes } from "../../constants/errorCodes";
import { responseStatus } from "../../constants/statusEnum";
import { AppError } from "../../types/appError";
import { LoginInfo } from "../../types/infoSchema";
import Users from "../../models/usersSchema";

const login = async (
  request: Request<undefined, unknown, LoginInfo>,
  response: Response
) => {
  try {
    const { body } = request;
    console.log("dati di login:", body);

    // Verifica se l'email è fornita
    if (!body.email || !body.password) {
      throw new AppError(
        responseStatus.BAD_REQUEST,
        ErrorCodes.MISSING_FIELD,
        "Email e password sono richiesti"
      );
    }

    // Cerca l'utente nel database MongoDB
    const user = await Users.findOne({ email: body.email });
    console.log("dati users", user);

    // Se l'utente non esiste
    if (!user) {
      throw new AppError(
        responseStatus.BAD_REQUEST,
        ErrorCodes.INVALID_CREDENTIALS,
        "Credenziali non valide"
      );
    }

    // Verifica la password
    const isCorrect = await bcrypt.compare(body.password, user.password);
    console.log("Password corretta:", isCorrect);
    if (!isCorrect) {
      throw new AppError(
        responseStatus.BAD_REQUEST,
        ErrorCodes.INVALID_CREDENTIALS,
        "Credenziali non valide"
      );
    }

    // Imposta la sessione
    // Imposta la sessione
    request.session.user = {
      email: user.email,
      isAdmin: user.isAdmin!, // Assicurati che questo campo sia presente nel modello User
    };

    console.log("Sessione creata:", request.session);
    // Crea la sessione
    const sessionManager = SessionManager.getInstance();
    const sessionData: SessionData = {
      userId: user.id,
      email: user.email!,
      name: user.name,
      isAdmin: user.isAdmin!,
      cookie: new Cookie(),
    };

    // Salva la sessione
    sessionManager.createSession(sessionData);

    // Invia risposta di successo
    AppSuccess.getInstance().successResponse(
      response,
      "LOGIN_SUCCESS",
      responseStatus.OK,
      {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      }
    );

    return;
  } catch (error) {
    // Se l'errore è già un AppError, lo passiamo direttamente
    if (error instanceof AppError) {
      throw error;
    }

    // Altrimenti, creiamo un nuovo errore generico
    console.error("Errore durante il login:", error);
    throw new AppError(
      responseStatus.INTERNAL_SERVER_ERROR,
      ErrorCodes.INVALID_CREDENTIALS,
      "Errore durante il login"
    );
  }
};

export default login;
