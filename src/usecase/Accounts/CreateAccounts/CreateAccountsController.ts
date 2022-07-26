import { Request, Response } from "express";

import { CreateAccountsUsecase } from "./CreateAccountsUsecase";

export class CreateAccountsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { user_id, password, category_id } = request.body;

    const service = new CreateAccountsUsecase();

    try {
      const account = await service.execute({
        user_id,
        password,
        category_id
      });

      return response.status(201).json(account);
    } catch (err) {
      return response.status(400).json({
        message: err.message
      });
    }
  }
}