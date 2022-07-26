import { Request, Response } from 'express';

import { ListUsersUsecase } from './ListUsersUsecase';

export class ListUsersController {
  async handle(request: Request, response: Response) {
    const service = new ListUsersUsecase();

    const users = await service.execute();

    return response.status(200).json(users);
  }
}