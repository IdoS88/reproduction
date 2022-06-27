import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import {Project} from 'src/modules/project/entities/project.entity';
@Entity()
export class gPlot {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(type => Project) @JoinColumn()
  gplotId: number;

  @Column()
  gplotName: string;
}