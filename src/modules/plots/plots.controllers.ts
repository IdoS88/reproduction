import { Controller , Get, Post, Put, Res,  Param, Body, Delete, Query, HttpStatus, UsePipes, ValidationPipe, Patch, HttpException, ParseIntPipe} from '@nestjs/common';
import { Response } from 'express';
import { PlotConnectionService } from "./services/plots.connection.service";
import { PlotsService } from "./services/plots.service";
import { PlotStrainService } from "./services/plotStrain.service";
import { SeasonService } from "./services/season.service";
import { CreatePlotDTO , UpdatePlotDTO} from "./dto/plots.dto";
import { UpdatePlotStrainDTO,  CreatePlotStrainDTO } from "./dto/plotStrain.dto";
import { CreateSeasonDTO, UpdateSeasonDTO } from "./dto/season.dto";
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { httpResponses} from 'src/modules/commons/routes.constants';

const plotPathes={
    Plots :  'Plots/Plots',
    PlotStrain: 'Plots/PlotStrain',
    growing: 'Plots/season'
}

//Talk with Nadav and Maria about sharing query structure with front End

@ApiTags(plotPathes.Plots)
@Controller(plotPathes.Plots)
export class PlotController {
    //plotService : PlotService;

    constructor(private plotsService :PlotsService,
                private plotConnectionService : PlotConnectionService) {};

    @Get("/hello")
    async helloPlot()  {
       let hellowAll : string; 
       hellowAll = await this.plotsService.getHello() 
       return hellowAll;
    }

    @Get()
    async GetPlotsByProject(
        @Query('project') projectId: number,
        @Res() res: Response) {
        console.log("plot controller : GetPlotsByProject(${projectId})" );
        let plotObjs = await this.plotsService.getByProject(projectId);
       // let projObj = await this.plotConnectionService.getPlotsByConstraints(
       //     {projectId: projectId} );
        return res.status(HttpStatus.OK).json(plotObjs);
    }

    @Get('/:id')
    async GetPlotById(@Param('id') plotid: number,
        @Query('project') projectId: number,
        @Res() res: Response) {
        console.log('Plot controller: get GetPlotById ${plotid} in project ${projectId}')
        //let projObj = await this.plotsService.getByIdAndProject(plotid, projectId, "all");
      let plotObj = await this.plotsService.getByIdAndProject(plotid, projectId);
    //   let projObj = await this.plotConnectionService.getPlotsByConstraints(
    //     {projectId: projectId,
    //         plotId: plotid} );
        return res.status(HttpStatus.OK).json(plotObj);
    }


    @Post()
    @UsePipes(new ValidationPipe({ transform: true }))
    @ApiResponse({ status: 201, description: 'The record has been successfully created.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    async createPlot(
        @Query('project',ParseIntPipe) projectid : number,
        @Body() createPlotDto: CreatePlotDTO) {
        console.log("Plot controller:createPlot ")
        const plot = await this.plotsService.create(createPlotDto, projectid);
        return plot;
    }

    @Patch('/:id')
    @UsePipes(new ValidationPipe({ transform: true }))
    @ApiResponse({ status: 201, description: 'The record has been successfully updated.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    @ApiResponse({ status: 531, description: 'update functionality not implemented.'})
    async updatePlot(
        @Param('id',ParseIntPipe) id: number,
        @Query('project',ParseIntPipe) projectid : number,
        @Body() updatePlotDto: UpdatePlotDTO) {
        console.log("Plot controller: updatePlot ")
        //throw new HttpException(httpResponses.UPDATE_NOT_IMPLEMENTED.description,
        //                        httpResponses.UPDATE_NOT_IMPLEMENTED.status);
        const plot = await this.plotsService.update(id, updatePlotDto, projectid);
        return plot;
    }

    @Delete(':id')
    @ApiResponse({ status: 532, description: 'delete functionality not implemented.'})
    async deletePlot(
        @Param('id') id: number,
        @Query('project') projectid : number) {
        throw new HttpException(httpResponses.DELETE_NOT_IMPLEMENTED.description, 
                                httpResponses.DELETE_NOT_IMPLEMENTED.status);
        const plots = await this.plotsService.delete(id, projectid);
        return plots;
    }
}

@ApiTags(plotPathes.PlotStrain)
@Controller(plotPathes.PlotStrain)
export class PlotStrainController {
    constructor(private plotStrainService :PlotStrainService) {};
   
    @Get("/hello")
    async helloPlot()  {
       let hellowAll : string; 
       hellowAll = await this.plotStrainService.getHello() 
       return hellowAll;
    }
    // --- for gPlot
    @Get()
    async GetGPlotsByProject(
        @Query('project') projectId: number,
        @Res() res: Response) {
        console.log("gPlotController  : GetGPlotsByProject()"  + projectId);
        let gplotsObjects = await this.plotStrainService.getByProject(projectId);
        return res.status(HttpStatus.OK).json(gplotsObjects);
    }

    // sivan : I prefer to work with query - such the query structure define the process (get by ID or get by project),
    //         instead the route path 
    //         But query works only under empty GET() or if we use GET with path we can use only @Param
    @Get("/:id")
    async GetGPlotById(
        @Param('id') id: number,
        @Query('project') projectid: number,
        @Res() res: Response) {               
        console.log(`gPlotController: GetGPlotById ${id} for project ${projectid}`)
        let gprojObj = await this.plotStrainService.getByIdAndProject(id, projectid);
        return res.status(HttpStatus.OK).json(gprojObj);
    };
       
    // @Get('filter')
    // async GetGPlotByFilter(
    //                 //@Param('projectid') projectid : number,
    //                 @Query() query: {'projectid': number},    //   Plots/gPlots/?projectid=1
    //                 @Res() res: Response) {
    //     console.log("gPlotController: get getByProject ?{query.projectid}")
    //     let gprojObjects = await this.plotStrainService.getByProject(query.projectid);
    //     return res.status(HttpStatus.OK).json(gprojObjects);
    // }

    @Post()
    @UsePipes(new ValidationPipe({ transform: true }))
    @ApiResponse({ status: 201, description: 'The record has been successfully created.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    async create(
        @Query('project') projectid: number,
        @Body() createPlotStrainDto: CreatePlotStrainDTO) {
        console.log("gPlotController: updatePlot in project ${projectid}")
        const plot = await this.plotStrainService.create(createPlotStrainDto, projectid);
        return plot;
    }

    @Patch('/:id')
    @UsePipes(new ValidationPipe({ transform: true }))
    @ApiResponse({ status: 201, description: 'The record has been successfully updated.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    @ApiResponse({ status: 531, description: 'update functionality not implemented.'})
    async update(
        @Param('id') id: number,
        @Query('project') projectid: number,
        @Body() updatePlotStrainDto: UpdatePlotStrainDTO) {
        console.log("PlotStrainController: update in project ${projectid}")
        //throw new HttpException(httpResponses.UPDATE_NOT_IMPLEMENTED.description, 
        //                        httpResponses.UPDATE_NOT_IMPLEMENTED.status);
        const plot = await this.plotStrainService.update(id, updatePlotStrainDto, projectid);
        return plot;
    }

    @Delete(':id')
    @ApiResponse({ status: 532, description: 'delete functionality not implemented.'})
    async delete(
        @Param('id') id: number,
        @Query('project') projectid : number) {
        console.log("PlotStrainController: delete in project ${projectid}")
        throw new HttpException(httpResponses.DELETE_NOT_IMPLEMENTED.description, 
                                httpResponses.DELETE_NOT_IMPLEMENTED.status);
        const growingSeasion = await this.plotStrainService.delete(id, projectid);
        return growingSeasion;
    }
}

@ApiTags(plotPathes.growing)
@Controller(plotPathes.growing)
export class seasonController {

    constructor(private seasonService:SeasonService) {};

    @Get("/hello")
    async helloPlot()  {
       let hellowAll : string; 
       hellowAll = await this.seasonService.getHello() 
       return hellowAll;
    }

    // --- for growingSesion
    @Get()
    async GetAllGrowingSeason(
        @Query('project') projectId: number,
        @Res() res: Response) {
        console.log('season controller : GetAllGrowingSeason() for project ${projectid}');
        let allObjects= await this.seasonService.getByProject(projectId);

        return res.status(HttpStatus.OK).json(allObjects);
    }

    @Get("/:id")
    async GetSeasonByIdAndProject(
        @Query('project') projectid: number,
        @Param('id')  id: number ,
        @Res() res: Response) {
        console.log("GrowingSeason controller: get GetGrowingSeasonByIdAndProject ${id} for project ${projectid}")
        let growingObj = await this.seasonService.getByIdAndProject(id, projectid);
        return res.status(HttpStatus.OK).json(growingObj);
    }

    @Post()
    @UsePipes(new ValidationPipe({ transform: true }))
    @ApiResponse({ status: 201, description: 'The record has been successfully created.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    async createSeason(
        @Query('project') projectid : number,
        @Body() createSeasonDto: CreateSeasonDTO) {
        console.log("GrowingSeason controller: createGrowingSeason ${projectid}")
        const growingSeason = await this.seasonService.create(createSeasonDto,projectid);
        return growingSeason;
    }

    @Patch("/:id")
    @UsePipes(new ValidationPipe({ transform: true }))
    @ApiResponse({ status: 201, description: 'The record has been successfully updated.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    @ApiResponse({ status: 531, description: 'update functionality not implemented.'})
    async updateSeason(
        @Param('id') id: number,
        @Query('project') projectid : number,
        @Body() updateSeasonDto: UpdateSeasonDTO) {
        console.log('GrowingSeason controller: updateSeason ${projectid}')
        throw new HttpException(httpResponses.UPDATE_NOT_IMPLEMENTED.description, 
                                httpResponses.UPDATE_NOT_IMPLEMENTED.status);
        const plot = await this.seasonService.update(id, updateSeasonDto, projectid);
        return plot;
    }

    @Delete(':id')
    @ApiResponse({ status: 532, description: 'delete functionality not implemented.'})
    async deleteSeason(
        @Param('id') plotgrowingSeasionIdid: number,
        @Query('project') projectid : number) {
        console.log("GrowingSeason Controller: delete GrowingSeason in project ${projectId}")
        throw new HttpException(httpResponses.DELETE_NOT_IMPLEMENTED.description, 
                                httpResponses.DELETE_NOT_IMPLEMENTED.status);
        const growingSeasion = await this.seasonService.delete(projectid, plotgrowingSeasionIdid);
        return growingSeasion;
    }
}