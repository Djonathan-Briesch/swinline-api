import { Controller } from '@nestjs/common';
import {
  MessagePattern,
  Payload,
  Ctx,
  MqttContext,
} from '@nestjs/microservices';

import { MQTT_TOPICS, MqttReadTopic } from './mqtt-topics.constants';
import { ReceiveRfidDTO } from './dtos/recive/receive-rfid.dto.ts';
import { ReceiveConsumptionLogDTO } from './dtos/recive/receive-consumption-log.dto';
import { ReceiveAlertDTO } from './dtos/recive/receive-alert.dto';

@Controller()
export class MqttListener {
  @MessagePattern(MQTT_TOPICS.READ.IDENTIFICATION_RFID as MqttReadTopic)
  handleRfidIdentification(
    @Payload() rfidDTO: ReceiveRfidDTO,
    @Ctx() context: MqttContext,
  ) {
    console.log('Mensagem recebida no tópico:', context.getTopic());
    console.log('Conteúdo:', rfidDTO);
  }
  @MessagePattern(MQTT_TOPICS.READ.CONSUMPTION_LOG as MqttReadTopic)
  handleConsumptionLog(
    @Payload() consumptionLogDTO: ReceiveConsumptionLogDTO,
    @Ctx() context: MqttContext,
  ) {
    console.log('Mensagem recebida no tópico:', context.getTopic());
    console.log('Conteúdo:', consumptionLogDTO);
  }
  @MessagePattern(MQTT_TOPICS.READ.ALERTS as MqttReadTopic)
  handleAlerts(
    @Payload() alertDTO: ReceiveAlertDTO,
    @Ctx() context: MqttContext,
  ) {
    console.log('Mensagem recebida no tópico:', context.getTopic());
    console.log('Conteúdo:', alertDTO);
  }
}
