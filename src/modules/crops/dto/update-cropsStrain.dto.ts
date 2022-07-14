import { PartialType } from '@nestjs/mapped-types';
import { CreateCropsStrainDto } from './create-cropsStrain.dto';

export class UpdateCropsStrainDto extends PartialType(CreateCropsStrainDto) {}
