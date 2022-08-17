import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';

export class CreateWorkerTypeDto {
    @ApiProperty()
    name: string;

    @ApiProperty()
    workesIds: number[];
}

export class UpdateWorkerTypeDto extends PartialType(CreateWorkerTypeDto) {}