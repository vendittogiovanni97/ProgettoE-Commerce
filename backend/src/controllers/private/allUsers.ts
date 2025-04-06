import { Request, Response } from "express";
import { AppError } from "../../types/appError";
import { responseStatus } from "../../constants/statusEnum";
import { ErrorCodes } from "../../constants/errorCodes";
import { AppSuccess } from "../../types/succesType";
import Users from "../../models/usersSchema";

const allUsers = async (request: Request, response: Response) => {
  try {
    const users = await Users.find().select("-__v");

    if (!users) {
      throw new AppError(
        responseStatus.NO_CONTENT,
        ErrorCodes.ENTITY_NOT_FOUND,
        "Utenti non trovati"
      );
    }

    AppSuccess.getInstance().successResponse(
      response,
      "Dati di tuti gli utenti registrati trovati con successo",
      responseStatus.OK,
      {
        users,
      }
    );
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }
    console.log("errore durante il recupero del prodotto", error);
    throw new AppError(
      responseStatus.INTERNAL_SERVER_ERROR,
      ErrorCodes.ENTITY_NOT_FOUND,
      "Errore durante il caricamento"
    );
  }
};

export default allUsers;
