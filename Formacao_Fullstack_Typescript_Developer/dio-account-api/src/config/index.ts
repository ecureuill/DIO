import { Secret, SignOptions, VerifyOptions } from 'jsonwebtoken';
import { DataSourceOptions } from 'typeorm';

const dotenv = require('dotenv-safe');
dotenv.config({
	example: '.env.template',
	allowEmptyValues: false,
});

export const isTestEnv = process.env.NODE_ENV === 'test';
export const PORT = isTestEnv? process.env.TEST_PORT: process.env.DEV_PORT;

export const jwtSecret: Secret = process.env.SECRET || '';

export const jwtSignOptions: SignOptions = {
	algorithm: 'HS256',
	expiresIn: '1m',
};

export const jwtVerifyOptions: VerifyOptions = {
	algorithms: ['HS256'],
};

export const dataSouceOptions: DataSourceOptions = {	
	type: 'sqlite',
	database: `./src/database/${isTestEnv? 'database.test.sqlite': 'database.sqlite'}`,
	logging: false,
	entities: ['./src/entities/*.ts'],
	migrations: ['./src/database/migration/*.ts'],
	synchronize: isTestEnv,
};