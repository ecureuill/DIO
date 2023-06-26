import jwt from 'jsonwebtoken';
import { jwtSecret, jwtSignOptions, jwtVerifyOptions } from '../config';

export const verifyJwtToken = (token: string) => {
	return jwt.verify(token.replace('Bearer ', ''), jwtSecret, jwtVerifyOptions) as jwt.JwtPayload;
};

export const createJwtToken = (payload: any) => {
	return jwt.sign({ 
		...payload
	}, jwtSecret, jwtSignOptions);
};