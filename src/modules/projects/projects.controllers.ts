import { Controller , Get, Post, Patch, Res, Param, Body, Delete, Query, HttpStatus} from '@nestjs/common';
import { Response } from 'express';
import { ProjectsService } from "./services/projects.service";
import { CreateProjectDTO, UpdateProjectDTO } from "./dto/projects.dto";
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Projects')
@Controller('Projects')
export class ProjectsController {
    //projectService : ProjectService;

    constructor(private projectsService : ProjectsService) {};

    @Get("/hello")
    async helloProject()  {
       return await this.projectsService.getHello();
    }

    @Get()
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
    @ApiResponse({ status: 201, description: 'The record has been successfully created.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    async create(@Body() createProjectDto: CreateProjectDTO): Promise<number> {
        const project = await this.projectsService.create(createProjectDto);
        return project;
    }

    @Patch('/:id')
    @ApiResponse({ status: 201, description: 'The record has been successfully updated.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    async update(@Param('id') id: number,
                 @Body() updateProjectDto: UpdateProjectDTO) {
        const project = await this.projectsService.update(id, updateProjectDto);
        return project;
    }

    @Delete(':id')
    async delete(@Param('id') projectid: number) {
        const projects = await this.projectsService.delete(projectid);
        return projects;
    }
}