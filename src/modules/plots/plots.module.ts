import { Module } from '@nestjs/common';
import { TypeOrmModule} from '@nestjs/typeorm';
import { Plots } from './entities/plots.entity';
import { gPlot } from './entities/gplot.entity';
import { GrowingSeason } from './entities/growing_season.entity';
import { PlotsService } from './services/plots.service';
import { gPlotService } from './services/gplot.service';
import { GrowingSeasonService } from './services/growing_season.service';
import { PlotController } from './plots.controllers';

@Module({
    imports: [TypeOrmModule.forFeature([Plots, gPlot, GrowingSeason])],
   // providers: [ProjectService, ...ProjectProviders],
    providers: [gPlotService, PlotsService, GrowingSeasonService],
    controllers: [PlotController],
    exports: [gPlotService, PlotsService, GrowingSeasonService],
  })
  export class PlotsModule {}

  