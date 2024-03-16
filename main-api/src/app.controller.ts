import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { AiAnalysisLogEntity } from './entity/aiAnalysisLog.entity';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import * as fs from 'fs';
import * as path from 'path';
import { GetImageResponse } from './app.dto';

@ApiTags('app')
@Controller()
export class AppController {
  constructor(
    private readonly prisma: PrismaService,
    private readonly appService: AppService,
  ) {}

  @Get('/all-results')
  @ApiResponse({ status: 200, type: [AiAnalysisLogEntity] })
  async getAllResults(): Promise<AiAnalysisLogEntity[]> {
    return await this.prisma.aiAnalysisLog.findMany();
  }

  @Get('/all-images')
  @ApiResponse({ status: 200, type: [GetImageResponse] })
  async getAllImages(): Promise<GetImageResponse[]> {
    return ['A.png', 'B.png', 'C.png'].map((filename) => {
      const imagePath = path.resolve(`../main-api/images/${filename}`);
      const image = fs.readFileSync(imagePath);
      const imageBase64 = Buffer.from(image).toString('base64');
      return {
        filename,
        imageBase64,
      };
    });
  }
}
