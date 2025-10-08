import { Module } from '@nestjs/common';
import { MqttListener } from './mqtt.listener';
import { MqttService } from './mqtt.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'MQTT_CLIENT',
        transport: Transport.MQTT,
        options: {
          url: process.env.MQTT_URL,
          username: process.env.MQTT_USER,
          password: process.env.MQTT_PASS,
        },
      },
    ]),
  ],
  providers: [MqttListener, MqttService],
  exports: [MqttService],
})
export class MqttModule {}
