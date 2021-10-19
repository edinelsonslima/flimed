import { Request, Response, NextFunction } from 'express';
import { UserModel } from '../model/user.model';

async function UserExists(req: Request, res: Response, next: NextFunction) {
    const user = await UserModel.findOne({ user_id: req.params.user_id });
    if (user) return next();

    return res.status(404).json({ message: 'user not found' });
}

export { UserExists };
