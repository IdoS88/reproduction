import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateProjectDTO {
    @ApiProperty()
    name : string;

    @ApiProperty()
    iconSrc : string;
}

export class UpdateProjectDTO extends PartialType(CreateProjectDTO) {};