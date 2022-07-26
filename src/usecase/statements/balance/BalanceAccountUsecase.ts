import { AppDataSource, createConnection } from "../../..";
import { Account } from "../../../entities/Account";
import { Statement } from "../../../entities/Statement";


export class BalanceAccountUsecase {
  async execute(account_id: string): Promise<Number> {
    await createConnection();

    const AccountRepository = AppDataSource.getRepository(Account);
    const statementRepository = AppDataSource.getRepository(Statement);

    const account = await AccountRepository.findOne({
      where: { id: account_id }
    });

    if (!account) {
      throw new Error("Invalid account id");
    }

    const statement = statementRepository.create({
      operation: "Balance",
      description: "Balance check",
      amount: account.balance,
      account_id,
      status: "Successful"
    });

    await statementRepository.save(statement);

    return account.balance;
  }
}