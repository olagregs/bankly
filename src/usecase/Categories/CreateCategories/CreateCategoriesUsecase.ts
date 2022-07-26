import { AppDataSource, createConnection } from "../../..";
import { Category } from "../../../entities/Category";

export class CreateCategoriesUsecase {
  async execute(account_type: string): Promise<Category> {
    await createConnection();

    const repository = AppDataSource.getRepository(Category);

    const categoryAlreadyExists = await repository.findOne({
      where: { account_type }
    });

    if (categoryAlreadyExists) {
      throw new Error("Category already exists")
    }

    const category = repository.create({
      account_type
    });

    await repository.save(category);

    return category;
  }
}