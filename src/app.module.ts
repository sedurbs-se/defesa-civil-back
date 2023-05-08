import { Module } from '@nestjs/common';
import { DesastreModule } from './modules/disasters/disaster.module';

@Module({
  imports: [DesastreModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
