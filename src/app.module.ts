import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { FirebaseMiddleware } from './middlewares/firebase.middleware';
import { UserModule } from './modules/user/user.module';

const nodeEnv = process.env.NODE_ENV;

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${nodeEnv}`,
    }),
    UserModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer
      .apply(FirebaseMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
