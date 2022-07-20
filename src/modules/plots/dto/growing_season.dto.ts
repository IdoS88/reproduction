import { ApiProperty } from "@nestjs/swagger";

export class CreateGrowingSeasonDTO {
    @ApiProperty()
    projectId : number; 

    @ApiProperty()
    name : string;
    
    @ApiProperty()
    startDate: Date;

    @ApiProperty()
    endDate: Date;
}

export class UpdateGrowingSeasonDTO {
    @ApiProperty()
    id: number;

    @ApiProperty()
    projectId : number; 
    
    @ApiProperty()
    name : string;
    
    @ApiProperty()
    startDate: Date;
    
    @ApiProperty()
    endDate: Date;
}