import { ApiProperty, OmitType, PartialType } from "@nestjs/swagger";

export class CreateGrowingSeasonDTO {
   // @ApiProperty()
   // projectId : number; 

    @ApiProperty()
    name : string;
    
    @ApiProperty()
    startDate: Date;

    @ApiProperty()
    endDate: Date;
}

export class UpdateGrowingSeasonDTO extends PartialType(CreateGrowingSeasonDTO) {};
