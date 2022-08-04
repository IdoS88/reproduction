import { Controller , Get, Post, Put, Res,  Param, Body, Delete, Query, HttpStatus, UsePipes, ValidationPipe, Patch} from '@nestjs/common';
import { Response } from 'express';
import { PlotsService } from "./services/plots.service";
import { gPlotService } from "./services/gplot.service";
import { GrowingSeasonService } from "./services/growing_season.service";
import { CreatePlotDTO , FilterPlotQueryDTO, UpdatePlotDTO} from "./dto/plots.dto";
import { UpdateGPlotDTO,  CreateGPlotDTO } from "./dto/gplot.dto";
import { CreateGrowingSeasonDTO, UpdateGrowingSeasonDTO } from "./dto/growing_season.dto";
import { Projects } from '../projects/entities/projects.entity';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

const plotPathes={
    Plots :  'Plots/Plots',
    gPlots: 'Plots/gPlots',
    growing: 'Plots/growing'
}

//Talk with Nadav and Maria about sharing query structure with front End

@ApiTags(plotPathes.Plots)
@Controller(plotPathes.Plots)
export class PlotController {
    //plotService : PlotService;

    constructor(private plotsService :PlotsService) {};

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
        let projObj = await this.plotsService.getByProject(projectId);
        return res.status(HttpStatus.OK).json(projObj);
    }

    @Get('/:id')
    async GetPlotById(@Param('id') plotid: number,
        @Query('project') projectId: number,
        @Res() res: Response) {
        console.log('Plot controller: get GetPlotById ${plotid} in project ${projectId}')
        let projObj = await this.plotsService.getByIdAndProject(plotid, projectId );
        return res.status(HttpStatus.OK).json(projObj);
    }


    @Post()
    @UsePipes(new ValidationPipe({ transform: true }))
    @ApiResponse({ status: 201, description: 'The record has been successfully created.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    async createPlot(
        @Query('project') projectid : number,
        @Body() createPlotDto: CreatePlotDTO) {
        console.log("Plot controller:createPlot ")
        const plot = await this.plotsService.create(projectid, createPlotDto);
        return plot;
    }

    @Patch('/:id')
    @UsePipes(new ValidationPipe({ transform: true }))
    @ApiResponse({ status: 201, description: 'The record has been successfully updated.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    async updatePlot(
        @Param('id') id: number,
        @Query('project') projectid : number,
        @Body() updatePlotDto: UpdatePlotDTO) {
        console.log("Plot controller: updatePlot ")
        const plot = await this.plotsService.update(id, projectid, updatePlotDto);
        return plot;
    }

    @Delete(':id')
    async deletePlot(
        @Param('id') id: number,
        @Query('project') projectId : number) {
        const plots = await this.plotsService.delete(id, projectId);
        return plots;
    }
}

@ApiTags('Plots/GPlots')
@Controller(plotPathes.gPlots)
export class gPlotController {
    constructor(private gplotService :gPlotService) {};
   
    @Get("/hello")
    async helloPlot()  {
       let hellowAll : string; 
       hellowAll = await this.gplotService.getHello() 
       return hellowAll;
    }
    // --- for gPlot
    @Get()
    async GetGPlotsByProject(
        @Query('project') projectId: number,
        @Res() res: Response) {
        console.log("gPlotController  : GetGPlotsByProject()"  + projectId);
        let gplotsObjects = await this.gplotService.getByProject(projectId);
        return res.status(HttpStatus.OK).json(gplotsObjects);
    }

    // sivan : I prefer to work with query - such the query structure define the process (get by ID or get by project),
    //         instead the route path 
    //         But query works only under empty GET() or if we use GET with path we can use only @Param
    @Get("/:id")
    async GetGPlotById(
        @Param('id') id: number,
        @Query('project') projectId: number,
        @Res() res: Response) {               
        console.log(`gPlotController: GetGPlotById ${id}`)
        let gprojObj = await this.gplotService.getByIdAndProject(id, projectId);
        return res.status(HttpStatus.OK).json(gprojObj);
    };
       
    // @Get('filter')
    // async GetGPlotByFilter(
    //                 //@Param('projectid') projectid : number,
    //                 @Query() query: {'projectid': number},    //   Plots/gPlots/?projectid=1
    //                 @Res() res: Response) {
    //     console.log("gPlotController: get getByProject ?{query.projectid}")
    //     let gprojObjects = await this.gplotService.getByProject(query.projectid);
    //     return res.status(HttpStatus.OK).json(gprojObjects);
    // }

    @Post()
    @UsePipes(new ValidationPipe({ transform: true }))
    @ApiResponse({ status: 201, description: 'The record has been successfully created.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    async createGPlot(
        @Query('project') projectId: number,
        @Body() createGPlotDto: CreateGPlotDTO) {
        console.log("gPlotController: updatePlot in project ${projectId}")
        const plot = await this.gplotService.create(projectId, createGPlotDto);
        return plot;
    }

    @Patch('/:id')
    @UsePipes(new ValidationPipe({ transform: true }))
    @ApiResponse({ status: 201, description: 'The record has been successfully updated.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    async updategPlot(
        @Param('id') id: number,
        @Query('project') projectId: number,
        @Body() updateGPlotDto: UpdateGPlotDTO) {
        console.log("gPlotController: updategPlot in project ${projectId}")
        const plot = await this.gplotService.update(id, projectId, updateGPlotDto);
        return plot;
    }

    @Delete(':id')
    async deletegPlot(
        @Param('id') id: number,
        @Query('project') projectId : number) {
        const growingSeasion = await this.gplotService.delete(id, projectId);
        return growingSeasion;
    }
}

@ApiTags(plotPathes.growing)
@Controller(plotPathes.growing)
export class growingController {

    constructor(private growingSeasonService:GrowingSeasonService) {};

    @Get("/hello")
    async helloPlot()  {
       let hellowAll : string; 
       hellowAll = await this.growingSeasonService.getHello() 
       return hellowAll;
    }

    // --- for growingSesion
    @Get()
    async GetAllGrowingSeason(
        @Query('project') projectId: number,
        @Res() res: Response) {
        console.log("GrowingSeason controller : GetAllGrowingSeason() for project ${projectId}");
        let allObjects= await this.growingSeasonService.getByProject(projectId);

        return res.status(HttpStatus.OK).json(allObjects);
    }

    @Get("/:id")
    async GetGrowingSeasonByIdAndProject(
        @Query('project') projectId: number,
        @Param('id')  id: number ,
        @Res() res: Response) {
        console.log("GrowingSeason controller: get GetGrowingSeasonByIdAndProject ${id} for project ${projectId}")
        let growingObj = await this.growingSeasonService.getByIdAndProject(id, projectId);
        return res.status(HttpStatus.OK).json(growingObj);
    }

    @Post()
    @UsePipes(new ValidationPipe({ transform: true }))
    @ApiResponse({ status: 201, description: 'The record has been successfully created.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    async createGrowingSeason(
        @Query('project') projectId : number,
        @Body() createGrowingSeasonDto: CreateGrowingSeasonDTO) {
        console.log("GrowingSeason controller: createGrowingSeason " + createGrowingSeasonDto.projectId)
        const growingSeason = await this.growingSeasonService.create(createGrowingSeasonDto);
        return growingSeason;
    }

    @Patch("/:id")
    @UsePipes(new ValidationPipe({ transform: true }))
    @ApiResponse({ status: 201, description: 'The record has been successfully updated.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    async updateGrowingSeason(
        @Param('id') id: number,
        @Query('project') projectId : number,
        @Body() updateGrowingSeasonDto: UpdateGrowingSeasonDTO): Promise<number> {
        console.log("GrowingSeason controller: updateGrowingSeason ")
        const plot = await this.growingSeasonService.update(id, updateGrowingSeasonDto);
        return plot;
    }

    @Delete(':id')
    async deleteGrowingSeason(
        @Param('id') plotgrowingSeasionIdid: number,
        @Query('project') projectId : number) {
        const growingSeasion = await this.growingSeasonService.delete(plotgrowingSeasionIdid);
        return growingSeasion;
    }
}