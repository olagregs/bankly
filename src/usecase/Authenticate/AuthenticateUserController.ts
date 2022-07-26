import { Request, Response } from "express";

import { AuthenticateUserUsecase } from "./AuthenticateUserUsecase";

export class AuthenticateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { account_id, password } = request.body;

    const service = new AuthenticateUserUsecase();

    try {
      const token = await service.execute({
        account_id,
        password
      });

      return response.status(200).json(token);
    } catch (err) {
      return response.status(400).json({
        message: err.message
      });
    }
  }
}