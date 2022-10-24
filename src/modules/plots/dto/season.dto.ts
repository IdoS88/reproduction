import { ApiProperty, PartialType } from "@nestjs/swagger";

export class CreateSeasonDTO {

    @ApiProperty()
    name : string; 
}

export class UpdateSeasonDTO extends PartialType(CreateSeasonDTO) {};
