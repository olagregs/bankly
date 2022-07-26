import { AppDataSource, createConnection } from "../../..";
import { Statement } from "../../../entities/Statement";

export class ReceiptAccountUsecase {
  async execute(account_id: string): Promise<Statement[]> {
    await createConnection();

    const repository = AppDataSource.getRepository(Statement);

    const receipts = await repository.find({
      where: { account_id }
    });

    const lastOperation = receipts[receipts.length - 1];

    const statement = repository.create({
      operation: "Receipt",
      description: "Account receipt",
      amount: lastOperation.amount,
      account_id,
      status: "Successful"
    });

    repository.save(statement);

    return receipts;
  }
}