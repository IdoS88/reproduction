import { Module } from '@nestjs/common';
import { TypeOrmModule} from '@nestjs/typeorm';
import { Plot } from './entities/plot.entity';
import { gPlot } from './entities/gplot.entity';
import { GrowingSeason } from './entities/growing_season.entity';
import { PlotService } from './services/plot.service';
import { gPlotService } from './services/gplot.service';
import { GrowingSeasonService } from './services/growing_season.service';
import { PlotController } from './plot.controllers';

@Module({
    imports: [TypeOrmModule.forFeature([Plot, gPlot, GrowingSeason])],
   // providers: [ProjectService, ...ProjectProviders],
    providers: [gPlotService, PlotService, GrowingSeasonService],
    controllers: [PlotController],
    exports: [gPlotService, PlotService, GrowingSeasonService],
  })
  export class PlotsModule {}

  