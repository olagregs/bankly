import { AppDataSource, createConnection } from "../../..";
import { Account } from "../../../entities/Account";

export class ListAllAccountsUsecase {
  async execute(): Promise<Account[]> {
    await createConnection();

    const repository = AppDataSource.getRepository(Account);

    const accounts = await repository.find();

    return accounts;
  }
}