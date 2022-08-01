import { Module } from '@nestjs/common';
import { TypeOrmModule} from '@nestjs/typeorm';
import { UnitsService } from './services/units.service';
import { UnitsFamilyService } from './services/unitsfamily.service';
import { UnitsController, UnitsFamilyController } from './units.controller';
import { Unit } from './entities/unit.entity';
import { UnitsFamily } from './entities/unitsFamily.entity';

@Module({
  controllers: [UnitsController, UnitsFamilyController],
  providers: [UnitsService, UnitsFamilyService],
  imports: [TypeOrmModule.forFeature([Unit, UnitsFamily])]
})
export class UnitsModule {}
