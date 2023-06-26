import createHttpError from 'http-errors';
import { HTTP_RESPONSE } from '../consts';

export class MethodNotAllowedError extends createHttpError['MethodNotAllowed']{
	
	constructor(action: 'PUT' | 'PATCH' | 'DELETE' | 'POST'){
		super(`${action} is not allowed`);

		this.name = 'MethodNotAllowedError';
		this.statusCode = HTTP_RESPONSE.MethodNotAllowed;
		Object.setPrototypeOf(this, MethodNotAllowedError.prototype);
	}
}

export class BadRequestError extends createHttpError['BadRequest']{
	
	constructor(message: string){
		super(message);

		this.name = 'BadRequestError';
		this.statusCode = HTTP_RESPONSE.BadRequest;
		Object.setPrototypeOf(this, BadRequestError.prototype);
	}
}

export class ForbiddenError extends createHttpError['Forbidden']{
	
	constructor(){
		super('This action is not authorized');

		this.name = 'ForbiddenError';
		this.statusCode = HTTP_RESPONSE.Forbidden;
		Object.setPrototypeOf(this, ForbiddenError.prototype);
	}
}
