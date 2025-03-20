import { Request, Response } from "express";
import { ErrorCodes } from "../../constants/errorCodes";
import { responseStatus } from "../../constants/statusEnum";
import { AppSuccess } from "../../types/succesType";
import { AppError } from "../../types/appError";
import Products from "../../models/productsSchema";

const updateProductQuantity = async (
  request: Request,
  response: Response
): Promise<void> => {
  try {
    const { _id } = request.params; // ID del prodotto
    const { quantity } = request.body; // Nuova quantità da impostare

    // Verifica se l'ID e la quantità sono stati forniti
    if (!_id) {
      throw new AppError(
        responseStatus.BAD_REQUEST,
        ErrorCodes.MISSING_FIELD,
        "ID del prodotto non specificato"
      );
    }

    if (quantity === undefined || quantity === null) {
      throw new AppError(
        responseStatus.BAD_REQUEST,
        ErrorCodes.MISSING_FIELD,
        "Quantità non specificata"
      );
    }

    // Aggiorna solo la quantità del prodotto
    const updatedProduct = await Products.findByIdAndUpdate(
      _id,
      { quantity }, // Aggiorna solo il campo "quantity"
      { new: true } // Restituisce il documento aggiornato
    ).select("-__v");

    // Se il prodotto non è stato trovato
    if (!updatedProduct) {
      throw new AppError(
        responseStatus.NOT_FOUND,
        ErrorCodes.ENTITY_NOT_FOUND,
        `Prodotto con id: ${_id} non trovato`
      );
    }

    // Risposta di successo
    AppSuccess.getInstance().successResponse(
      response,
      "Quantità del prodotto aggiornata con successo",
      responseStatus.OK,
      { updatedProduct }
    );
  } catch (error) {
    // Gestione degli errori
    if (error instanceof AppError) {
      throw error;
    }

    console.error("Errore durante l'aggiornamento della quantità:", error);
    throw new AppError(
      responseStatus.INTERNAL_SERVER_ERROR,
      ErrorCodes.ENTITY_NOT_FOUND,
      "Errore durante l'aggiornamento della quantità del prodotto"
    );
  }
};

export default updateProductQuantity;
