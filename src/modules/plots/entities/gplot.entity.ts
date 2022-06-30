import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import {Projects} from 'src/modules/projects/entities/projects.entity';
@Entity()
export class gPlot {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(type => Projects) @JoinColumn()
  project: number;

  @Column()
  gplot_name: string;
}