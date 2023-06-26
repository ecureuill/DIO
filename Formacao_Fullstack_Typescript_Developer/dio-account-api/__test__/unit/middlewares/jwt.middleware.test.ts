import { randomUUID } from 'crypto';
import { JWTVerify } from '../../../src/middlewares/jwt.middleware';
import { NextFunction, Request, Response } from 'express';
import { faker } from '@faker-js/faker/locale/pt_BR';
import { getMockRequest, getMockResponse } from '../../utils/mocks';
import { createJwtToken } from '../../../src/services/jwt';
import createHttpError from 'http-errors';

describe('JWTVerify middleware', () => {
	let mockRequest: Partial<Request>;
	let mockResponse: Partial<Response>;
	let nextFunction: NextFunction;

	beforeEach(() => {
		mockRequest = getMockRequest();
		mockResponse = getMockResponse();
		nextFunction = jest.fn();
	});

	it('Without authorization header', async () =>{
		mockRequest = {
			headers: {
			}
		};

		JWTVerify(mockRequest as Request, mockResponse as Response, nextFunction);
		expect(nextFunction).toBeCalledWith(createHttpError[403]('Invalid token'));
	});

	it('with malformed authorization header', async () =>{
		
		mockRequest = {
			headers: {
				authorization: `Bearer ${faker.random.alphaNumeric()}` 
			}
		};

		expect(() => JWTVerify(mockRequest as Request, mockResponse as Response, nextFunction)).toThrow('jwt malformed');
		expect(nextFunction).not.toBeCalled();
	});

	it('with authorization header', async () =>{
		const id = randomUUID();
		mockRequest = {
			headers: {
				authorization: `Bearer ${createJwtToken({any: 'thing'})}`
			}
		};

		JWTVerify(mockRequest as Request, mockResponse as Response, nextFunction);

		expect(mockResponse.locals!.user).not.toBeUndefined();
		expect(mockResponse.locals!.user).toMatchObject({
			any: 'thing'
		});
		expect(nextFunction).toHaveBeenCalledTimes(1);
	});
});