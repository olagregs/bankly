import { AppDataSource, createConnection } from "../../..";
import { Category } from "../../../entities/Category";

export class ListCategoriesUsecase {
  async execute(): Promise<Category[]> {
    await createConnection();

    const repository = AppDataSource.getRepository(Category);

    const categories = await repository.find();

    return categories;
  }
}