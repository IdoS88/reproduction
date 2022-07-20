import { ApiProperty } from '@nestjs/swagger';

export class CreateProjectDTO {
    @ApiProperty()
    name : string;

    @ApiProperty()
    iconSrc : string;
}

export class UpdateProjectDTO {
    @ApiProperty({
        description: 'Project unique key',
        minimum: 1,
        default: null,
      })
    id: number;

    @ApiProperty()
    name : string;
    
    @ApiProperty()
    iconSrc : string;
}