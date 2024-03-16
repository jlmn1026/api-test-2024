import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';

@Controller()
export class AppController {
  constructor(
    private readonly prisma: PrismaService,
    private readonly appService: AppService,
  ) {}

  @Get('/all-results')
  async getAllResults(): Promise<any> {
    return await this.prisma.aiAnalysisLog.findMany();
  }
}
