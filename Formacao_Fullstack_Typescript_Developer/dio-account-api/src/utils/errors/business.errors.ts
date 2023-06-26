import { HTTP_RESPONSE } from '../consts';
import BaseError from './BaseError';


export class SignUPEmailError extends BaseError{
	
	constructor(){
		super('Email already exist');

		this.name = 'SignUPEmailError';
		this.statusCode = HTTP_RESPONSE.BadRequest;
		Object.setPrototypeOf(this, SignUPEmailError.prototype);
	}
	
}

export class SignInLoginError extends BaseError{
	
	constructor(){
		super('Invalid credentials');

		this.name = 'SignInLoginError';
		this.statusCode = HTTP_RESPONSE.Unauthorized;
		Object.setPrototypeOf(this, SignInLoginError.prototype);
	}
	
}