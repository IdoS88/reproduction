import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';

export class CreateToolTypeDto {
    @ApiProperty()
    name: string;

    @ApiProperty()
    toolsIds: number[];
}

export class UpdateToolTypeDto extends PartialType(CreateToolTypeDto) {}