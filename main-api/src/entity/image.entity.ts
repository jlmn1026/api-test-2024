import { ApiProperty } from '@nestjs/swagger';

export class ImageEntity {
  @ApiProperty({
    type: String,
    nullable: true,
  })
  filePath?: string;

  @ApiProperty({
    type: String,
    nullable: true,
  })
  data: string;
}
