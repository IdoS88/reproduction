import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany, JoinColumn, JoinTable } from 'typeorm';
import { Tool } from './tools.entity';

@Entity('toolType')
export class ToolType {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    name: string;

    @ManyToMany(() => Tool, (tool) => tool.types)
    tools: Tool[];
}
