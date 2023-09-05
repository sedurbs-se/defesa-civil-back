import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/Database.module';
import { DesastreModule } from 'src/modules/disasters/desastre.module';

@Module({
  imports: [DatabaseModule, DesastreModule],
  controllers: [],
  providers: [],
})
export class HttpModule {}
