import { Router } from 'express';

import { CreateAccountsController } from '../usecase/Accounts/CreateAccounts/CreateAccountsController';
import { ListAccountController } from '../usecase/Accounts/ListAccount/ListAccountController';
import { ListAllAccountsController } from '../usecase/Accounts/ListAllAccounts/ListAllAccountsController';

const accountsRoutes = Router();

accountsRoutes.post("", new CreateAccountsController().handle);
accountsRoutes.get("/list/:account_id", new ListAccountController().handle);
accountsRoutes.get("/list", new ListAllAccountsController().handle);

export { accountsRoutes }