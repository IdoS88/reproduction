import { Module } from '@nestjs/common';
import { TypeOrmModule} from '@nestjs/typeorm';
import { Worker } from './entities/workers.entity';
import { WorkerType } from './entities/workerTypes.entity';
import { workerTypesService } from './services/workerTypes.service';
import { WorkersService } from './services/workers.service';
import { WorkersController, WorkersTypesController } from './workers.controller';


@Module({
  imports: [TypeOrmModule.forFeature([Worker, WorkerType])],
  controllers: [WorkersController, WorkersTypesController],
  providers: [WorkersService, workerTypesService],
  
})
export class WorkersModule {}
