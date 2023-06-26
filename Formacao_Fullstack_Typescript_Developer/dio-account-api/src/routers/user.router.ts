import { NextFunction, Request, Response } from 'express';
import Flatted from 'flatted';
import UserController from '../controllers/user.controller';

export default class UserRouter {
	async auth(request: Request, response: Response, next: NextFunction){
		try{
			const controller = new UserController();

			const { email, password } = request.body;

			const result = await controller.auth(email, password);

			return response.status(200).json(Flatted.parse(Flatted.stringify(result)));
		}
		catch (error) {
			next(error);
		}
	}

	async create(request: Request, response: Response, next: NextFunction){
		try{
			const controller = new UserController();

			const result = await controller.create(request.body);

			return response.status(201).json(Flatted.parse(Flatted.stringify(result)));
		}
		catch (error) {
			next(error);
		}
	
	}

	async getAll(request: Request, response: Response, next:NextFunction){
		try{
			const controller = new UserController();
		
			const result = await controller.getAll();
		
			return response.status(200).json(Flatted.parse(Flatted.stringify(result)));
		}
		catch (error) {
			next(error);
		}
	}

	async getOneByCPF(request: Request, response: Response, next: NextFunction){

		try{
			const controller = new UserController();

			const { cpf } = request.params;

			const result = await controller.getOneByCPF(cpf);

			return response.status(200).json(Flatted.parse(Flatted.stringify(result)));
		}
		catch (error) {
			next(error);
		}
	}

	async updateAll(request: Request, response: Response, next: NextFunction){
		try{
			const controller = new UserController();

			const { id } = request.params;

			const result = await controller.updateAll(request.body, id);

			return response.status(200).json(Flatted.parse(Flatted.stringify(result)));
		}
		catch (error) {
			next(error);
		}
	}

	async delete(request: Request, response: Response, next: NextFunction) {
		try{
			const controller = new UserController();

			const { id } = request.params;

			const result = await controller.delete(id);

			return response.status(200).json(Flatted.parse(Flatted.stringify(result)));
		}
		catch (error) {
			next(error);
		}
	}

}