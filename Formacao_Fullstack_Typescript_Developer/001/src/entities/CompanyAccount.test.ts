import { DioAccount } from "./DioAccount";
import { CompanyAccount } from "./CompanyAccount";
import { faker } from '@faker-js/faker/locale/pt_BR';

describe('DioAccount methods', () => {

	beforeEach(() => {
		jest.spyOn(DioAccount.prototype, 'validateStatus').mockReturnValue(true);
	})

	beforeEach(() => {
		jest.resetAllMocks();
	})

	it('should initiate account with 0 balance', () => {
		const account = new CompanyAccount(faker.person.fullName(), Number.parseInt(faker.finance.accountNumber()));

		expect(account.getBalance()).toBe(0);
	})

	it('should sum to the balance', () => {
		const account = new CompanyAccount(faker.person.fullName(), Number.parseInt(faker.finance.accountNumber()));

		const value = faker.number.int({min:1});
		account.deposit(value);
		expect(account.getBalance()).toBe(value);
	});

	it('should not sum to the balance when status=false', () => {
		const account = new CompanyAccount(faker.person.fullName(), Number.parseInt(faker.finance.accountNumber()));

		jest.spyOn(DioAccount.prototype, 'validateStatus').mockReturnValue(false);

		const value = faker.number.int();
		account.deposit(value);
		expect(account.getBalance()).toBe(0);
	});

	it('should not withdraw when balance=0', () => {
		const account = new CompanyAccount(faker.person.fullName(), Number.parseInt(faker.finance.accountNumber()));

		account.withdraw(10);
		expect(account.getBalance()).toBe(0);
	});

	it('should not withdraw when status=false', () => {
		const account = new CompanyAccount(faker.person.fullName(), Number.parseInt(faker.finance.accountNumber()));

		jest.spyOn(DioAccount.prototype, 'validateStatus').mockReturnValue(false);
		
		account.withdraw(10);
		expect(account.getBalance()).toBe(0);
	});

	it('should not withdraw when balance < withdraw value', () => {
		const account = new CompanyAccount(faker.person.fullName(), Number.parseInt(faker.finance.accountNumber()));

		const value = faker.number.int({min:1});
		account.deposit(value);
		
		const withdraw = faker.number.int({min: value});
		account.withdraw(withdraw);
		expect(account.getBalance()).toBe(value);
	});

	it('should withdraw and balance=0', () => {
		const account = new CompanyAccount(faker.person.fullName(), Number.parseInt(faker.finance.accountNumber()));

		const value = faker.number.int({min:1});
		account.deposit(value);
		
		account.withdraw(value);
		expect(account.getBalance()).toBe(0);
	});

	it('should withdraw and balance>0', () => {
		const account = new CompanyAccount(faker.person.fullName(), Number.parseInt(faker.finance.accountNumber()));

		const value = faker.number.int();
		account.deposit(value);
		
		const withdraw = faker.number.int({max: value -1});
		account.withdraw(withdraw);
		expect(account.getBalance()).toBe(value - withdraw);
	});


	it('should get loan and sum loan`s value to balance', () => {
		const account = new CompanyAccount(faker.person.fullName(), Number.parseInt(faker.finance.accountNumber()));

		const value = faker.number.int({min:1});
		const loan = faker.number.int({min:1});
		
		account.deposit(value);
		account.getLoan(loan);
		
		expect(account.getBalance()).toBe(value+loan);

	})


	it('should not get loan when status=false', () => {
		const account = new CompanyAccount(faker.person.fullName(), Number.parseInt(faker.finance.accountNumber()));

		
		const value = faker.number.int({min:1});
		const loan = faker.number.int({min:1});
		
		account.deposit(value);
		
		jest.spyOn(DioAccount.prototype, 'validateStatus').mockReturnValue(false);
		account.getLoan(loan);
		
		expect(account.getBalance()).toBe(value);

	})
})