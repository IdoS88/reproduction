import { Module } from '@nestjs/common';
import { TypeOrmModule} from '@nestjs/typeorm';
import { Tool } from './entities/tools.entity';
import { ToolType } from './entities/toolTypes.entity';
import { ToolsTypesService } from './services/toolsTypes.service';
import { ToolsService } from './services/tools.service';
import { ToolsController } from './tools.controller';


@Module({
  imports: [TypeOrmModule.forFeature([Tool, ToolType])],
  controllers: [ToolsController],
  providers: [ToolsService, ToolsTypesService],
  
})
export class ToolsModule {}
