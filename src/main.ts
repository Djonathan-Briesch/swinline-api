import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.MQTT,
    options: {
      url: process.env.MQTT_URL,
      username: process.env.MQTT_USER,
      password: process.env.MQTT_PASS,
    },
  });

  await app.startAllMicroservices();
  await app.listen(process.env.PORT ?? 3000, () =>
    console.log('API rodando em http://localhost:3000'),
  );
}
bootstrap().catch(console.error);
