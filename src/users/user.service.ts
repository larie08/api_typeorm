import bcrypt from 'bcryptjs';
import { AppDataSource } from '../_helpers/db';
import { User } from '../entity/user.entity';

export const userService = {
    getAll,
    getById,
    create,
    update,
    delete: _delete,
};

async function getAll() {
    const userRepository = AppDataSource.getRepository(User);
    return await userRepository.find();
}

async function getById(id: number) {
    return await getUser(id);
}

async function create(params: any) {
    const userRepository = AppDataSource.getRepository(User);

    if (await userRepository.findOne({ where: { email: params.email } })) {
        throw new Error(`Email "${params.email}" is already registered`);
    }

    const user = new User();
    Object.assign(user, params);

    user.passwordHash = await bcrypt.hash(params.password, 10);  

    await userRepository.save(user);
    return user;
}

async function update(id: number, params: any) {
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({ where: { id } });

    if (!user) throw new Error('User not found');

    const emailChanged = params.email && user.email !== params.email;

    if (emailChanged && await userRepository.findOne({ where: { email: params.email } })) {
        throw new Error(`Email "${params.email}" is already taken`);
    }

    if (params.password) {
        params.passwordHash = await bcrypt.hash(params.password, 10);
    }

    Object.assign(user, params);
    await userRepository.save(user);
}

async function _delete(id: number) {
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({ where: { id } });

    if (!user) throw new Error('User not found');

    await userRepository.remove(user);
}

async function getUser(id: number) {
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({ where: { id } });

    if (!user) throw new Error('User not found');
    return user;
}
