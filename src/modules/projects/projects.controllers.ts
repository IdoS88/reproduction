import { Controller , Get, Post, Patch, Res, Param, Body, Delete, Query, HttpStatus, HttpException} from '@nestjs/common';
import { Response } from 'express';
import { ProjectsService } from "./services/projects.service";
import { CreateProjectDTO, UpdateProjectDTO } from "./dto/projects.dto";
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { httpResponses} from 'src/modules/commons/routes.constants';
import { Unprotected, Public, Scopes, Roles, AuthenticatedUser, RoleMatchingMode } from 'nest-keycloak-connect';

@ApiTags('Projects')
@Controller('Projects')
export class ProjectsController {
    //projectService : ProjectService;

    constructor(private projectsService : ProjectsService) {};
    
    @Get("/hello")
    @Public(false)
    //@Unprotected()
    async helloProject(@AuthenticatedUser() user: any)  {
        if (user) {
            return `Hello ${user.preferred_username}`;
          } else {
            return 'Hello world!';
          }
    }

    @Get()
    @Public(false)
   // @Scopes('View')
    @Roles({ roles: ['admin'], mode: RoleMatchingMode.ALL })
    async GetAllProjects(
        @AuthenticatedUser() user: any,
        @Res() res: Response) {
           // console.log(`project controller : GetAllProjects() for user ${user.preferred_username}`);
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
    @Scopes('Edit')
    @Roles({ roles: ['admin'], mode: RoleMatchingMode.ALL })
    @ApiResponse({ status: 201, description: 'The record has been successfully created.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    async create(@Body() createProjectDto: CreateProjectDTO): Promise<number> {
        const project = await this.projectsService.create(createProjectDto);
        return project;
    }

    @Patch('/:id')
    @Scopes('Edit')
    @Roles({ roles: ['admin'], mode: RoleMatchingMode.ALL })
    //@ApiResponse(httpResponses.DELETE_NOT_IMPLEMENTED)
    @ApiResponse({ status: 201, description: 'The record has been successfully updated.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    @ApiResponse({ status: 531, description: 'update functionality not implemented.'})
    async update(@Param('id') id: number,
                 @Body() updateProjectDto: UpdateProjectDTO) {
        //throw new HttpException(httpResponses.UPDATE_NOT_IMPLEMENTED.description,
        //                        httpResponses.UPDATE_NOT_IMPLEMENTED.status);
        let project = await this.projectsService.update(id, updateProjectDto);
        return project;
    }

    @Delete(':id')
    @Scopes('Edit')
    @Roles({ roles: ['admin'], mode: RoleMatchingMode.ALL })
    @ApiResponse({ status: 532, description: 'delete functionality not implemented.'})
    async delete(@Param('id') projectid: number) {
        throw new HttpException(httpResponses.DELETE_NOT_IMPLEMENTED.description, 
                                httpResponses.DELETE_NOT_IMPLEMENTED.status);
        const projects = await this.projectsService.delete(projectid);
        return projects;
    }
}