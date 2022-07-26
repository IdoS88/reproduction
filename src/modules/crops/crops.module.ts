import { Module } from '@nestjs/common';
import { TypeOrmModule} from '@nestjs/typeorm';
import { CropsController, CropsKindController, CropsStrainController } from './crops.controller';
import { CropsKindService } from './services/cropsKind.service';
import { CropsService } from './services/crops.service';
import { CropsStrainService } from './services/cropsStrain.service';
import { CropsKind } from './entities/cropsKind.entity';
import { Crops } from './entities/crop.entity';
import { CropsStrain } from './entities/cropsStrain.entity';

@Module({
  controllers: [CropsKindController, CropsController, CropsStrainController],
  providers: [CropsKindService, CropsService, CropsStrainService],
  imports: [TypeOrmModule.forFeature([CropsKind, Crops, CropsStrain])],
})
export class CropsModule {}
