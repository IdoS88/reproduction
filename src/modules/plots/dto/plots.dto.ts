//sivan: TODO :
// handle optionsl columns nullables

import { OmitType, PartialType } from "@nestjs/mapped-types";
import { Type } from "class-transformer";
import { IsInt, IsNotEmpty, IsOptional } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class CreatePlotDTO {
   // @ApiProperty()
   // @IsNotEmpty() 
   // projectId : number;
    
    
    @ApiProperty()
    crop_strainId : number;
    
    @ApiProperty()
    seasonId: number;
    
    @ApiProperty()
    main_gplotId: number;
    
    @ApiProperty()
    startDate: Date;
    
    @ApiProperty()
    endDate: Date;
}

export class UpdatePlotDTO extends PartialType(CreatePlotDTO){};

export class FilterPlotQueryDTO{
    @ApiProperty()
    @IsInt()
    @Type(() => Number)
    projectId: number;
    
    @ApiProperty()
    @IsInt()
    @Type(() => Number)
    @IsOptional()
    crop_strainId : number;

    @ApiProperty()
    @IsInt()
    @Type(() => Number)
    @IsOptional()
    sessionId: number;

    @ApiProperty()
    @IsInt()
    @Type(() => Number)
    @IsOptional()
    main_gplotId: number;

    @ApiProperty()
    @IsOptional()
    dates: Date[];
}