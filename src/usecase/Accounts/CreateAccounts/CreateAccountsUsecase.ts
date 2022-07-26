import { hash } from "bcryptjs";

import { AppDataSource, createConnection } from "../../..";
import { Account } from "../../../entities/Account";
import { Category } from "../../../entities/Category";
import { User } from "../../../entities/User";

interface ICreateAccount {
  user_id: string;
  category_id: string;
  password: string;
}

export class CreateAccountsUsecase {
  async execute({ user_id, category_id, password }: ICreateAccount): Promise<Account> {
    await createConnection();

    const accoutsRepository = AppDataSource.getRepository(Account);
    const usersRepository = AppDataSource.getRepository(User);
    const categoriesRepository = AppDataSource.getRepository(Category);

    const userExists = await usersRepository.findOne({
      where: { id: user_id }
    });

    if (!userExists) {
      throw new Error("Invalid user id");
    }

    const accountExists = await accoutsRepository.findOne({
      where: { user_id }
    });

    if (accountExists) {
      throw new Error("Account already Exists");
    }

    const categoryExists = await categoriesRepository.findOne({
      where: { id: category_id }
    });

    if (!categoryExists) {
      throw new Error("Invalid category id");
    }

    const encryptedPassword = await hash(password, 8);

    const account = accoutsRepository.create({
      user_id,
      category_id,
      balance: 0,
      password: encryptedPassword
    });

    await accoutsRepository.save(account);

    return account;
  }
}