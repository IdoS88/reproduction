import { Column, PrimaryGeneratedColumn, OneToOne, JoinColumn , BaseEntity, ManyToOne} from 'typeorm';
import {Project} from 'src/modules/projects/entities/projects.entity';

export class GenericEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
}



export class SpecificEntity extends GenericEntity {
    //@OneToOne(type => Project) @JoinColumn()
    //sivan: could projectId be null ?  
   // @Column()  projectId: number;
}
 
