import { PartialType } from "@nestjs/mapped-types";
import { ApiProperty } from "@nestjs/swagger";

export class CreateToolDto {
    @ApiProperty()
    name: string;

    @ApiProperty()
    projectid: number;

    @ApiProperty()
    typesid: number[];
}

export class UpdateToolDto extends PartialType(CreateToolDto) {}