import { Controller , Res, Get, Param, Post, Body, Delete, Query, HttpStatus, UsePipes, ValidationPipe} from '@nestjs/common';
import { Response } from 'express';
import { PlotsService } from "./services/plots.service";
import { gPlotService } from "./services/gplot.service";
import { GrowingSeasonService } from "./services/growing_season.service";
import { CreatePlotDTO , FilterPlotQueryDTO, UpdatePlotDTO} from "./dto/plots.dto";
import { CreateGPlotDTO, UpdateGPlotDTO } from "./dto/gplot.dto";
import { CreateGrowingSeasonDTO, UpdateGrowingSeasonDTO } from "./dto/growing_season.dto";
import { Projects } from '../projects/entities/projects.entity';
import { ApiTags } from '@nestjs/swagger';

const plotPathes={
    Plots :  'Plots',
    gPlots: 'Plots/gPlots',
    growing: 'Plots/growing'
}

//Talk with Nadav and Maria about sharing query structure with front End

@ApiTags('Plots')
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
    async GetAllPlots(@Res() res: Response) {
        console.log("plot controller : GetAllPlots()");
        let allObjects= await this.plotsService.getAll();

       // console.log("router /all get results "+ projObjects)   
        return res.status(HttpStatus.OK).json(allObjects);
    }

    // @Get('/:id')
    // async GetPlotById(@Param('id') plotid: number,
    //                  @Res() res: Response) {
    //     console.log("Plot controller: get GetPlotById " + plotid)
    //     let projObj = await this.plotsService.getById(plotid);
    //     return res.status(HttpStatus.OK).json(projObj);
    // }

    @Get("id")
    async GetPlotById(@Query('id') plotid: number,
                      @Res() res: Response) {
        console.log("Plot controller: get GetPlotById " + plotid)
        let projObj = await this.plotsService.getById(plotid);
        return res.status(HttpStatus.OK).json(projObj);
    }

    // todo : handle undefined query structure
    @Get('/project/')
    async GetPlotByProject(
        @Query() query : {'projectid': number},    //   Plots/gPlots/?projectid=1
        @Res() res: Response) {
        console.log("Plot controller: get GetPlotByProject " + query.projectid)
        let projObj = await this.plotsService.getByProject(query.projectid);
        return res.status(HttpStatus.OK).json(projObj);
    }
/* 
    @Get('queries')
    async GetPlotsByFilters(
        @Query() query : FilterPlotQueryDTO,    //   Plots/gPlots/?projectid=1
        @Res() res: Response) {
            
    
    } */


    @Post('new')
    @UsePipes(new ValidationPipe({ transform: true }))
    async createPlot(@Body() createPlotDto: CreatePlotDTO) {
        console.log("Plot controller:createPlot ")
        const plot = await this.plotsService.create(createPlotDto);
        return plot;
    }

    @Post('update')
    @UsePipes(new ValidationPipe({ transform: true }))
    async updatePlot(@Body() updatePlotDto: UpdatePlotDTO) {
        console.log("Plot controller: updatePlot ")
        const plot = await this.plotsService.update(updatePlotDto);
        return plot;
    }

    @Delete(':id')
    async deletePlot(@Param('id') plotid: number) {
        const plots = await this.plotsService.delete(plotid);
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
    async GetAllgPlots(@Res() res: Response) {
        console.log("gPlotController : GetAllgPlots()");
        let allObjects= await this.gplotService.getAll();

        return res.status(HttpStatus.OK).json(allObjects);
    }

    // sivan : I prefer to work with query - such the query structure define the process (get by ID or get by project),
    //         instead the route path 
    //         But query works only under empty GET() or if we use GET with path we can use only @Param
    @Get("id")
    async GetGPlotById(
                    @Query('id')  id: number ,  //   Plots/gPlots/?id=1
                    // @Param('id') id: number,
                     @Res() res: Response) {               
        console.log(`gPlotController: GetGPlotById ${id}`)
        let gprojObj = await this.gplotService.getById(id);
        return res.status(HttpStatus.OK).json(gprojObj);
    };
       
    @Get('project')
    async GetGPlotsByProject(
                    //@Param('projectid') projectid : number,
                    @Query() query: {'projectid': number},    //   Plots/gPlots/?projectid=1
                    @Res() res: Response) {
        console.log("gPlotController: get getByProject ?{query.projectid}")
        let gprojObjects = await this.gplotService.getByProject(query.projectid);
        return res.status(HttpStatus.OK).json(gprojObjects);
    }

    @Get('filter')
    async GetGPlotByFilter(
                    //@Param('projectid') projectid : number,
                    @Query() query: {'projectid': number},    //   Plots/gPlots/?projectid=1
                    @Res() res: Response) {
        console.log("gPlotController: get getByProject ?{query.projectid}")
        let gprojObjects = await this.gplotService.getByProject(query.projectid);
        return res.status(HttpStatus.OK).json(gprojObjects);
    }

    @Post('new')
    @UsePipes(new ValidationPipe({ transform: true }))
    async createGPlot(@Body() createGPlotDto: CreateGPlotDTO) {
        console.log("gPlotController: updatePlot ")
        const plot = await this.gplotService.create(createGPlotDto);
        return plot;
    }

    @Post('update')
    @UsePipes(new ValidationPipe({ transform: true }))
    async updategPlot(@Body() updateGPlotDto: UpdateGPlotDTO) {
        console.log("gPlotController: updategPlot ")
        const plot = await this.gplotService.update(updateGPlotDto);
        return plot;
    }
}

@ApiTags('Plots/growingSessions')
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
    async GetAllGrowingSeason(@Res() res: Response) {
        console.log("GrowingSeason controller : GetAllGrowingSeason()");
        let allObjects= await this.growingSeasonService.getAll();

        return res.status(HttpStatus.OK).json(allObjects);
    }

    @Get("id")
    async GetGrowingSeasonById(
        @Query('id')  growingSeasionId: number ,
        @Res() res: Response) {
        console.log("GrowingSeason controller: get GetGrowingSeasonById " + growingSeasionId)
        let growingObj = await this.growingSeasonService.getById(growingSeasionId);
        return res.status(HttpStatus.OK).json(growingObj);
    }

    @Get('project')
    async GetGrowingSeasonByProject(
                        @Query('projectid') projectid: number,    //   Plots/gPlots/?projectid=1
                        @Res() res: Response) {
        console.log("GrowingSeason controller: get GetGrowingSeasonById " + projectid);
        let growingObjects = await this.growingSeasonService.getByProject(projectid);
        return res.status(HttpStatus.OK).json(growingObjects);
    }

    @Post('new')
    @UsePipes(new ValidationPipe({ transform: true }))
    async createGrowingSeason(@Body() createGrowingSeasonDto: CreateGrowingSeasonDTO) {
        console.log("GrowingSeason controller: createGrowingSeason " + createGrowingSeasonDto.projectId)
        const growingSeason = await this.growingSeasonService.create(createGrowingSeasonDto);
        return growingSeason;
    }

    @Post('update')
    @UsePipes(new ValidationPipe({ transform: true }))
    async updateGrowingSeason(@Body() updateGrowingSeasonDto: UpdateGrowingSeasonDTO): Promise<number> {
        console.log("GrowingSeason controller: updateGrowingSeason ")
        const plot = await this.growingSeasonService.update(updateGrowingSeasonDto);
        return plot;
    }

    @Delete(':id')
    async deleteGrowingSeason(@Param('id') plotgrowingSeasionIdid: number) {
        const growingSeasion = await this.growingSeasonService.delete(plotgrowingSeasionIdid);
        return growingSeasion;
    }
}