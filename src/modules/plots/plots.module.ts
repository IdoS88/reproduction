import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule} from '@nestjs/typeorm';
import { Plots } from './entities/plots.entity';
import { PlotStrain } from './entities/plotStrain.entity';
import { Season } from './entities/season.entity';
import { PlotsService } from './services/plots.service';
import { PlotStrainService } from './services/plotStrain.service';
import { SeasonService } from './services/season.service';
import { PlotController,PlotStrainController, seasonController } from './plots.controllers';
import { ProjectsModule }from 'src/modules/projects/projects.module';
import { PlotValidator } from './services/plots.validator';
//import { PlotsConnection } from './entities/plotsConnection.entity';
import { PlotConnectionService } from './services/plots.connection.service';

@Module({
    imports: [TypeOrmModule.forFeature([Plots, PlotStrain, Season]),
              forwardRef(() =>ProjectsModule)],
   // providers: [ProjectService, ...ProjectProviders],
   providers: [PlotConnectionService, PlotStrainService, PlotsService, SeasonService,
              PlotValidator],
    controllers: [PlotController, PlotStrainController, seasonController ],
    exports: [PlotStrainService, PlotsService, SeasonService],
  })
  export class PlotsModule {}

  