import { Request, Response } from "express";
import { ErrorCodes } from "../../constants/errorCodes";
import { responseStatus } from "../../constants/statusEnum";
import { AppSuccess } from "../../types/succesType";
import { AppError } from "../../types/appError";
import Users from "../../models/usersSchema";

const getUserInfo = async (
  request: Request,
  response: Response
): Promise<void> => {
  try {
    // Cerca l'utente predefinito nel database
    const user = await Users.find().select("-password -__v"); // Escludi campi sensibili

    // Se l'utente non è stato trovato
    if (!user) {
      throw new AppError(
        responseStatus.NOT_FOUND,
        ErrorCodes.ENTITY_NOT_FOUND,
        "Utente predefinito non trovato"
      );
    }

    // Risposta di successo
    AppSuccess.getInstance().successResponse(
      response,
      "Informazioni utente recuperate con successo",
      responseStatus.OK,
      { user }
    );
  } catch (error) {
    // Gestione degli errori
    if (error instanceof AppError) {
      throw error;
    }

    console.error(
      "Errore durante il recupero delle informazioni utente:",
      error
    );
    throw new AppError(
      responseStatus.INTERNAL_SERVER_ERROR,
      ErrorCodes.ENTITY_NOT_FOUND,
      "Errore durante il recupero delle informazioni utente"
    );
  }
};

export default getUserInfo;
