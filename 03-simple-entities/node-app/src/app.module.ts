import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  AuthGuard,
  KeycloakConnectModule,
  ResourceGuard,
  RoleGuard,
} from 'nest-keycloak-connect';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { Tag } from './tags/tag.entity';
import { TagsModule } from './tags/tags.module';

@Module({
  imports: [
    KeycloakConnectModule.register({
      authServerUrl: 'http://localhost:8080',
      realm: 'test-realm',
      clientId: 'nest-app',
      realmPublicKey:
        'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEArwfZQgsa0M8zrvk4ow++rcj5lyNmlSY9c5xJ1s+xTS0T10VqqSwaXqe5UwqyCTxUNqLkFrUDzxeJfGRGkw6sDQa569jeTMii40A3jxBanzci00Y1WjttjWbgo2Q6RxJct8CwgGmr0ELnri6HSMt7ELLyr5q4PFiX9aSXf4RlYXoy45CIs55Z2ewz6DtzZt11JSbRQCHmQAw93ms8cmtcX7gbXts3z4Qb+DztKYQixbtQl91ROzKk0oH/iuX1e9yuGcXC3mqMqFpe9tSGL67s/I4G3S64fBxFFidlPfIEjf7epNy07ZAT/uZDeVejfvXL46H6lNO43Nu9QBgsQXZh7QIDAQAB',
      secret: 'PMicdCSlCiRmgH2sKK5iUvs5cuLtrTqh',
    }),

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'pguser',
      password: 'password',
      database: 'nestjs',
      entities: [Tag],
      synchronize: true,
    }),
    CatsModule,
    TagsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    // This adds a global level resource guard, which is permissive.
    // Only controllers annotated with @Resource and methods with @Scopes
    // are handled by this guard.
    {
      provide: APP_GUARD,
      useClass: ResourceGuard,
    },
    // New in 1.1.0
    // This adds a global level role guard, which is permissive.
    // Used by `@Roles` decorator with the optional `@AllowAnyRole` decorator for allowing any
    // specified role passed.
    {
      provide: APP_GUARD,
      useClass: RoleGuard,
    },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply().exclude({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
