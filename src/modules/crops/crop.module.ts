
import { Module } from '@nestjs/common';
import { TypeOrmModule} from '@nestjs/typeorm';
import { CropType } from './entities/CropType.entity';
import { Crop } from './entities/crop.entity';
import { CropStrain } from './entities/CropStrain.entity';
import {CropStrainController} from './controllers/cropStrain.controller'
import {CropController} from './controllers/crop.controller'
import { CropStrainService } from './services/cropStrain.service';
import { CropService } from './services/crop.service';
import {CropsConnectionService} from './services/crops.connection.service'
import { CropTypeController } from './controllers/cropType.controller';
import { CropTypeService } from './services/cropType.service';

@Module({
    imports: [TypeOrmModule.forFeature([CropType, Crop, CropStrain])],
    controllers: [CropStrainController, CropController, CropTypeController],
    providers: [CropStrainService,CropService, CropTypeService, CropsConnectionService],
    exports:[]
  })
  export class CropModule {}