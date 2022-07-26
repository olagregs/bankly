import { AppDataSource, createConnection } from "../../..";
import { Account } from "../../../entities/Account";

export class ListAccountUsecase {
  async execute(account_id: string): Promise<Account> {
    await createConnection();

    const repository = AppDataSource.getRepository(Account);

    const account = await repository.findOne({
      where: { id: account_id }
    })

    if (!account) {
      throw new Error("Account not found");
    }

    return account;
  }
}