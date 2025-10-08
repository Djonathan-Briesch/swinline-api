import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { MqttModule } from './mqtt/mqtt.module';
import { MqttListener } from './mqtt/mqtt.listener';
@Module({
  imports: [PrismaModule, MqttModule],
  controllers: [MqttListener],
  providers: [],
})
export class AppModule {}
