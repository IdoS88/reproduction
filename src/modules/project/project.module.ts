import { Module } from '@nestjs/common';
import { TypeOrmModule} from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { ProjectService } from './services/project.service';
import { ProjectController } from './project.controllers';

@Module({
    imports: [TypeOrmModule.forFeature([Project])],
   // providers: [ProjectService, ...ProjectProviders],
    providers: [ProjectService],
    controllers: [ProjectController],
    exports: [ProjectService],
  })
  export class ProjectsModule {}

  