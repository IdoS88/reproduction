import { PartialType } from '@nestjs/mapped-types';
import { CreateCropsKindDto } from './create-cropsKind.dto';

export class UpdateCropsKindDto extends PartialType(CreateCropsKindDto) {}
