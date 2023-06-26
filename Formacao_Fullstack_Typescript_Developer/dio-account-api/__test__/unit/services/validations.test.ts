import { faker } from '@faker-js/faker/locale/pt_BR';
import { phoneRegex, stateRegex } from '../../../src/services/validations';

describe('phoneRegex', () => {
	const regex = RegExp(phoneRegex);
	it('## #.####-####', () => {
		expect(regex.test(faker.phone.number('## #.####-####'))).toEqual(false);
	});

	it('# ####-####', () => {
		expect(regex.test(faker.phone.number('# ####-####'))).toEqual(false);
	});

	it('###########', () => {
		expect(regex.test(faker.phone.number('###########'))).toEqual(true);
	});

	it('##########', () => {
		expect(regex.test(faker.phone.number('##########'))).toEqual(true);
	});

	it('#########', () => {
		expect(regex.test(faker.phone.number('#########'))).toEqual(true);
	});

	it('########', () => {
		expect(regex.test(faker.phone.number('########'))).toEqual(true);
	});

	it('####-####', () => {
		expect(regex.test(faker.phone.number('####-####'))).toEqual(true);
	});

	it('####.####', () => {
		expect(regex.test(faker.phone.number('####.####'))).toEqual(true);
	});

	it('####.#####', () => {
		expect(regex.test(faker.phone.number('####.#####'))).toEqual(false);
	});

	it('+## ## #### ####', () => {
		expect(regex.test(faker.phone.number('+## ## #### ####'))).toEqual(false);
	});
	
	it('aaaa-aaaa', () => {
		expect(regex.test('aaaa-aaaa')).toEqual(false);
	});
});

describe('abbrRegex', () => {
	const regex = RegExp(stateRegex);

	it('should match random abbreviation', () => {
		expect(regex.test(faker.address.stateAbbr())).toEqual(true);
	});

	it('should match SP', () => {
		expect(regex.test('SP')).toEqual(true);
	});

	it('should not match SSP', () => {
		expect(regex.test('SSP')).toEqual(false);
	});

	it('should not match S P', () => {
		expect(regex.test('S P')).toEqual(false);
	});

	it('should not match P', () => {
		expect(regex.test(' P')).toEqual(false);
	});

	it('should not match 1P', () => {
		expect(regex.test('1P')).toEqual(false);
	});
});