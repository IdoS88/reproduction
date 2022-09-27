import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateCropTypeDto {
    @ApiProperty()
    name: string;
}

export class UpdateCropTypeDto extends PartialType(CreateCropTypeDto) {}