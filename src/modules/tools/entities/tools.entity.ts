import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';
 import { ToolType } from './toolTypes.entity';

@Entity('tool')
export class Tool {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    name: string;

    @Column()
    projectId: number;

   
    @ManyToMany(() => ToolType, (type)=>(type.tools))
    @JoinTable({
        name: 'tools_connect_types',
        joinColumn: { name: 'toolId', referencedColumnName: 'id'},
        inverseJoinColumn: { name: 'typeId', referencedColumnName: 'id'},
    })
    types: ToolType[];
}


