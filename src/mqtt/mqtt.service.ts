import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { MQTT_TOPICS, MqttWriteTopic } from './mqtt-topics.constants';
import { SendMachineConfigurationsDTO } from './dtos/send/send-machine-configurations.dto';
import { SendFeedingPlanDTO } from './dtos/send/send-feeding-plan.dto';
import { SendAlertParametersDTO } from './dtos/send/send-alert-parameters.dto';
@Injectable()
export class MqttService {
  constructor(@Inject('MQTT_CLIENT') private readonly client: ClientProxy) {}

  publish<T>(topic: MqttWriteTopic, message: T): void {
    this.client.emit<T>(topic, message);
    console.log(`📤 [ESCRITA] ${topic}:`, message);
  }

  sendMachineConfigurations(
    machineConfigDTO: SendMachineConfigurationsDTO,
  ): void {
    this.publish<SendMachineConfigurationsDTO>(
      MQTT_TOPICS.WRITE.MACHINE_CONFIGURATIONS_UPDATE,
      machineConfigDTO,
    );
  }

  sendFeedingPlan(feedingPlanDTO: SendFeedingPlanDTO): void {
    this.publish<SendFeedingPlanDTO>(
      MQTT_TOPICS.WRITE.FEEDING_PLAN_RESPONSE,
      feedingPlanDTO,
    );
  }

  sendAlertParameters(alertParametersDTO: SendAlertParametersDTO): void {
    this.publish<SendAlertParametersDTO>(
      MQTT_TOPICS.WRITE.ALERT_PARAMETERS,
      alertParametersDTO,
    );
  }
}
