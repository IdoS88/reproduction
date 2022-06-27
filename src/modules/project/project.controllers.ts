import { Controller , Res, Get, Param, Post, Body, Delete, Query, HttpStatus} from '@nestjs/common';
import { Response } from 'express';
import { Request } from 'express';
import { ProjectService } from "./services/project.service";
import { CreateProjectDTO } from "./dto/project.dto";
import { resolve } from 'path';

@Controller('Projects')
export class ProjectController {
    //projectService : ProjectService;

    constructor(private projectService : ProjectService) {};

    @Get("/hello")
    async helloProject()  {
       return await this.projectService.getHello();
    }

    @Get("/all")
    async GetAllProjects(@Res() res: Response) {
        console.log("project controller : GetAllProjects()");
        let allObjects= await this.projectService.getAll();

       // console.log("router /all get results "+ projObjects)   
        return res.status(HttpStatus.OK).json(allObjects);
    }

    @Get('/:id')
    async GetProjectById(@Param('id') projectid: number,
                         @Res() res: Response) {
        console.log("Project controller: get GetProjectById " + projectid)
        let projObj = await this.projectService.getById(projectid);
        return res.status(HttpStatus.OK).json(projObj);
    }

    @Post()
    async create(@Body() createProjectDto: CreateProjectDTO) {
        const project = await this.projectService.create(createProjectDto);
        return project;
    }

    @Delete()
    async delete(@Param('id') projectid: number) {
        const projects = await this.projectService.delete(projectid);
        return projects;
    }
}