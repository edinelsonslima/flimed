import { Schema, model } from 'mongoose';
import { UserTypes } from '../@types/user.types';

const schema = new Schema<UserTypes>({
    user_id: { type: String, required: true },
    email: { type: String, required: true },
    senha: { type: String, required: true },
    senhaSemHash: {type: String}
});

export const UserModel = model<UserTypes>('User', schema);
