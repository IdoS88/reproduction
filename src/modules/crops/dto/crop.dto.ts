import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsArray, IsNumber } from 'class-validator';
export class CreateCropDto {
    @ApiProperty()
    name: string;
    
    @ApiProperty()
    color: string;

    @ApiProperty()
    kindId: number;
}

export class UpdateCropDto extends PartialType(CreateCropDto) {
    @ApiProperty({ isArray: true })
    @IsNumber({}, { each: true })
    @IsArray()
    cropsStrainIds: number[];
}
