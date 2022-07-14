import { Module } from '@nestjs/common';
import { TypeOrmModule} from '@nestjs/typeorm';
import { WorkersController } from './workers_tools.controller';
import { WorkersService } from './services/workers.service';
import { Worker } from './entities/workers.entity';
import { ToolsController } from './workers_tools.controller';
import { ToolsService } from './services/tools.service';
import { Tool } from './entities/tools.entity';
import { TypesController } from './workers_tools.controller';
import { TypesService } from './services/types.service';
import { Type } from './entities/types.entity';

@Module({
  controllers: [WorkersController, ToolsController, TypesController],
  providers: [WorkersService, ToolsService, TypesService],
  imports: [TypeOrmModule.forFeature([Worker, Tool, Type])],
})
export class WorkersToolsModule {}
