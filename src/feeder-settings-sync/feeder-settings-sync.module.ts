import { Module } from '@nestjs/common';
import { FeederSettingsSyncService } from './feeder-settings-sync.service';
import { FeederSettingsSyncScheduler } from './feeder-settings-sync.scheduler';
import { MqttModule } from 'src/mqtt/mqtt.module';
import { FeederSettingsModule } from 'src/feeder-settings/feeder-settings.module';

@Module({
  imports: [MqttModule, FeederSettingsModule],
  providers: [FeederSettingsSyncService, FeederSettingsSyncScheduler],
})
export class FeederSettingsSyncModule {}
