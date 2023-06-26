import { faker } from '@faker-js/faker/locale/pt_BR';
import { randomUUID } from 'crypto';
import { NextFunction, Request, Response } from 'express';
import UserController from '../../../src/controllers/user.controller';
import { User } from '../../../src/entities/User';
import UserRouter from '../../../src/routers/user.router';
import { HTTP_RESPONSE } from '../../../src/utils/consts';
import { generateUserData, generateUsersData } from '../../utils/generate';
import { getMockRequest, getMockResponse } from '../../utils/mocks';

describe('User router', () => {
	let controller: jest.SpyInstance;
	let mockResponse: Partial<Response>;
	let mockRequest: Partial<Request>;
	let mockNext: NextFunction;

	beforeEach(() => {
		mockRequest = getMockRequest();
		mockResponse = getMockResponse();
		mockNext = jest.fn();
	});

	afterEach(() => {
		jest.restoreAllMocks();
	});

	describe('auth', () => {

		afterEach(() => {
			controller.mockRestore();
		});

		it('should call with OK and result on auth', async () => {

			const result = { 
				token: faker.string.alphanumeric(),
				user: generateUserData()
			};

			controller = jest.spyOn(UserController.prototype, 'auth').mockResolvedValueOnce(result);

			mockRequest.body = {
				email: faker.internet.email(),
				password: faker.internet.password()
			};

			const router = new UserRouter();
			const res = await router.auth(mockRequest as Request, mockResponse as Response, mockNext);

			expect(controller).toHaveBeenCalledTimes(1);
			expect(controller).toHaveBeenCalledWith(mockRequest.body.email, mockRequest.body.password);
			expect(res!.json).toHaveBeenCalledWith(result);
			expect(res!.status).toHaveBeenCalledWith(HTTP_RESPONSE.OK);
		});

		it('should call with CREATED and result on create', async () => {

			const request = {
				name: faker.name.fullName(),
				email: faker.internet.email(),
				password: faker.internet.password(),
				cpf: faker.string.numeric(11)
			};

			const result = {
				id: randomUUID(),
				...request
			};

			controller = jest.spyOn(UserController.prototype, 'create').mockResolvedValueOnce(result as User);
			mockRequest.body = request;

			const router = new UserRouter();
			const res = await router.create(mockRequest as Request, mockResponse as Response, mockNext);

			expect(controller).toHaveBeenCalledTimes(1);
			expect(controller).toHaveBeenCalledWith(request);
			expect(res!.json).toHaveBeenCalledWith(result);
			expect(res!.status).toHaveBeenCalledWith(HTTP_RESPONSE.Created);
		});
	});

	describe('getAll', () => {
		afterEach(() => {
			controller.mockRestore();
		});

		it('should call with OK when result=[] on getAll', async () => {
			const result = {
				entities: [] as User[],
				count: 0
			};

			controller = jest.spyOn(UserController.prototype, 'getAll').mockResolvedValueOnce(result);
			
			const router = new UserRouter();
			const res = await router.getAll(mockRequest as Request, mockResponse as Response, mockNext);

			expect(controller).toHaveBeenCalledTimes(1);
			expect(res!.json).toHaveBeenCalledWith(result);
			expect(res!.status).toHaveBeenCalledWith(HTTP_RESPONSE.OK);
		});

		it('should call with OK and list entities on getall', async () => {
			const result = {
				entities: generateUsersData() as User[],
				count: 1
			};

			controller = jest.spyOn(UserController.prototype, 'getAll').mockResolvedValueOnce(result);

			const router = new UserRouter();
			const res = await router.getAll(mockRequest as Request, mockResponse as Response, mockNext);

			expect(controller).toHaveBeenCalledTimes(1);
			expect(res!.json).toHaveBeenCalledWith(result);
			expect(res!.status).toHaveBeenCalledWith(HTTP_RESPONSE.OK);
		});
	});

	describe('getOneByCPF', () => {
		afterEach(() => {
			controller.mockRestore();
		});

		it('should call with OK on getOneById', async () => {
			const result = generateUserData();

			controller = jest.spyOn(UserController.prototype, 'getOneByCPF').mockResolvedValueOnce(result as User);
			mockRequest.params = {cpf: faker.string.numeric(11)};

			const router = new UserRouter();
			const res = await router.getOneByCPF(mockRequest as Request, mockResponse as Response, mockNext);

			expect(controller).toHaveBeenCalledTimes(1);
			expect(controller).toHaveBeenCalledWith(mockRequest.params.cpf);
			expect(res!.json).toHaveBeenCalledWith(result);
			expect(res!.status).toHaveBeenCalledWith(HTTP_RESPONSE.OK);
		});
	});

	describe('updateAll', () => {
		afterEach(() => {
			controller.mockRestore();
		});

		it('should call with OK on updateAll', async () => {
			const result = generateUserData();

			controller = jest.spyOn(UserController.prototype, 'updateAll').mockResolvedValueOnce(result as User);

			mockRequest.params = {id: randomUUID()};

			mockRequest.body = result;

			const router = new UserRouter();
			const res = await router.updateAll(mockRequest as Request, mockResponse as Response, mockNext);

			expect(controller).toHaveBeenCalledTimes(1);
			expect(controller).toHaveBeenCalledWith(mockRequest.body, mockRequest.params.id);
			expect(res!.json).toHaveBeenCalledWith(result);
			expect(res!.status).toHaveBeenCalledWith(HTTP_RESPONSE.OK);
		});
	});

	describe('delete', () => {
		afterEach(() => {
			controller.mockRestore();
		});

		it('should call with OK on delete', async () => {
			const result = generateUserData();

			controller = jest.spyOn(UserController.prototype, 'delete').mockResolvedValueOnce(result as User);

			mockRequest.params = {id: randomUUID()};

			const router = new UserRouter();
			const res = await router.delete(mockRequest as Request, mockResponse as Response, mockNext);

			expect(controller).toHaveBeenCalledTimes(1);
			expect(controller).toHaveBeenCalledWith(mockRequest.params.id);
			expect(res!.json).toHaveBeenCalledWith(result);
			expect(res!.status).toHaveBeenCalledWith(HTTP_RESPONSE.OK);
		});
	});
});