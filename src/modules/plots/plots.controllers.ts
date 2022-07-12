import { Controller , Res, Get, Param, Post, Body, Delete, Query, HttpStatus} from '@nestjs/common';
import { Response } from 'express';
//import { Request } from 'express';
import { PlotsService } from "./services/plots.service";
import { gPlotService } from "./services/gplot.service";
import { GrowingSeasonService } from "./services/growing_season.service";
import { CreatePlotDTO } from "./dto/plots.dto";
import { CreateGPlotDTO } from "./dto/gplot.dto";
import { CreateGrowingSeasonDTO } from "./dto/growing_season.dto";
import { Projects } from '../projects/entities/projects.entity';

@Controller('Plots')
export class PlotController {
    //plotService : PlotService;

    constructor(private plotsService :PlotsService,
                private gplotService :gPlotService,
                private growingSeasonService:GrowingSeasonService) {};

    @Get("/hello")
    async helloPlot()  {
       let hellowAll : string; 
       hellowAll = await this.plotsService.getHello() + "\n" +
                await this.gplotService.getHello() + "\n" +
               await this.growingSeasonService.getHello()
       return hellowAll;
    }

    @Get("/all")
    async GetAllPlots(@Res() res: Response) {
        console.log("plot controller : GetAllPlots()");
        let allObjects= await this.plotsService.getAll();

       // console.log("router /all get results "+ projObjects)   
        return res.status(HttpStatus.OK).json(allObjects);
    }

    @Get('/:id')
    async GetPlotById(@Param('id') plotid: number,
                     @Res() res: Response) {
        console.log("Plot controller: get GetPlotById " + plotid)
        let projObj = await this.plotsService.getById(plotid);
        return res.status(HttpStatus.OK).json(projObj);
    }

    @Post()
    async createPlot(@Body() createPlotDto: CreatePlotDTO) {
        console.log("Plot controller:createPlot ")
        const plot = await this.plotsService.create(createPlotDto);
        return plot;
    }

    @Delete()
    async deletePlot(@Param('id') plotid: number) {
        const plots = await this.plotsService.delete(plotid);
        return plots;
    }

    // --- for gPlot
    @Get("/gPlots/all")
    async GetAllgPlots(@Res() res: Response) {
        console.log("plot controller : GetAllgPlots()");
        let allObjects= await this.gplotService.getAll();

        return res.status(HttpStatus.OK).json(allObjects);
    }

    // sivan : I prefer to work with query - such the query structure define the process (get by ID or get by project),
    //         instead the route path 
    //         But query works only under empty GET() or if we use GET with path we can use only @Param
    @Get('/gPlots/byID/:id')
    async GetGPlotById(
                    //@Query('id')  id: number ,  //   Plots/gPlots/?id=1
                     @Param('id') id: number,
                     @Res() res: Response) {               
        console.log(`plot controller: my get GetGPlotById ${id}`)
        let gprojObj = await this.gplotService.getById(id);
        return res.status(HttpStatus.OK).json(gprojObj);
    }
    
    
    @Get('/gPlots/byProject/:projectid')
    async GetGPlotByProject(
                    @Param('projectid') projectid : number,
                    //@Query() query: {'projectid': number},    //   Plots/gPlots/?projectid=1
                    @Res() res: Response) {
        console.log("plot controller: get getByProject ?{projectid}")
        let gprojObjects = await this.gplotService.getByProject(projectid);
        return res.status(HttpStatus.OK).json(gprojObjects);
    }

    @Post('/gPlots')
    async createGPlot(@Body() createGPlotDto: CreateGPlotDTO) {
        const plot = await this.gplotService.create(createGPlotDto);
        return plot;
    }

    // --- for growingSesion
    @Get("/growing/all")
    async GetAllGrowingSeason(@Res() res: Response) {
        console.log("plot controller : GetAllGrowingSeason()");
        let allObjects= await this.growingSeasonService.getAll();

        return res.status(HttpStatus.OK).json(allObjects);
    }

    @Get('/growing/:id')
    async GetGrowingSeasonById(@Param('id') growingSeasionId: number,
                     @Res() res: Response) {
        console.log("plot controller: get GetGrowingSeasonById " + growingSeasionId)
        let growingjObj = await this.growingSeasonService.getById(growingSeasionId);
        return res.status(HttpStatus.OK).json(growingjObj);
    }
    @Post('growing')
    async createGrowingSeason(@Body() createGrowingSeasonDto: CreateGrowingSeasonDTO) {
        const growingSeason = await this.growingSeasonService.create(createGrowingSeasonDto);
        return growingSeason;
    }
}