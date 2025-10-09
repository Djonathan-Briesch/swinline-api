import { Injectable } from '@nestjs/common';
import { CreateFeederSettingDto } from './dto/create-feeder-setting.dto';
import { FeederSettingsRepository } from './feeder-settings.repository';
import { FeederSetting } from '@prisma/client';
import { MqttService } from 'src/mqtt/mqtt.service';
import { SendMachineConfigurationsDTO } from 'src/mqtt/dtos/send/send-machine-configurations.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class FeederSettingsService {
  constructor(
    private readonly feederSettingsRepository: FeederSettingsRepository,
    private readonly mqttService: MqttService,
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

    await this.mqttService.sendMachineConfigurations(
      plainToInstance(SendMachineConfigurationsDTO, created),
    );

    return { id: created.id };
  }
}
