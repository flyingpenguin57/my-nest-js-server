import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { CatsModule } from './cat/cat.module';
import { LoggerMiddleware } from './common/middleware/logger.middleware';

@Module({
  imports: [CatsModule],
  //controllers: [AppController, CatController],
  //providers: [AppService, CatsService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
