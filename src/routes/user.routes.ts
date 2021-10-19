import { Router } from 'express';
import { UserExists } from '../middleware/user.middleware';
import * as user from '../controllers/user.controller';

const userRouter = Router();

userRouter.post('/', user.Create);
userRouter.get('/', user.ListAllUser);
userRouter.put('/:user_id', UserExists, user.Update);
userRouter.delete('/:user_id', UserExists, user.Delete);
userRouter.get('/:user_id', UserExists, user.ListOnlyUser);

export { userRouter };
