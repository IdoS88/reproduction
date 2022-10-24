import { PlotStrain } from 'src/modules/plots/entities/plotStrain.entity';
import { Project } from 'src/modules/projects/entities/projects.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn,BaseEntity, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { Crop } from './crop.entity';
import { CropType } from './cropType.entity';

@Entity('cropStrain')
export class CropStrain extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    color: string;

    @Column()
    cropId: number;
    @ManyToOne(() => Crop, crop => crop.strains,
                { cascade: true ,
                    onUpdate:'CASCADE'})
    @JoinColumn({ name: "cropId" })
    crop: Crop;

    @Column()
    typeId: number;
    @ManyToOne(() => CropType, cropType => cropType.strains,
                { cascade: true ,
                    onUpdate:'CASCADE'})
    @JoinColumn({ name: "typeId" })
    cropType: CropType;

    @ManyToMany(() => Project, 
                (prjct: Project) => prjct.cropStrains,
                { cascade: true ,
                  onUpdate:'CASCADE'})
    @JoinTable({
        name: "project_cropStrain", // table name for the junction table of this relation
        inverseJoinColumn: {
                name: "projectId",
                referencedColumnName: "id"
        },
        joinColumn: {
            name: "cropStrainId",
            referencedColumnName: "id"
        }
    })
    projects!: Project[];


    @OneToMany(() => PlotStrain, plotStrainId => PlotStrain.getId)
    plotStrainIds: number[]
}
