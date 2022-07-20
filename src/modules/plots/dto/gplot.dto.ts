import { ApiProperty } from '@nestjs/swagger';

export class CreateGPlotDTO {
    @ApiProperty()
    projectid : number;  

    @ApiProperty()
    gplot_name : string;
}

export class UpdateGPlotDTO {
    @ApiProperty()
    id: number;

    @ApiProperty()
    projectid : number;  

    @ApiProperty()
    gplot_name : string;
}