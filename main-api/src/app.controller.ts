import { Body, Controller, Get, HttpCode, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { AiAnalysisLogEntity } from './entity/aiAnalysisLog.entity';
import { ApiResponse, ApiTags, ApiBody } from '@nestjs/swagger';
import { v4 as uuidv4 } from 'uuid';
import { SaveAndAnalysisImageRequest } from './app.dto';
import { ImageEntity } from './entity/image.entity';

@ApiTags('app')
@Controller()
export class AppController {
  constructor(
    private readonly prisma: PrismaService,
    private readonly appService: AppService,
  ) {}

  @Get('/latest-results')
  @ApiResponse({ status: 200, type: [AiAnalysisLogEntity] })
  async getLatestResults(): Promise<AiAnalysisLogEntity[]> {
    return await this.prisma.aiAnalysisLog.findMany({
      take: 10,
      orderBy: {
        requestTimestamp: 'desc',
      },
    });
  }

  @Post('/save-analysis-image')
  @ApiBody({ type: SaveAndAnalysisImageRequest })
  @ApiResponse({ status: 200 })
  @HttpCode(201)
  async saveAndAnalysisImage(
    @Body() body: SaveAndAnalysisImageRequest,
  ): Promise<void> {
    const requestTime = new Date();
    const filePath = uuidv4();

    const base64Data = body.imgData.replace(/^data:image\/\w+;base64,/, '');
    await this.prisma.images.create({
      data: {
        filePath,
        data: Buffer.from(base64Data, 'base64'),
      },
    });

    const analysisResult = await fetch('http://localhost:8000/api/', {
      method: 'POST',
      body: JSON.stringify({ image_path: filePath }), // S3のバケットパスなどを想定
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => {
      return res.json();
    });
    const responseTime = new Date();
    console.log(analysisResult);
    await this.prisma.aiAnalysisLog.create({
      data: {
        class: analysisResult.estimated_data.class,
        confidence: analysisResult.estimated_data.confidence,
        imagePath: filePath,
        success: analysisResult.success ? 'success' : 'false',
        message: analysisResult.message,
        requestTimestamp: requestTime,
        responseTimestamp: responseTime,
      },
    });
  }

  @Get('/image/:filename')
  @ApiResponse({ status: 200, type: ImageEntity })
  async getImage(@Param('filename') filename: string): Promise<ImageEntity> {
    const img = await this.prisma.images.findFirst({
      where: {
        filePath: filename,
      },
    });

    return {
      ...img,
      data: img?.data.toString('base64'),
    };
  }
}
