import { RowDataPacket } from "mysql2";
import pool from "../db/MySqlPool";
import ProjectModel from "../entities/project";

export interface IProjectRepository {
    getAll : () => Promise<ProjectModel[]>,
}

export class ProjectRepositoryMySql implements IProjectRepository {   
    async getAll() {
        const [rows,fields] = await pool.query<RowDataPacket[]>("SELECT * FROM projects");
        return rows.map((row) => new ProjectModel(row.id, row.name, row.iconSrc));
    }
}