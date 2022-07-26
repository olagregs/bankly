import { Request, Response } from "express";
import { BalanceAccountUsecase } from "./BalanceAccountUsecase";


export class BalanceAccountController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { account_id } = request;

    const service = new BalanceAccountUsecase();

    try {
      const balance = await service.execute(account_id);

      return response.status(200).json({
        balance: balance
      });
    } catch (err) {
      return response.status(404).json({
        message: err.message
      });
    }
  }
}