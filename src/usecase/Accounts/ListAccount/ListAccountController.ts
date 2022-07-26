import { Request, Response } from "express";

import { ListAccountUsecase } from "./ListAccountUsecase";

export class ListAccountController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { account_id } = request.params;

    const service = new ListAccountUsecase();

    try {
      const account = await service.execute(account_id);

      return response.status(200).json(account);
    } catch (err) {
      return response.status(404).json({
        message: err.message
      });
    }
  }
}