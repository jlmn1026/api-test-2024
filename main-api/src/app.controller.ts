import { Body, Controller, Get, HttpCode, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { AiAnalysisLogEntity } from './entity/aiAnalysisLog.entity';
import { ApiResponse, ApiTags, ApiBody } from '@nestjs/swagger';
import { v4 as uuidv4 } from 'uuid';
import { SaveAndAnalysisImageRequest } from './app.dto';
import { ImageEntity } from './entity/image.entity';

@ApiTags('app')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/latest-results')
  @ApiResponse({ status: 200, type: [AiAnalysisLogEntity] })
  async getLatestResults(): Promise<AiAnalysisLogEntity[]> {
    return this.appService.getResultList();
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

    await this.appService.createImage(filePath, body.imgData);

    const analysisResult = await fetch('http://localhost:8000/api/', {
      method: 'POST',
      body: JSON.stringify({ image_path: filePath }), // S3のバケットパスなどを想定
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => {
      return res.json();
    });

    await this.appService.createAnalysisLog(
      filePath,
      analysisResult,
      requestTime,
      new Date(),
    );
  }

  @Get('/image/:filename')
  @ApiResponse({ status: 200, type: ImageEntity })
  async getImage(@Param('filename') filename: string): Promise<ImageEntity> {
    return await this.appService.getImage(filename);
  }
}
