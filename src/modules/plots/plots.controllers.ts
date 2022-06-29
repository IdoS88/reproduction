import { Controller , Res, Get, Param, Post, Body, Delete, Query, HttpStatus} from '@nestjs/common';
import { Response } from 'express';
//import { Request } from 'express';
import { PlotsService } from "./services/plots.service";
import { gPlotService } from "./services/gplot.service";
import { GrowingSeasonService } from "./services/growing_season.service";
import { CreatePlotDTO } from "./dto/plots.dto";
import { CreateGPlotDTO } from "./dto/gplot.dto";
import { CreateGrowingSeasonDTO } from "./dto/growing_season.dto";

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

    @Get('/gPlots/:id')
    async GetGPlotById(@Param('id') gplotid: number,
                     @Res() res: Response) {
        console.log("plot controller: get GetGPlotById " + gplotid)
        let gprojObj = await this.gplotService.getById(gplotid);
        return res.status(HttpStatus.OK).json(gprojObj);
    }
    @Post()
    async createGPlot(@Body() createGPlotDto: CreateGPlotDTO) {
        const plot = await this.gplotService.create(createGPlotDto);
        return plot;
    }


}