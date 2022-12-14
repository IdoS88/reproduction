import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';

export class CreateWorkerDto {
    @ApiProperty()
    name: string;
    
    @ApiProperty()
    typesIds: number[];
}

export class UpdateWorkerDto extends PartialType(CreateWorkerDto) {}