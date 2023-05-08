import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { RegisterDisaster } from './useCases/RegisterDisaster/RegisterDisaster';
import { RegisterDisasterController } from './useCases/RegisterDisaster/RegisetDisasterController';
import { DisasterRepository } from './repositories/IDisasterRepository';
import { PrismaDisasterRepository } from './repositories/prisma/PrismaDisasterRepository';
import { CityRepository } from './repositories/ICityRepository';
import { PrismaCityRepository } from './repositories/prisma/PrismaCityRepository';
import { ErrorsInterceptor } from 'src/core/interceptors/error.interceptor';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ListCities } from './useCases/ListCities/ListCities';
import { ListCitiesController } from './useCases/ListCities/ListCitiesController';
import { ListDisasters } from './useCases/ListDisasters/ListDisasters';
import { ListDisastersController } from './useCases/ListDisasters/ListDisastersController';

@Module({
  imports: [],
  controllers: [RegisterDisasterController,ListCitiesController,ListDisastersController],
  providers: [
    {
      provide: DisasterRepository,
      useClass: PrismaDisasterRepository,
    },
    {
      provide: CityRepository,
      useClass: PrismaCityRepository,
    },

    {
      provide: APP_INTERCEPTOR,
      useClass: ErrorsInterceptor,
    },

    PrismaService,

    RegisterDisaster,
    ListCities,
    ListDisasters,
  ],
})
export class DesastreModule {}
