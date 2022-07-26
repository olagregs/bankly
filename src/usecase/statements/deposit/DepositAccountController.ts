import { Request, Response } from "express";

import { DepositAccountUsecase } from "./DepositAccountUsecase";

export class DepositAccountController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { description, amount } = request.body;
    const { account_id } = request;

    const service = new DepositAccountUsecase();

    const operation = await service.execute({
      description,
      amount,
      account_id
    });

    return response.status(200).json(operation);
  }
}