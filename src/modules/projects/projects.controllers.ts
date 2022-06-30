import { Controller , Res, Get, Param, Post, Body, Delete, Query, HttpStatus} from '@nestjs/common';
import { Response } from 'express';
import { Request } from 'express';
import { ProjectsService } from "./services/projects.service";
import { CreateProjectDTO } from "./dto/projects.dto";
import { resolve } from 'path';

@Controller('Projects')
export class ProjectsController {
    //projectService : ProjectService;

    constructor(private projectsService : ProjectsService) {};

    @Get("/hello")
    async helloProject()  {
       return await this.projectsService.getHello();
    }

    @Get("/all")
    async GetAllProjects(@Res() res: Response) {
        console.log("project controller : GetAllProjects()");
        let allObjects= await this.projectsService.getAll();

       // console.log("router /all get results "+ projObjects)   
        return res.status(HttpStatus.OK).json(allObjects);
    }

    @Get('/:id')
    async GetProjectById(@Param('id') projectid: number,
                         @Res() res: Response) {
        console.log("Project controller: get GetProjectById " + projectid)
        let projObj = await this.projectsService.getById(projectid);
        return res.status(HttpStatus.OK).json(projObj);
    }

    @Post()
    async create(@Body() createProjectDto: CreateProjectDTO) {
        const project = await this.projectsService.create(createProjectDto);
        return project;
    }

    @Delete()
    async delete(@Param('id') projectid: number) {
        const projects = await this.projectsService.delete(projectid);
        return projects;
    }
}