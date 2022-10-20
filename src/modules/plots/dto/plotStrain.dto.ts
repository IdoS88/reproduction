import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional } from "class-validator";

export class CreatePlotStrainDTO {
    //@ApiProperty()
    //projectid : number;  

    @ApiProperty()
    @IsOptional()
    name : string;
    
    @ApiProperty()
    @IsOptional()
    number: number;
    
    @ApiProperty()
    @IsOptional()
    area: number;
    
    @ApiProperty()
    @IsOptional()
    remarks: string;
    
    @ApiProperty()
    @IsOptional()
    geomId: number;

    @ApiProperty()
    @IsOptional()
    cropStrainId: number;
    
    @ApiProperty()
    @IsOptional()
    plotsIds: number[];

    @ApiProperty()
    @IsOptional()
    mainPlotId: number;

    @ApiProperty()
    @IsOptional()
    seasonId: number;

    @ApiProperty()
    @IsOptional()
    startDate: number;

    @ApiProperty()
    @IsOptional()
    endDate: number;

}

export class UpdatePlotStrainDTO extends PartialType(CreatePlotStrainDTO) {};