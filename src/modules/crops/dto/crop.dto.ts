import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsArray, IsNumber } from 'class-validator';
export class CreateCropDto {
    @ApiProperty()
    name: string;
    
    @ApiProperty()
    color: string;

    @ApiProperty()
    typeId: number;
}

export class UpdateCropDto extends PartialType(CreateCropDto) {}
