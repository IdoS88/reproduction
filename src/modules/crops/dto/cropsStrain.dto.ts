import { ApiProperty, PartialType } from "@nestjs/swagger";

export class CreateCropsStrainDto {
    @ApiProperty()
    name: string;
    
    @ApiProperty()
    color: string;
    
    @ApiProperty()
    cropId: number;
}

export class UpdateCropsStrainDto extends PartialType(CreateCropsStrainDto) {}
