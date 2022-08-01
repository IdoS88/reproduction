import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';


export class CreateUnitDto  {
    @ApiProperty()
    name: string;

    @ApiProperty()
    familyid: number;
};

export class UpdateUnitDto extends PartialType(CreateUnitDto) {};