import { Router } from 'express';

import { BalanceAccountController } from '../usecase/statements/balance/BalanceAccountController';
import { DepositAccountController } from '../usecase/statements/deposit/DepositAccountController';
import { ReceiptAccountController } from '../usecase/statements/receipt/ReceiptAccountController';
import { TransferenceStatusController } from '../usecase/statements/transference status/TransferenceStatusController';
import { TransferAccountController } from '../usecase/statements/transference/TransferAccuntsController';
import { WithdrawAccountController } from '../usecase/statements/withdraw/WithdrawAccountController';

const statementsRoutes = Router();

statementsRoutes.patch("/deposit", new DepositAccountController().handle);
statementsRoutes.patch("/withdraw", new WithdrawAccountController().handle);
statementsRoutes.patch("/transfer", new TransferAccountController().handle);
statementsRoutes.get("/balance", new BalanceAccountController().handle);
statementsRoutes.get("/transference/status/:transaction_id", new TransferenceStatusController().handle);
statementsRoutes.get("/receipt", new ReceiptAccountController().handle);

export { statementsRoutes }