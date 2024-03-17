import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { ImageEntity } from './entity/image.entity';
import {
  AiAnalysisLogEntity,
  AnalysisResult,
} from './entity/aiAnalysisLog.entity';

@Injectable()
export class AppService {
  constructor(private readonly prismaService: PrismaService) {}

  async createAnalysisLog(
    filePath: string,
    analysisResult: AnalysisResult,
    requestTime: Date,
    responseTime: Date,
  ): Promise<void> {
    await this.prismaService.aiAnalysisLog.create({
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

  async getResultList(limit = 10): Promise<AiAnalysisLogEntity[]> {
    return await this.prismaService.aiAnalysisLog.findMany({
      take: limit,
      orderBy: {
        id: 'desc',
      },
    });
  }

  async createImage(filePath: string, imgDataString: string): Promise<void> {
    const base64Data = imgDataString.replace(/^data:image\/\w+;base64,/, '');
    await this.prismaService.images.create({
      data: {
        filePath,
        data: Buffer.from(base64Data, 'base64'),
      },
    });
  }

  async getImage(filePath: string): Promise<ImageEntity> {
    const img = await this.prismaService.images.findUnique({
      where: {
        filePath: filePath,
      },
    });

    return {
      ...img,
      data: img?.data.toString('base64'),
    };
  }
}
