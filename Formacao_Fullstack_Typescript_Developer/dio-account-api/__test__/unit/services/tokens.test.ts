import { randomUUID } from 'crypto';
import { createJwtToken, verifyJwtToken } from '../../../src/services/jwt';
import jwt from 'jsonwebtoken';
import { JsonWebTokenError } from 'jsonwebtoken';

describe('jwt tokens', () => {
	let token: string;
	let payload: any;

	beforeAll(() => {
		payload = {
			id: randomUUID(),
			role: 'admin',	
		};
		token = createJwtToken(payload);
	});
	
	it('create valid token with payload', () => {
		expect(jwt.decode(token) as any).toMatchObject(payload);
	});

	it('verify an invalid token', () => {
		const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';

		expect(() => verifyJwtToken(token)).toThrow(JsonWebTokenError);
	});

	it('verify a valid token', () => {
		expect(verifyJwtToken(token)).toMatchObject(payload);
	});
});