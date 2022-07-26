import { AppDataSource, createConnection } from "../../..";
import { Statement } from "../../../entities/Statement";

export class TransferenceStatusUsecase {
  async execute(transaction_id: string): Promise<String> {
    await createConnection();

    const repository = AppDataSource.getRepository(Statement);

    const transaction = await repository.findOne({
      where: { id: transaction_id }
    });

    if (!transaction) {
      throw new Error("Invalid transaction id");
    }

    const statement = repository.create({
      operation: "Validation",
      description: "Transaction validation",
      amount: transaction.amount,
      account_id: transaction.account_id,
      status: "Successful"
    });

    repository.save(statement);

    return statement.status;
  }
}