import { Request, Response } from "express";
import { TransferenceStatusUsecase } from "./TransferenceStatusUsecase";

export class TransferenceStatusController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { transaction_id } = request.params;

    const service = new TransferenceStatusUsecase();

    try {
      const status = await service.execute(transaction_id);

      return response.status(200).json({
        status: status
      });
    } catch (err) {
      return response.status(404).json({
        message: err.message
      });
    }
  }
}