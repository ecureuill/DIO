import { dataSource } from '../database/datasource/data-source';
import { User } from '../entities/User';
import { passwordCompareHash, passwordToHash } from '../services/passwords';
import { EntityNotFoundError, QueryFailedError } from 'typeorm';
import { SignInLoginError, SignUPEmailError } from '../utils/errors/business.errors';
import { createJwtToken } from '../services/jwt';

export default class UserController  {

	async auth(email: string, password: string){
		let entity;

		try{
			entity = await User.findOneByOrFail({
				email: email,
			});
		}
		catch (err){
			if(err instanceof EntityNotFoundError)
				throw new SignInLoginError();
			
			throw err;
		}
		
		if(!passwordCompareHash(password, entity.password))
			throw new SignInLoginError();

		return {
			user: entity,
			token: createJwtToken({id: entity.id, email: entity.email})
		};
	}

	async create(user: User) {
		user.password = passwordToHash(user.password);
		
		try{
			await User.save(user);
		}
		catch (err){
			if(err instanceof QueryFailedError && err.message.startsWith('duplicate key value violates unique constraint'))
				throw new SignUPEmailError();
			throw err;
		}

		return user;
	}

	async getAll() {
		const [users, count] = await User.findAndCount();
		return { 
			entities: users,
			count: count
		}
	}

	async getOneByCPF(cpf: string) {
		return await User.findOneBy({
			cpf: cpf
		});
	}

	async updateAll(entity: User, id: string) {
		entity.password = passwordToHash(entity.password);
		return await User.save(entity);
	}

	async delete(id: string) {
		const user = await User.findOneByOrFail({id: id});
		return await User.remove(user);
	}
}