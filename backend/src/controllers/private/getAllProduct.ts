import { Request, Response } from "express";
import Products from "../../models/productsSchema";
import { AppError } from "../../types/appError";
import { responseStatus } from "../../constants/statusEnum";
import { ErrorCodes } from "../../constants/errorCodes";
import { AppSuccess } from "../../types/succesType";

const getAllProduct = async (request: Request, response: Response) => {
  try {
    const products = await Products.find();

    if (!products || products.length === 0) {
      throw new AppError(
        responseStatus.NO_CONTENT,
        ErrorCodes.ENTITY_NOT_FOUND,
        "Prodotto non trovato o non esistente"
      );
    }

    AppSuccess.getInstance().successResponse(
      response,
      "Dati del prodotto trovato",
      responseStatus.OK,
      {
        products,
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
      "Errore durante il rcupero dei prodotti"
    );
  }
};

export default getAllProduct;
