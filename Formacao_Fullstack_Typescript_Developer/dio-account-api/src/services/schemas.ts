import {JSONSchemaType} from 'ajv';
import { phoneRegex, stateRegex } from './validations';

const definitionsSchema = {
	$id: 'definitionsSchema',
	type: 'object',
	definitions: {
		'non-empty-string': {
			type: 'string',
			transform: ['trim'],
			minLength: 1,
		},
		'non-nullable-empty-string': {
			type: 'string',
			transform: ['trim'],
			minLength: 1,
			nullable: true
		},
		uuid: {
			type: 'string',
			format: 'uuid'
		},
		email: {
			type: 'string',
			format: 'email'
		},
		password: {
			type: 'string',
			minLength: 8
		},
		phone: {
			type: 'string', 
			pattern: phoneRegex,
			nullable: true
		},
		city: {
			type: 'string', 
			minLength: 1,
			nullable: true
		},
		state: {
			type: 'string', 
			nullable: true,
			transform: ['trim'],
			pattern: stateRegex,
			minLength: 2,
			maxLength: 2
		},
	},
};

const loginSchema = {
	$id: 'loginSchema',
	type: 'object',
	required: ['email', 'password'],
	properties: {
		email: {$ref: 'definitionsSchema#/definitions/email'},
		password: {$ref: 'definitionsSchema#/definitions/password'},
	},
	additionalProperties: false,
	minProperties: 2,
};

const schemas = [
	definitionsSchema, 
	loginSchema
];


export default schemas;