import { NextFunction, Request, Response } from 'express';
import { verifyJwtToken } from '../services/jwt';
import createHttpError from 'http-errors';

export const JWTVerify = (request: Request, response: Response, next: NextFunction) => {

	const token = request.headers.authorization;
	
	if (token === undefined)
		next(new createHttpError[403]('Invalid token'));
	else{
		response.locals.user = verifyJwtToken(token);
		next();
	}
	
};