import { Request, Response } from "express";

import { TransferAccuntsUseCase } from "./TransferAccuntsUseCase";

export class TransferAccountController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { description, amount, destination_account_id } = request.body;
    const { account_id } = request;

    const server = new TransferAccuntsUseCase();

    try {
      const transactionId = await server.execute({
        description,
        amount,
        origin_account_id: account_id,
        destination_account_id
      });

      return response.status(200).json({
        transactionId: transactionId
      });
    } catch (err) {
      return response.status(400).json({
        message: err.message
      })
    }
  }
}