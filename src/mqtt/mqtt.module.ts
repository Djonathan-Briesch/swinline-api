import { Module } from '@nestjs/common';
import { MqttListener } from './mqtt.listener';

@Module({
  providers: [MqttListener],
})
export class MqttModule {}
