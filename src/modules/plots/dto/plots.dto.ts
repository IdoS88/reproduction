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
}

export class UpdatePlotDTO extends PartialType(CreatePlotDTO){};