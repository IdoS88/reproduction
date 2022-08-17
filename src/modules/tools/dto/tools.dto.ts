import { PartialType } from "@nestjs/mapped-types";
import { ApiProperty } from "@nestjs/swagger";

export class CreateToolDto {
    @ApiProperty()
    name: string;

    @ApiProperty()
    typesIds: number[]; //update throw many-to-many relation

}

export class UpdateToolDto extends PartialType(CreateToolDto) {}