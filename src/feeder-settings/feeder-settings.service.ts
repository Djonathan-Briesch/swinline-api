import { Injectable } from '@nestjs/common';
import { CreateFeederSettingDto } from './dto/create-feeder-setting.dto';
import { FeederSettingsRepository } from './feeder-settings.repository';
import { FeederSetting } from '@prisma/client';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class FeederSettingsService {
  constructor(
    private readonly feederSettingsRepository: FeederSettingsRepository,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async findLast(): Promise<FeederSetting | null> {
    return await this.feederSettingsRepository.findLast();
  }

  async create(
    createFeederSettingDto: CreateFeederSettingDto,
  ): Promise<{ id: number }> {
    const created = await this.feederSettingsRepository.create(
      createFeederSettingDto,
    );

    const b = this.eventEmitter.emit('feeder-settings.created', created);
    if (b) {
      console.log('enviou');
    } else {
      console.log('n enviou');
    }
    return { id: created.id };
  }
}
