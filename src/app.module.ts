import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { MqttModule } from './mqtt/mqtt.module';
import { MqttListener } from './mqtt/mqtt.listener';
import { FeederSettingsModule } from './feeder-settings/feeder-settings.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ScheduleModule } from '@nestjs/schedule';
import { FeederSettingsSyncModule } from './feeder-settings-sync/feeder-settings-sync.module';
@Module({
  imports: [
    PrismaModule,
    MqttModule,
    FeederSettingsModule,
    FeederSettingsSyncModule,
    EventEmitterModule.forRoot(),
    ScheduleModule.forRoot(),
  ],
  controllers: [MqttListener],
  providers: [],
})
export class AppModule {}
