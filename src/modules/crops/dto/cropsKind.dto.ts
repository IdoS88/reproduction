import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateCropsKindDto {
    @ApiProperty()
    name: string;
}

export class UpdateCropsKindDto extends PartialType(CreateCropsKindDto) {}