import { Request, Response } from "express";

import { WithdrawAccountUsecase } from "./WithdrawAccountUsecase";

export class WithdrawAccountController {
  async handle(request: Request, response: Response) {
    const { description, amount } = request.body;
    const { account_id } = request;

    console.log(account_id);

    const service = new WithdrawAccountUsecase();

    try {
      const operation = await service.execute({
        description,
        amount,
        account_id
      });

      return response.status(201).json(operation);
    } catch (err) {
      return response.status(400).json({
        message: err.message
      });
    }
  }
}