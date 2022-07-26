import { ApiProperty } from '@nestjs/swagger';

export class CreateCropsKindDto {
    @ApiProperty()
    name: string;
}
