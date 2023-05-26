import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
import { AccountRole } from '../../../loaders/enums'

@Entity()
export class RoleEntity {
	@PrimaryGeneratedColumn()
		id: number

	@Column({
		type: 'enum',
		enum: AccountRole,
		default: AccountRole.USER
	})
		role: AccountRole
}
