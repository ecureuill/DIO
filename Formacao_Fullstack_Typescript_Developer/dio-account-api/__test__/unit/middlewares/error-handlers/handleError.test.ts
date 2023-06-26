import { NextFunction, Request, Response } from 'express';
import createHttpError from 'http-errors';
import { handleError } from '../../../../src/middlewares/errors-handlers/errorHandler.middleware';
import { HTTP_RESPONSE } from '../../../../src/utils/consts';
import BaseError from '../../../../src/utils/errors/BaseError';
import { getMockRequest, getMockResponse } from '../../../utils/mocks';

describe('Error handler middleware', () => {
	let mockRequest: Partial<Request>;
	let mockResponse: Partial<Response>;
	const nextFunction: NextFunction = jest.fn();

	beforeEach(() => {
		mockRequest = getMockRequest();
		mockResponse = getMockResponse();
	});

	it('handle Http-Error', async () => {
		const error = new createHttpError.BadGateway('teste');
		const err = {
			message: error.message,
			error_name: error.name,
			error_msg: error.message,
		};

		handleError(
			error,
			mockRequest as Request,
			mockResponse as Response,
			nextFunction
		);

		expect(mockResponse.status).toHaveBeenCalledWith(502);
		expect(mockResponse.json).toHaveBeenCalledWith(err);
		expect(nextFunction).not.toHaveBeenCalled();
	});
	
	it('handle Node Error without message and number status', async () => {
		const error = new Error();

		const err = {
			message: 'Something went wrong!',
			error_name: error.name,
			error_msg: error.message,
		};

		handleError(
			error,
			mockRequest as Request,
			mockResponse as Response,
			nextFunction
		);

		expect(mockResponse.status).toHaveBeenCalledWith(HTTP_RESPONSE.InternalServerError);
		expect(mockResponse.json).toHaveBeenCalledWith(err);
		expect(nextFunction).not.toHaveBeenCalled();
	});

	it('handle BaseError', async () => {
		const error = new BaseError('base error');

		const err = {
			message: 'base error',
			error_name: 'BaseError',
			error_msg: 'base error',
		};

		handleError(
			error,
			mockRequest as Request,
			mockResponse as Response,
			nextFunction
		);

		expect(mockResponse.status).toHaveBeenCalledWith(HTTP_RESPONSE.InternalServerError);
		expect(mockResponse.json).toHaveBeenCalledWith(err);
		expect(nextFunction).not.toHaveBeenCalled();
	});
});