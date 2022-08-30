import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn , BaseEntity} from 'typeorm';
import {Project} from 'src/modules/projects/entities/projects.entity';

@Entity('g_plot')
export class gPlot extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

 // @OneToOne(type => Projects) @JoinColumn()
 @Column()
 projectId: number;

 @OneToMany(type => Project, projectid=>Project.getId)
 @JoinColumn({name: "projectId" })
 project: Project;

  @Column(({ length: 50 }))
  gplot_name: string;
}
