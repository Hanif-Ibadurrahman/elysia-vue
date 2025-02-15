import Elysia from 'elysia';

import { FolderController } from './folders/infrastructure/folder.controller';

const routes = new Elysia({ prefix: 'api/v1' }).use(FolderController);

export { routes as AppRoutes };
