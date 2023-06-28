import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { AccountRole } from '../../../loaders/enums';
import { PermissionEntity } from './permission.entity';

@Entity({ name: 'roles' })
export class RoleEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: AccountRole,
    default: AccountRole.NORMAL_USER,
  })
  name: AccountRole;

  @ManyToMany(() => PermissionEntity, { cascade: true, onDelete: 'CASCADE' })
  @JoinTable({
    name: 'role_ permissions',
    joinColumn: {
      name: 'role_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'permission_id',
      referencedColumnName: 'id',
    },
  })
  permissions: PermissionEntity[];
}
