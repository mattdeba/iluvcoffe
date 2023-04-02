import { Module } from '@nestjs/common';
import { CoffesController } from './coffes.controller';
import { CoffesService } from './coffes.service';

class ConfigService {}
class DevelopmentConfigService {}
class ProductionConfigService {}

@Module({
  controllers: [CoffesController],
  providers: [
    CoffesService,
    {
      provide: ConfigService,
      useClass:
        process.env.NODE_ENV === 'development'
          ? DevelopmentConfigService
          : ProductionConfigService,
    },
  ],
  exports: [CoffesService],
})
export class CoffesModule {}
