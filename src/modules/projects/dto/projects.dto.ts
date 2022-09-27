import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { IsArray, IsNumber } from 'class-validator';

export class CreateProjectDTO {
    @ApiProperty()
    name : string;

    @ApiProperty()
    iconSrc : string;
}

export class UpdateProjectDTO extends PartialType(CreateProjectDTO) {
    @ApiProperty({ isArray: true })
    @IsNumber({}, { each: true })
    @IsArray()
    CropStrainIds: number[];
};

