import { Module } from '@nestjs/common';
import { TypeOrmModule} from '@nestjs/typeorm';
import { Project } from './entities/projects.entity';
import { ProjectsService } from './services/projects.service';
import { ProjectsController } from './projects.controllers';
//import { ProjectAccessService } from './services/projectAccess.service';

@Module({
    imports: [TypeOrmModule.forFeature([Project])],
   // providers: [ProjectService, ...ProjectProviders],
    providers: [ProjectsService],
    controllers: [ProjectsController],
    exports: [ProjectsService, TypeOrmModule],
  })
  export class ProjectsModule {}

  