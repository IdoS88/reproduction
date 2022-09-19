//sivan: TODO :
// handle optionsl columns nullables
import { Type } from "class-transformer";
import { IsInt, IsNotEmpty, IsOptional } from "class-validator";
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreatePlotDTO {
   // @ApiProperty()
   // @IsNotEmpty() 
   // projectId : number;
    
    
    @ApiProperty()
    @IsOptional()
    crop_strainId : number;
    
    @ApiProperty()
    @IsOptional()
    seasonId: number;
    
    @ApiProperty()
    @IsOptional()
    main_gplotId: number;
    
    @ApiProperty()
    startDate: Date;
    
    @ApiProperty()
    endDate: Date;
}

export class UpdatePlotDTO extends PartialType(CreatePlotDTO){};