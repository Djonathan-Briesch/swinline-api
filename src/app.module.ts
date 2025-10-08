import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { MqttModule } from './mqtt/mqtt.module';
import { MqttListener } from './mqtt/mqtt.listener';
import { FeederSettingsModule } from './feeder-settings/feeder-settings.module';
@Module({
  imports: [PrismaModule, MqttModule, FeederSettingsModule],
  controllers: [MqttListener],
  providers: [],
})
export class AppModule {}
