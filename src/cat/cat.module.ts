import { Module } from '@nestjs/common';
import { CatController } from './cat.controller';
import { CatsService } from './cat.service';

@Module({
  controllers: [CatController],
  providers: [CatsService],
  exports: [CatsService] //导出CatsService实例，其他引入CatsModule的模块也可以使用这个实例；nest默认是单例模式
})
export class CatsModule {}