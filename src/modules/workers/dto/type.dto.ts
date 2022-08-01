import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTypeDto {
    @ApiProperty()
    name: string;
}

export class UpdateTypeDto extends PartialType(CreateTypeDto) {}