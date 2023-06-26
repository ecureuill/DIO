import { fakerPT_BR } from "@faker-js/faker";
import { EnumType } from "typescript";
import { User } from "../../src/entities/User";

export const getRandomEnum = <TEnum> (anEnum: TEnum) => {
	const enumValues = Object.keys(anEnum as EnumType);
	const randomIndex = Math.floor(Math.random() * enumValues.length / 2);
	return anEnum[enumValues[randomIndex] as keyof TEnum];
};

export const generateUserData = (overide = {}, includeSensitive = true): User => {
	return {
		id: fakerPT_BR.string.uuid(),
		name: fakerPT_BR.person.fullName(),
		email: fakerPT_BR.internet.email(),
		password: fakerPT_BR.internet.password(),
		phone: fakerPT_BR.phone.number('## #####-####'),
		cpf: fakerPT_BR.string.numeric(11),
		...overide,
	} as User;
};

export const generateUsersData = (n = 1, overide = {}): User[] => {
	return Array.from({length: n},(_, i) => {
		return generateUserData(overide);
	});
};
