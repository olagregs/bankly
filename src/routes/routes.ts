import { Router } from 'express';

import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
import { accountsRoutes } from './accounts.routes';
import { authenticateRoutes } from './authenticate.routes';
import { categoriesRoutes } from './categories.routes';
import { statementsRoutes } from './statements.routes';

import { usersRoutes } from './users.routes';

const routes = Router();

routes.use("/users", usersRoutes);
routes.use("/categories", categoriesRoutes);
routes.use("/accounts", accountsRoutes);
routes.use("/authtenticate", authenticateRoutes);
routes.use("/statements", ensureAuthenticated, statementsRoutes);

export { routes }