import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { AiAnalysisLogEntity } from './entity/aiAnalysisLog.entity';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

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
}
