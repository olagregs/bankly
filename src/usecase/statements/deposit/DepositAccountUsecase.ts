import { AppDataSource, createConnection } from "../../..";
import { Account } from "../../../entities/Account";
import { Statement } from "../../../entities/Statement";

interface IDeposit {
  description: string;
  amount: number;
  account_id: string;
}

export class DepositAccountUsecase {
  async execute({ description, amount, account_id }: IDeposit) {
    await createConnection();

    const statementsRepository = AppDataSource.getRepository(Statement);
    const accountRepository = AppDataSource.getRepository(Account);

    const account = await accountRepository.findOne({
      where: { id: account_id }
    });

    if (!account) {
      throw new Error("Invalid account id");
    }

    await accountRepository.update(account_id, {
      balance: account.balance + amount,
      updated_at: new Date()
    });

    const statement = statementsRepository.create({
      operation: "Deposit",
      description,
      amount,
      account_id,
      status: "Completed"
    });

    statementsRepository.save(statement);

    const operation = {
      transaction_id: statement.id,
      operation: statement.operation,
      status: statement.status
    }

    return operation;
  }
}