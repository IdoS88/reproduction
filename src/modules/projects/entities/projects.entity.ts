import { Entity, Column, PrimaryGeneratedColumn, OneToMany, BaseEntity, ManyToOne, JoinColumn } from 'typeorm';

@Entity('projects')
export class Project extends BaseEntity{
  
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  iconSrc: string;
}