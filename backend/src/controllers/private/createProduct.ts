import { Product } from "../../types/productsInfo";
import Products from "../../models/productsSchema";
import { AppSuccess } from "../../types/succesType";
import { responseStatus } from "../../constants/statusEnum";
import { Request, Response } from "express";
import { ErrorCodes } from "../../constants/errorCodes";
import { AppError } from "../../types/appError";

const createProduct = async (
  request: Request<{}, unknown, Product>,
  response: Response
): Promise<void> => {
  const body = request.body;

  // Validazione dei dati in ingresso
  /*if (!body.name || !body.quantity || !body.price || !body.category) {
    throw new AppError(
      responseStatus.BAD_REQUEST,
      ErrorCodes.INVALID_INPUT,
      "Nome, quantità, prezzo e categoria sono obbligatori"
    );
  } 
  */

  try {
    const newProduct = await Products.create({
      name: body.name,
      quantity: body.quantity,
      price: body.price,
      disponibility: body.disponibility,
      category: body.category,
      timestamp: new Date().toISOString(),
    });
    console.log("Non entra in app success");
    AppSuccess.getInstance().successResponse(
      response,
      "Prodotto creato con successo",
      responseStatus.OK,
      { newProduct }
    );
  } catch (error) {
    console.error("Errore durante la creazione del prodotto:", error);
    response.status(responseStatus.INTERNAL_SERVER_ERROR).json({
      message: "Si è verificato un errore durante la creazione del prodotto",
    });
  }
};

export default createProduct;
