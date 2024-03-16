import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

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

export class SaveAndAnalysisImageRequest {
  @ApiProperty({
    type: String,
  })
  @IsString()
  imgData: string;
}

export class SaveAndAnalysisImageResponse {
  @ApiProperty({
    type: Number,
  })
  class: number;

  @ApiProperty({
    type: Number,
  })
  confidence: number;
}
