import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { AiAnalysisLogModel } from './entity/aiAnalysisLog.entity';

@Controller()
export class AppController {
  constructor(
    private readonly prisma: PrismaService,
    private readonly appService: AppService,
  ) {}

  @Get('/all-results')
  async getAllResults(): Promise<AiAnalysisLogModel[]> {
    return await this.prisma.aiAnalysisLog.findMany();
  }
}
