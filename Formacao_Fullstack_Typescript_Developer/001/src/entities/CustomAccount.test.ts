import { faker } from "@faker-js/faker/locale/pt_BR"
import { CustomAccount } from "./CustomAccount"

describe('CustomAccount', () => {

	it('should add 10 to the deposited value', () => {
		const account = new CustomAccount(faker.person.fullName(), Number.parseInt(faker.finance.accountNumber()));

		const value = faker.number.int({min: 1});
		account.deposit(value);
		expect(account.getBalance()).toBe(value+10)
	})
});