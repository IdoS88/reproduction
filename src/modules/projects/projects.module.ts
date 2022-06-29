import { Module } from '@nestjs/common';
import { TypeOrmModule} from '@nestjs/typeorm';
import { Projects } from './entities/projects.entity';
import { ProjectsService } from './services/projects.service';
import { ProjectsController } from './projects.controllers';

@Module({
    imports: [TypeOrmModule.forFeature([Projects])],
   // providers: [ProjectService, ...ProjectProviders],
    providers: [ProjectsService],
    controllers: [ProjectsController],
    exports: [ProjectsService],
  })
  export class ProjectsModule {}

  