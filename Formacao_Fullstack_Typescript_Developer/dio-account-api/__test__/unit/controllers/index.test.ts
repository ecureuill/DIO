import { faker } from '@faker-js/faker/locale/pt_BR';
import { randomUUID } from 'crypto';
import { EntityNotFoundError, QueryFailedError, TypeORMError } from 'typeorm';
import { User } from '../../../src/entities/User';
import { passwordToHash } from '../../../src/services/passwords';
import { generateUserData } from '../../utils/generate';
import { SignInLoginError } from '../../../src/utils/errors/business.errors';
import UserController from '../../../src/controllers/user.controller';
import { verifyJwtToken } from '../../../src/services/jwt';

describe('User Controller', () => {
	let findOneByOrFail: jest.SpyInstance;
	let save: jest.SpyInstance;
	let update: jest.SpyInstance;
	let findAndCount: jest.SpyInstance;
	let remove: jest.SpyInstance;

	beforeEach(() => {
		findOneByOrFail = jest.spyOn(User, 'findOneByOrFail');
		save = jest.spyOn(User, 'save');
		update = jest.spyOn(User, 'update');
		findAndCount = jest.spyOn(User, 'findAndCount');
		remove = jest.spyOn(User, 'remove');
	});
	
	afterEach(() => {
		jest.restoreAllMocks();
	});

	describe('auth', () => {
		it('should authenticate', async () => {
			const email = faker.internet.email();
			const password = faker.internet.password();

			findOneByOrFail.mockResolvedValue( generateUserData({email: email, password: passwordToHash(password)}));

			const controller = new UserController();
			const result = await controller.auth(email, password);
			
			expect(() => verifyJwtToken(result.token)).not.toThrow();
			expect(findOneByOrFail).toBeCalled();

		});

		it('should not authenticate: e-mail', async () => {
			const email = faker.internet.email();
			const password = faker.internet.password();

			findOneByOrFail.mockRejectedValue(new EntityNotFoundError(User, 'email'));

			const controller = new UserController();
			const result = controller.auth(email, password);
			
			await expect(result).rejects.toThrow(SignInLoginError);
			expect(findOneByOrFail).toBeCalled();

		});

		it('should not authenticate: password', async () => {
			const email = faker.internet.email();
			const password = faker.internet.password();

			findOneByOrFail.mockResolvedValue( generateUserData({email: email, password: passwordToHash(faker.internet.password())}));

			const controller = new UserController();
			const result = controller.auth(email, password);
			
			await expect(result).rejects.toThrow(SignInLoginError);
			expect(findOneByOrFail).toBeCalled();

		});
	});

	describe('create', () => {
		it('should create', async () => {
			const body = {
				name: faker.name.fullName(),
				email: faker.internet.email(),
				password: faker.internet.password(),
			};

			save.mockResolvedValue(generateUserData({email: body.email, password: passwordToHash(body.password), name: body.name}));
			
			const controller = new UserController();
			const result = await controller.create(body as User);
			
			expect(result).toMatchObject(body);

		});

		it('should not create: e-mail', async () => {
			const body = {
				name: faker.name.fullName(),
				email: 'already-existed@mail.com',
				password: faker.internet.password(),
			};

			save.mockRejectedValue(new TypeORMError())
			const controller = new UserController();
			const result = controller.create(body as User);
			
			await expect(result).rejects.toThrow(TypeORMError);
		});
	});

	describe('updateAll', () => {

		it('should udpate', async () => {
			const user = generateUserData();

			save.mockResolvedValue(user);
			const controller = new UserController();

			const result = await controller.updateAll(user as User, user.id);

			expect(result).toEqual(user);
			expect(save).toHaveBeenCalled();
		});
	});

	describe('delete', () => {
		it('should delete', async () => {
			const user = generateUserData();
			findOneByOrFail.mockResolvedValue(user);
			
			remove.mockResolvedValue(user);
			const controller = new UserController();
			await controller.delete(randomUUID());

			expect(remove).toHaveBeenCalled();
		});
	});
});
