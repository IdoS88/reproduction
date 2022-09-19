import { Module } from '@nestjs/common';
import { TypeOrmModule} from '@nestjs/typeorm';
import { Plots } from './entities/plots.entity';
import { gPlot } from './entities/gplot.entity';
import { GrowingSeason } from './entities/growing_season.entity';
import { PlotsService } from './services/plots.service';
import { gPlotService } from './services/gplot.service';
import { GrowingSeasonService } from './services/growing_season.service';
import { PlotController,gPlotController, growingController } from './plots.controllers';
import { ProjectsModule } from '../projects/projects.module';
import { PlotValidator } from './services/plots.validator';

@Module({
    imports: [TypeOrmModule.forFeature([Plots, gPlot, GrowingSeason]),
              ProjectsModule],
   // providers: [ProjectService, ...ProjectProviders],
    providers: [gPlotService, PlotsService, GrowingSeasonService,
              PlotValidator],
    controllers: [PlotController, gPlotController, growingController ],
    exports: [gPlotService, PlotsService, GrowingSeasonService],
  })
  export class PlotsModule {}

  