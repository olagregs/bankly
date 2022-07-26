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

export class TransferAccuntsUseCase {
  async execute({ description, amount, origin_account_id, destination_account_id }: ICreateStatement): Promise<string> {
    await createConnection();

    const statementsRepository = AppDataSource.getRepository(Statement);
    const accountRepository = AppDataSource.getRepository(Account);

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

    await accountRepository.update(origin_account_id, {
      balance: originAccount.balance - amount,
      updated_at: new Date()
    });

    await accountRepository.update(destination_account_id, {
      balance: destinationAccount.balance + amount,
      updated_at: new Date()
    });

    const transactionId = uuid();

    const originStatement = statementsRepository.create({
      id: transactionId + "-s",
      operation: "Transference",
      description: description,
      amount,
      account_id: origin_account_id,
      status: "completed"
    });

    const destinationStatement = statementsRepository.create({
      id: transactionId + "-r",
      operation: description,
      description: "Received transaction",
      amount,
      account_id: destination_account_id,
      status: "completed"
    });

    await statementsRepository.save(originStatement);
    await statementsRepository.save(destinationStatement);

    return originStatement.id;
  }
} 