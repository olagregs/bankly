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
  async execute({ account_id, password }: IAuth): Promise<string> {
    await createConnection();

    const accountRepository = AppDataSource.getRepository(Account);
    const statementsRepository = AppDataSource.getRepository(Statement);

    const account = await accountRepository.findOne({
      where: { id: account_id }
    });

    if (!account) {
      throw new Error("Acount number or password incorrect1");
    }

    const validadePassword = await compare(password, account.password);

    if (!validadePassword) {
      throw new Error("Acount number or password incorrect2");
    }

    const token = sign({}, "583cb424ed6f4fb142cceaf90941eea1", {
      subject: account_id,
      expiresIn: "30m"
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