import { HTTP_RESPONSE } from '../../../../src/utils/consts';
import BaseError from '../../../../src/utils/errors/BaseError';
import { SignInLoginError, SignUPEmailError } from '../../../../src/utils/errors/business.errors';
import { MisconfiguredError, MisconfiguredSchemaError, NotImplementedError } from '../../../../src/utils/errors/code.errors';
import { BadRequestError, ForbiddenError, MethodNotAllowedError } from '../../../../src/utils/errors/http.errors';

describe('BaseError errors', () => {

	test.each([
		['BaseError', BaseError, 'This is an BaseError', HTTP_RESPONSE.InternalServerError],
		['SignUPEmailError', SignUPEmailError, 'Email already exist', HTTP_RESPONSE.BadRequest],
		['SignInLoginError', SignInLoginError, 'Invalid credentials', HTTP_RESPONSE.Unauthorized],
		['NotImplementedError', NotImplementedError, 'Not implemented!', HTTP_RESPONSE.InternalServerError],
	])('Should be an instance of %s', (key, errorClass, message, statusCode) => {
		const error = new errorClass(message);
		expect(error).toBeInstanceOf(errorClass);
		expect(error.name).toBe(key);
		expect(error.message).toBe(message);
		expect(error.statusCode).toBe(statusCode);
	});

	test.each([
		['MisconfiguredError', MisconfiguredError, 'setting', ' are misconfigured', HTTP_RESPONSE.InternalServerError],
		['MisconfiguredSchemaError', MisconfiguredSchemaError, 'baseSchema', ': Schema not founded', HTTP_RESPONSE.InternalServerError],
	])('Should be an instance of %s', (key, errorClass, argument, message, statusCode) => {
		const error = new errorClass(argument);
		expect(error).toBeInstanceOf(errorClass);
		expect(error.name).toBe(key);
		expect(error.message).toBe(`${argument}${message}`);
		expect(error.statusCode).toBe(statusCode);
	});
});

describe('extended createHttpError errors', () => {

	test.each([
		['BadRequestError', BadRequestError, 'This is a BadRequestError', HTTP_RESPONSE.BadRequest],
	
	])('Should be an instance of %s', (key, errorClass, message, statusCode) => {
		const error = new errorClass(message);
		
		expect(error).toBeInstanceOf(errorClass);
		expect(error.name).toBe(key);
		expect(error.message).toBe(message);
		expect(error.statusCode).toBe(statusCode);
	});

	test.each([
		['ForbiddenError', ForbiddenError, null, 'This action is not authorized', HTTP_RESPONSE.Forbidden],
		['MethodNotAllowedError', MethodNotAllowedError, 'DELETE', 'DELETE is not allowed', HTTP_RESPONSE.MethodNotAllowed],
	])('Should be an instance of %s', (key, errorClass, argument, message, statusCode) => {
		
		let error;
		if(argument === null)
			error = new errorClass();
		else
			error = new errorClass(argument as any);
		
		expect(error).toBeInstanceOf(errorClass);
		expect(error.name).toBe(key);
		expect(error.message).toBe(message);
		expect(error.statusCode).toBe(statusCode);
	});
});