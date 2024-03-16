import { ApiProperty } from '@nestjs/swagger';

export class GetImageResponse {
  @ApiProperty({
    type: String,
  })
  filename: string;

  @ApiProperty({
    type: String,
  })
  imageBase64: string;
}
