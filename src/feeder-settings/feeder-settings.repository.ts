import { Injectable } from '@nestjs/common';
import { FeederSetting } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateFeederSettingDto } from './dto/create-feeder-setting.dto';

@Injectable()
export class FeederSettingsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findLast(): Promise<FeederSetting | null> {
    return await this.prisma.feederSetting.findFirst({
      orderBy: {
        id: 'desc',
      },
    });
  }

  async create(
    createFeederSettingDto: CreateFeederSettingDto,
  ): Promise<FeederSetting> {
    return await this.prisma.feederSetting.create({
      data: createFeederSettingDto,
    });
  }
}
