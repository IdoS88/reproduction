import { ApiProperty } from "@nestjs/swagger";

export class CreateCropsStrainDto {
    @ApiProperty()
    name: string;
    
    @ApiProperty()
    color: string;
    
    @ApiProperty()
    cropId: number;
}
