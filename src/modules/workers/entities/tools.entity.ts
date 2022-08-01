import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, ManyToMany, JoinColumn, JoinTable } from 'typeorm';
 import { Type } from './types.entity';

@Entity()
export class Tool {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    name: string;

    @Column()
    projectid: number;

    @Column("simple-array")
    typesid: number[];
    @ManyToMany(() => Type, (type) => type.tools)
    @JoinTable()
    @JoinColumn({name: "typesid" })
    types: Type[]

    @OneToMany(type => ToolToTypes, toolToTypes => toolToTypes.tool)
    type: ToolToTypes[];
}


@Entity()
export class ToolToTypes {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    toolid: number;
    @ManyToOne(() => Tool, tool => tool.type)
    @JoinColumn({name: "toolid" })
    tool: Tool;

    @Column()
    typeid: number;
    @ManyToOne(() => Type, type => type.tooltotype)
    @JoinColumn({name: "typeid" })
    ttype: Type;
}