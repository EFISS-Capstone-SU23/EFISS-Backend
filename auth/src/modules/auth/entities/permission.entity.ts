import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { Permission } from '../../../loaders/enums';

@Entity({ name: 'permissions' })
export class PermissionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: Permission,
  })
  name: Permission;
}
