import { Request, Response } from 'express';

import { CreateUsersUsecase } from './CreateUsersUsecase';

export class CreateUsersController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, cpf } = request.body;

    const service = new CreateUsersUsecase();

    try {
      const user = await service.execute({
        name,
        cpf
      });

      return response.status(201).json(user);
    } catch (err) {
      return response.status(400).json({
        message: err.message
      });
    }
  }
}