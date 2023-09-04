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
import { RegisterAreaController } from './useCases/RegisterAffectedArea/RegisterAffectedAreaController';
import { AffectedAreaRepository } from './repositories/IAffectedAreaRepository';
import { PrismaAffectedAreaRepository } from './repositories/prisma/PrismaAffectedAreaRepository';
import { CreateAffectedArea } from './useCases/RegisterAffectedArea/RegisterAffectedArea';
import { EditAffectedArea } from './useCases/EditAffectedArea/EditAffectedArea';
import { EditAreaController } from './useCases/EditAffectedArea/EditAffectedAreaController';
import { RegisterAgentController } from './useCases/RegisterAgent/RegisterAgentController';
import { RegisterAgent } from './useCases/RegisterAgent/RegisterAgent';
import { PrismaAgentRepository } from './repositories/prisma/PrismaAgentRepository';
import { IAgentRepository } from './repositories/IAgentRepository';
import { IUserRepository } from './repositories/IUserRepository';
import { PrismaUserRepository } from './repositories/prisma/PrismaUserRepository';
import { LoginUser } from './useCases/LoginUser/LoginUser';
import { LoginUserController } from './useCases/LoginUser/LoginUserController';
import { RegisterTeamForAffectedAreaController } from './useCases/RegisterTeamForAffectedArea/RegisterTeamForAffectedAreaController';
import { RegisterTeamForAffectedArea } from './useCases/RegisterTeamForAffectedArea/RegisterTeamForAffectedArea';
import { ITeamRepository } from './repositories/ITeamRepository';
import { PrismaTeamRepository } from './repositories/prisma/PrismaTeamRepository';
import { ListTeamBtAffectedArea } from './useCases/ListTeamByAffectedArea/ListTeamBtAffectedArea';
import { ListTeamBtAffectedAreaController } from './useCases/ListTeamByAffectedArea/ListTeamBtAffectedAreaController';
import { ListTeamAgentsController } from './useCases/ListTeamAgents/ListTeamAgentsController';
import { ListTeamAgents } from './useCases/ListTeamAgents/ListTeamAgents';
import { RegisterHousingController } from './useCases/RegisterHousingUnit/RegisterHousingController';
import { RegisterHousing } from './useCases/RegisterHousingUnit/RegisterHousingUnit';
import { HousingUnitRepository } from './repositories/IHousingUnitRepository';
import { PrismaHousingUnitRepository } from './repositories/prisma/PrismaHousingUnitRepository';
import { GetDisaster } from './useCases/GetDisaster/GetDisaster';
import { GetDisasterController } from './useCases/GetDisaster/GetDisasterController';
import { GetAreaController } from './useCases/GetArea/GetAreaController';
import { GetArea } from './useCases/GetArea/GetArea';
import { GetHousingUnit } from './useCases/GetHousingUnit/GetHousingUnit';
import { GetHousingUnitController } from './useCases/GetHousingUnit/GetHousingUnitController';
import { CreatePhotosController } from './useCases/CreatePhotos/CreatePhotosController';
import { CreatePhotos } from './useCases/CreatePhotos/CreatePhotos';
import { PhotosRepository } from './repositories/IPhotosRepository';
import { PrismaPhotoRepository } from './repositories/prisma/PrismaPhotoRepository';
import { GetPhotoController } from './useCases/GetPhoto/GetPhotoController';
import { EditDisaster } from './useCases/EditDisaster/EditDisaster';
import { EditDisasterController } from './useCases/EditDisaster/EditDisasterController';
import { ListAgentsController } from './useCases/ListAgents/ListAgentsController';
import { ListAgents } from './useCases/ListAgents/ListAgents';
import { EditHousingUnit } from './useCases/EditHousingUnit/EditHousingUnit';
import { EditHousingUnitController } from './useCases/EditHousingUnit/EditHousingUnitController';
import { EditTeamController } from './useCases/EditTeam/EditTeamController';
import { EditTeam } from './useCases/EditTeam/EditTeam';
import { DeletePhotos } from './useCases/DeletePhotos/DeletePhotos';
import { DeletePhotosController } from './useCases/DeletePhotos/DeletePhotosController';
import { CreateAffectedController } from './useCases/CreateAffected/CreateAffectedController';
import { CreateAffected } from './useCases/CreateAffected/CreateAffected';
import { UpdateAffected } from './useCases/UpdateAffected/UpdateAffected';
import { UpdateAffectedController } from './useCases/UpdateAffected/UpdateAffectedController';
import { AffectedRepository } from './repositories/IAffectedRepository';
import { PrismaAffectedRepository } from './repositories/prisma/PrismaAffectedRepository';
import { GetAgentController } from './useCases/GetAgent/GetAgentController';
import { GetAgent } from './useCases/GetAgent/GetAgent';
import { EditAgentController } from './useCases/EditAgent/EditAgentController';
import { EditAgent } from './useCases/EditAgent/EditAgent';
import { GetAffectedController } from './useCases/GetAffected/GetAffectedController';
import { GetAffected } from './useCases/GetAffected/GetAffected';
import { ActionModule } from '../actions/action.module';
import { ImageModule } from '../images/image.module';

@Module({
  imports: [ActionModule, ImageModule],
  controllers: [
    ListCitiesController,
    ListDisastersController,
    ListTeamBtAffectedAreaController,
    RegisterDisasterController,
    RegisterAreaController,
    EditAreaController,
    RegisterAgentController,
    LoginUserController,
    RegisterTeamForAffectedAreaController,
    ListTeamAgentsController,
    RegisterHousingController,
    GetDisasterController,
    GetAreaController,
    GetHousingUnitController,
    CreatePhotosController,
    DeletePhotosController,
    GetPhotoController,
    EditDisasterController,
    ListAgentsController,
    EditHousingUnitController,
    EditTeamController,

    CreateAffectedController,
    UpdateAffectedController,
    GetAffectedController,


    GetAgentController,
    EditAgentController,
  ],
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
      provide: AffectedAreaRepository,
      useClass: PrismaAffectedAreaRepository,
    },
    {
      provide: IAgentRepository,
      useClass: PrismaAgentRepository,
    },
    {
      provide: IUserRepository,
      useClass: PrismaUserRepository,
    },
    {
      provide: ITeamRepository,
      useClass: PrismaTeamRepository,
    },
    {
      provide: HousingUnitRepository,
      useClass: PrismaHousingUnitRepository,
    },
    {
      provide: PhotosRepository,
      useClass: PrismaPhotoRepository,
    },
    {
      provide: AffectedRepository,
      useClass: PrismaAffectedRepository,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ErrorsInterceptor,
    },

    PrismaService,
    EditDisaster,
    RegisterDisaster,
    RegisterAgent,
    RegisterTeamForAffectedArea,
    RegisterHousing,
    CreateAffectedArea,
    EditAffectedArea,
    ListCities,
    ListTeamBtAffectedArea,
    ListDisasters,
    LoginUser,
    ListTeamAgents,
    GetDisaster,
    GetArea,
    GetHousingUnit,
    CreatePhotos,
    DeletePhotos,
    ListAgents,
    EditHousingUnit,
    EditTeam,

    CreateAffected,
    UpdateAffected,
    GetAffected,

    GetAgent,
    EditAgent,
  ],
})
export class DesastreModule {}
