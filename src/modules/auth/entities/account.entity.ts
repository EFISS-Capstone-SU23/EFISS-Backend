import { Entity, PrimaryGeneratedColumn, Column, OneToOne, ManyToMany, JoinTable } from 'typeorm'
import { PasswordResetTokenEntity } from './password-reset-token.entity'
import { RoleEntity } from './role.entity'

@Entity()
export class AccountEntity {
	@PrimaryGeneratedColumn()
		id: number

	@Column()
		username: string

	@Column()
		password: string

	@Column()
		email: string

	@Column()
		fullName: string

	@Column()
		phoneNumber: string

	@Column()
		createdAt: Date

	@Column()
		lastLogin: Date

	@Column()
		isEmailVerified: boolean

	@Column()
		status: boolean

	@OneToOne(() => PasswordResetTokenEntity, (token) => token.account)
		passwordResetToken: PasswordResetTokenEntity

	@ManyToMany(() => RoleEntity)
	@JoinTable()
		roles: RoleEntity[]
}
