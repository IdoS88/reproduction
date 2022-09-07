import { Module } from '@nestjs/common';
import { TypeOrmModule} from '@nestjs/typeorm';
import { Project } from './entities/projects.entity';
import { ProjectsService } from './services/projects.service';
import { ProjectsController } from './projects.controllers';
import { CropsStrain } from '../crops/entities/cropsStrain.entity';
import { CropsModule } from '../crops/crops.module';
//import { ProjectAccessService } from './services/projectAccess.service';

@Module({
    imports: [TypeOrmModule.forFeature([Project, CropsStrain]),
              CropsModule],
   // providers: [ProjectService, ...ProjectProviders],
    providers: [ProjectsService],
    controllers: [ProjectsController],
    exports: [ProjectsService],
  })
  export class ProjectsModule {}

  