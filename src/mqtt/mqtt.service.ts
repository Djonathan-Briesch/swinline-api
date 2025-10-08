import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { MQTT_TOPICS, MqttWriteTopic } from './mqtt-topics.constants';
import { SendMachineConfigurationsDTO } from './dtos/send/send-machine-configurations.dto';
import { SendFeedingPlanDTO } from './dtos/send/send-feeding-plan.dto';
import { SendAlertParametersDTO } from './dtos/send/send-alert-parameters.dto';
import mqtt from 'mqtt';
@Injectable()
export class MqttService {
  constructor(@Inject('MQTT_CLIENT') private readonly client: ClientProxy) {}

  private async getMqttClient(): Promise<mqtt.MqttClient> {
    // aguarda a conexão do client proxy
    await this.client.connect();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const mqttClient = (this.client as any).mqttClient as mqtt.MqttClient;
    if (!mqttClient) throw new Error('MQTT client não conectado ainda');
    return mqttClient;
  }

  async publish<T>(
    topic: MqttWriteTopic,
    message: T,
    retain = false,
  ): Promise<void> {
    const mqttClient = await this.getMqttClient();
    mqttClient.publish(topic, JSON.stringify(message), { retain });
    console.log(`📤 [ESCRITA] ${topic}:`, message, `(retain: ${retain})`);
  }

  async sendMachineConfigurations(
    machineConfigDTO: SendMachineConfigurationsDTO,
  ): Promise<void> {
    await this.publish<SendMachineConfigurationsDTO>(
      MQTT_TOPICS.WRITE.MACHINE_CONFIGURATIONS_UPDATE,
      machineConfigDTO,
      true,
    );
  }

  async sendFeedingPlan(feedingPlanDTO: SendFeedingPlanDTO): Promise<void> {
    await this.publish<SendFeedingPlanDTO>(
      MQTT_TOPICS.WRITE.FEEDING_PLAN_RESPONSE,
      feedingPlanDTO,
    );
  }

  async sendAlertParameters(
    alertParametersDTO: SendAlertParametersDTO,
  ): Promise<void> {
    await this.publish<SendAlertParametersDTO>(
      MQTT_TOPICS.WRITE.ALERT_PARAMETERS,
      alertParametersDTO,
    );
  }
}
