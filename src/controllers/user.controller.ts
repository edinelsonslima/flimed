import {Request, Response } from 'express';
import { UserModel } from '../model/user.model';
import { UserTypes } from '../@types/user.types';
import { hash } from 'bcrypt';

async function Create(req: Request, res: Response) {
    let userEmail = await UserModel.findOne({ email: req.body.email });
    let userId = await UserModel.findOne({ user_id: req.body.user_id });

    if (userEmail)
        return res.status(409).json({ message: 'email already registered' });
    if (userId)
        return res.status(409).json({ message: 'user already registered' });

    const passHash = await hash(req.body.senha, 8);
    const data: object = {
        user_id: req.body.user_id,
        email: req.body.email,
        senha: passHash,
        senhaSemHash: req.body.senha,
    };

    const user = await UserModel.create(data);
    return res.status(201).json(user);
}

async function Delete(req: Request, res: Response) {
    const user = await UserModel.findOneAndDelete({
        user_id: req.params.user_id,
    });
    return res.status(200).json(user);
}

async function Update(req: Request, res: Response) {
    const userFindPass: UserTypes = await UserModel.findOne({
        user_id: req.params.user_id,
    });
    let passHash = userFindPass.senha;

    //Se existir uma senha no body ele atualiza com nova senha
    if (req.body.senha) passHash = await hash(req.body.senha, 8);

    const user = await UserModel.findOneAndUpdate(
        { user_id: req.params.user_id },
        {
            email: req.body.email,
            senha: passHash,
            senhaSemHash: req.body.senha,
        },
        { new: true }
    );
    return res.status(200).json(user);
}

async function ListOnlyUser(req: Request, res: Response) {
    const user = await UserModel.findOne({ user_id: req.params.user_id });
    return res.status(200).json(user);
}

async function ListAllUser(req: Request, res: Response) {
    const user = await UserModel.find();
    if (user) return res.status(200).json(user);

    res.status(404).json({ message: 'user not found' });
}

export { Create, Delete, Update, ListOnlyUser, ListAllUser };
