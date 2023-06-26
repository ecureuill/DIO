/* eslint-disable indent */
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class User extends BaseEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({unique: true})
	cpf: string;

	@Column({unique: true})
	email: string;

	@Column()
	password: string;

	@Column()
	name: string;

	@Column({nullable: true})
	phone: string;

	@Column({type: 'blob', nullable: true})
	photo?: Buffer;
}