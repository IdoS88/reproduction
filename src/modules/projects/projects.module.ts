import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule} from '@nestjs/typeorm';
import { Project } from './entities/projects.entity';
import { ProjectsService } from './services/projects.service';
import { ProjectsController } from './projects.controllers';
import { CropStrain } from '../crops/entities/cropStrain.entity';
import { CropModule } from  'src/modules/crops/crop.module';
import { ProjectValidator } from './services/projects.validator';
//import { CropStrainService } from '../crops/services/cropStrain.service';
//import { CropService } from '../crops/services/crop.service';
import { CropsConnectionService } from '../crops/services/crops.connection.service';
//import { ProjectAccessService } from './services/projectAccess.service';

@Module({
    imports: [TypeOrmModule.forFeature([Project, CropStrain]),
              forwardRef(()=>CropModule)],
   // providers: [ProjectService, ...ProjectProviders],
    providers: [ProjectValidator,ProjectsService, 
                CropsConnectionService],
    controllers: [ProjectsController],
    exports: [ProjectsService],
  })
  export class ProjectsModule {}

  