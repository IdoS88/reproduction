import { ApiProperty } from '@nestjs/swagger';
export class CreateCropDto {
    @ApiProperty()
    name: string;
    
    @ApiProperty()
    color: string;

    @ApiProperty()
    kindId: number;
}
