import { Module } from '@nestjs/common';
import { TypeOrmModule} from '@nestjs/typeorm';
import { CropsController, CropsKindController, CropsStrainController } from './crops.controller';
import { CropsKindService } from './services/cropsKind.service';
import { CropsService } from './services/crops.service';
import { CropsStrainService } from './services/cropsStrain.service';
import { CropsKind } from './entities/cropsKind.entity';
import { Crops } from './entities/crop.entity';
import { CropsStrain } from './entities/cropsStrain.entity';
import { CropsValidator } from './services/crops.validator';

@Module({
  imports: [TypeOrmModule.forFeature([CropsKind, Crops, CropsStrain])],
  controllers: [CropsKindController, CropsController, CropsStrainController],
  providers: [CropsKindService, CropsService, CropsStrainService,
              CropsValidator],
  exports:[CropsStrainService]
})
export class CropsModule {}
