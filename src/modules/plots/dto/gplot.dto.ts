import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateGPlotDTO {
    @ApiProperty()
    projectid : number;  

    @ApiProperty()
    gplot_name : string;
}

export class UpdateGPlotDTO extends PartialType(CreateGPlotDTO) {};