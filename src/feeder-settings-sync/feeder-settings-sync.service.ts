import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import type { FeederSetting } from '@prisma/client';
import { plainToInstance } from 'class-transformer';
import { FeederSettingsRepository } from 'src/feeder-settings/feeder-settings.repository';
import { SendMachineConfigurationsDTO } from 'src/mqtt/dtos/send/send-machine-configurations.dto';
import { MqttService } from 'src/mqtt/mqtt.service';

@Injectable()
export class FeederSettingsSyncService {
  constructor(
    private readonly mqttService: MqttService,
    private readonly feedderSettingsRepository: FeederSettingsRepository,
  ) {}

  @OnEvent('feeder-settings.created')
  async handleNewConfig(created: FeederSetting) {
    await this.mqttService.sendMachineConfigurations(
      plainToInstance(SendMachineConfigurationsDTO, created),
    );
  }

  async syncLatestConfig() {
    const latest = await this.feedderSettingsRepository.findLast();
    if (!latest) return;
    await this.mqttService.sendMachineConfigurations(
      plainToInstance(SendMachineConfigurationsDTO, latest),
    );
  }
}
