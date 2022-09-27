import { ApiProperty, PartialType } from "@nestjs/swagger";

export class CreateCropStrainDto {
    @ApiProperty()
    name: string;
    
    @ApiProperty()
    color: string;
    
    @ApiProperty()
    cropId: number;
}

export class UpdateCropStrainDto extends PartialType(CreateCropStrainDto) {}
