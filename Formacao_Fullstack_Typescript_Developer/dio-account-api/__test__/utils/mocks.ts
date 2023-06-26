import { Request, Response } from 'express';

export const getMockResponse = (): Partial<Response> => {
	return {
		locals: {},
		status: jest.fn().mockReturnThis(),
		json: jest.fn().mockReturnThis(),
		send: jest.fn().mockReturnThis()
	};
};

export const getMockRequest = () : Partial<Request> => {
	return {
		params:{},
		headers:{},
		body:{}
	};
};