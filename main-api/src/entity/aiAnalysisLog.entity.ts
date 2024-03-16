import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';

export class AiAnalysisLogEntity {
  @ApiProperty({
    type: Number,
  })
  id: number;

  @ApiProperty({
    type: String,
    nullable: true,
  })
  imagePath?: string;

  @ApiProperty({
    type: String,
    nullable: true,
  })
  success?: string;

  @ApiProperty({
    type: String,
    nullable: true,
  })
  message?: string;

  @ApiProperty({
    type: String,
    nullable: true,
  })
  class?: number;

  @ApiProperty({
    type: Number,
    nullable: true,
  })
  confidence?: Prisma.Decimal;

  @ApiProperty({
    type: Date,
    nullable: true,
  })
  requestTimestamp?: Date;

  @ApiProperty({
    type: Date,
    nullable: true,
  })
  responseTimestamp?: Date;
}
