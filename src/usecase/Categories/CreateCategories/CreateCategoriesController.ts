import { Request, Response } from "express";
import { CreateCategoriesUsecase } from "./CreateCategoriesUsecase";

export class CreateCategoriesController {
  async handle(request: Request, response: Response) {
    const { account_type } = request.body;

    const service = new CreateCategoriesUsecase();


    try {
      const category = await service.execute(account_type);

      return response.status(201).json(category);
    } catch (err) {
      return response.status(400).json({
        message: err.message
      })
    }

  }
}