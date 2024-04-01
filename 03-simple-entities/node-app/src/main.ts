import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import 'reflect-metadata';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.enableCors()
  const config = new DocumentBuilder()
    .setTitle('NestJs API Documentation')
    .setDescription('Backend API for the NestJs application.')
    .setVersion('1.0')
    .addOAuth2({
      type: 'oauth2',
      name: 'Oauth2',
      description: 'Oauth2 authorization',
      flows: {
        clientCredentials: {
          scopes: {},

          tokenUrl:
            'http://localhost:8080/realms/test-realm/protocol/openid-connect/token',
        },
      },
    })
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
