import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import { AppDataSource, createConnection } from "../..";
import { Account } from "../../entities/Account";
import { Statement } from '../../entities/Statement';

interface IAuth {
  account_id: string;
  password: string;
}

export class AuthenticateUserUsecase {
  async execute({ account_id, password }: IAuth): Promise<String> {
    await createConnection();

    const accountRepository = AppDataSource.getRepository(Account);
    const statementsRepository = AppDataSource.getRepository(Statement);

    const account = await accountRepository.findOne({
      where: { id: account_id }
    });

    if (!account) {
      throw new Error("Account number or password incorrect");
    }

    const validadePassword = await compare(password, account.password);

    if (!validadePassword) {
      throw new Error("Account number or password incorrect");
    }

    const token = sign({}, "583cb424ed6f4fb142cceaf90941eea1", {
      subject: account_id,
      expiresIn: "10m"
    });

    const statement = statementsRepository.create({
      operation: "Connection",
      description: "Account connection",
      amount: account.balance,
      account_id,
      status: "Successful"
    });

    statementsRepository.save(statement);

    return token;
  }
}