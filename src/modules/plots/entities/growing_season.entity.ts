import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, ManyToMany, BaseEntity, OneToMany } from 'typeorm';
import {Projects} from 'src/modules/projects/entities/projects.entity';

@Entity('growing_season')
export class GrowingSeason extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  projectId: number;

  @OneToMany(type => Projects, projectid=>Projects.getId)
  @JoinColumn({name: "projectId" })
  project: number;

  @Column()
  name: string;

  @Column({ type: 'date', nullable: true })
  start_date: Date;
  
  @Column({ type: 'date', nullable: true })
  end_date: Date;
}
