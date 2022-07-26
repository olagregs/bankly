import { Request, Response } from "express";

import { ListAllAccountsUsecase } from "./ListAllAccountsUsecase";

export class ListAllAccountsController {
  async handle(request: Request, response: Response) {
    const service = new ListAllAccountsUsecase();

    const accounts = await service.execute();

    return response.status(200).json(accounts);
  }
}