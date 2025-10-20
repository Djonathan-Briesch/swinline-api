import { Module } from '@nestjs/common';
import { FeederSettingsService } from './feeder-settings.service';
import { FeederSettingsController } from './feeder-settings.controller';
import { FeederSettingsRepository } from './feeder-settings.repository';
import { PrismaService } from 'src/prisma/prisma.service';
import { MqttModule } from 'src/mqtt/mqtt.module';

@Module({
  imports: [MqttModule],
  controllers: [FeederSettingsController],
  providers: [FeederSettingsService, FeederSettingsRepository, PrismaService],
  exports: [FeederSettingsRepository, FeederSettingsService],
})
export class FeederSettingsModule {}
