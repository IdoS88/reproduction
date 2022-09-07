import { Project } from 'src/modules/projects/entities/projects.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn,BaseEntity, ManyToMany, JoinTable } from 'typeorm';
import { Crops } from './crop.entity';

@Entity()
export class CropsStrain extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    color: string;

    @Column()
    cropId: number;
    @ManyToOne(() => Crops, crop => crop.strain)
    @JoinColumn({ name: "cropId" })
    crop: Crops;

    @ManyToMany(() => Project, 
                (prjct: Project) => prjct.cropsStrainArr,
                { cascade: true ,
                  onUpdate:'CASCADE'})
    @JoinTable({
        name: "project_cropStrain", // table name for the junction table of this relation
        inverseJoinColumn: {
                name: "project",
                referencedColumnName: "id"
        },
        joinColumn: {
            name: "cropStrain",
            referencedColumnName: "id"
        }
    })
    projectsArr!: Project[];
}
