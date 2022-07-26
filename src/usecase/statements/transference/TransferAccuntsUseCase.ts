import { v4 as uuid } from 'uuid';

import { AppDataSource, createConnection } from "../../..";
import { Account } from "../../../entities/Account";
import { Statement } from "../../../entities/Statement";

interface ICreateStatement {
  description: string;
  amount: number;
  origin_account_id: string;
  destination_account_id: string;
}

interface ITransfer {
  originAccount: Account,
  destinationAccount: Account,
  amount: number
}

async function transfer({ originAccount, destinationAccount, amount }: ITransfer): Promise<void> {
  const accountRepository = AppDataSource.getRepository(Account);

  await accountRepository.update(originAccount.id, {
    balance: originAccount.balance - amount,
    updated_at: new Date()
  });

  await accountRepository.update(destinationAccount.id, {
    balance: destinationAccount.balance + amount,
    updated_at: new Date()
  });
}

export class TransferAccuntsUseCase {
  async execute({ description, amount, origin_account_id, destination_account_id }: ICreateStatement): Promise<String> {
    await createConnection();

    const statementsRepository = AppDataSource.getRepository(Statement);
    const accountRepository = AppDataSource.getRepository(Account);

    if (origin_account_id === destination_account_id) {
      throw new Error("You cannot make a transference for yourself");
    }

    const originAccount = await accountRepository.findOne({
      where: { id: origin_account_id }
    });

    if (originAccount.balance < amount) {
      throw new Error("Insuficient founds");
    }

    const destinationAccount = await accountRepository.findOne({
      where: { id: destination_account_id }
    });

    if (!destinationAccount) {
      throw new Error("Destination account is not valid");
    }

    transfer({ originAccount, destinationAccount, amount });

    const transactionId = uuid();

    const originStatement = statementsRepository.create({
      id: transactionId + "-s",
      operation: "Transference done",
      description: description,
      amount,
      account_id: origin_account_id,
      status: "completed"
    });

    const destinationStatement = statementsRepository.create({
      id: transactionId + "-r",
      operation: "Transference Received",
      description: description,
      amount,
      account_id: destination_account_id,
      status: "completed"
    });

    await statementsRepository.save(originStatement);
    await statementsRepository.save(destinationStatement);

    return originStatement.id;
  }
} 