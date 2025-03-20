import { Request, Response } from "express";
import { ErrorCodes } from "../../constants/errorCodes";
import { responseStatus } from "../../constants/statusEnum";
import { AppSuccess } from "../../types/succesType";
import { AppError } from "../../types/appError";
import Products from "../../models/productsSchema";

const deleteProduct = async (
  request: Request,
  response: Response
): Promise<void> => {
  try {
    const { _id } = request.params;

    // Verifica se l'ID è stato fornito
    if (!_id) {
      throw new AppError(
        responseStatus.BAD_REQUEST,
        ErrorCodes.MISSING_FIELD,
        "ID del prodotto non specificato"
      );
    }

    // Cerca e elimina il prodotto
    const deletedProduct = await Products.findByIdAndDelete(_id);

    // Se il prodotto non è stato trovato
    if (!deletedProduct) {
      throw new AppError(
        responseStatus.NOT_FOUND,
        ErrorCodes.ENTITY_NOT_FOUND,
        `Prodotto con id: ${_id} non trovato`
      );
    }

    // Risposta di successo
    AppSuccess.getInstance().successResponse(
      response,
      "Prodotto eliminato con successo",
      responseStatus.OK,
      { deletedProduct }
    );
  } catch (error) {
    // Gestione degli errori
    if (error instanceof AppError) {
      throw error;
    }

    console.error("Errore durante l'eliminazione del prodotto:", error);
    throw new AppError(
      responseStatus.INTERNAL_SERVER_ERROR,
      ErrorCodes.ENTITY_NOT_FOUND,
      "Errore durante l'eliminazione del prodotto"
    );
  }
};

export default deleteProduct;
