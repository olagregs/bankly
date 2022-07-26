import { Request, Response } from "express";

import { ListCategoriesUsecase } from "./ListCategoriesUsecase";

export class ListCategoriesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const service = new ListCategoriesUsecase();

    const categories = await service.execute();

    return response.status(200).json(categories);
  }
}