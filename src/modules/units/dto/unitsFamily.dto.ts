import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUnitsFamilyDto {
    @ApiProperty()
    name: string;
}

export class UpdateUnitsFamilyDto extends PartialType(CreateUnitsFamilyDto) {}