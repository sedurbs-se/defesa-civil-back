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
import { ListarCidades } from './useCases/ListarCidades/ListarCidades';
import { ListarCidadesController } from './useCases/ListarCidades/ListarCidadesController';
import { ListarDesastres } from './useCases/ListarDesastres/ListarDesastres';
import { ListDisastersController } from './useCases/ListarDesastres/ListarDesastresController';
import { CriarAreaAfetadaController } from './useCases/CriarAreaAfetada/CriarAreaAfetadaController';
import { AffectedAreaRepository } from './repositories/IAffectedAreaRepository';
import { PrismaAffectedAreaRepository } from './repositories/prisma/PrismaAffectedAreaRepository';
import { CriarAreaAfetada } from './useCases/CriarAreaAfetada/CriarAreaAfetada';
import { EditarAreaAfetada } from './useCases/EditarAreaAfetada/EditarAreaAfetada';
import { EditAreaController } from './useCases/EditarAreaAfetada/EditarAreaAfetadaController';
import { RegisterAgentController } from './useCases/CriarAgente/CriarAgenteController';
import { CriarAgente } from './useCases/CriarAgente/CriarAgente';
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
import { ListarEquipePorArea } from './useCases/ListarEquipePorArea/ListarEquipePorArea';
import { ListarEquipePorAreaController } from './useCases/ListarEquipePorArea/ListarEquipePorAreaController';
import { ListarAgentesEquipe } from './useCases/ListarAgentesEquipe/ListarAgentesEquipe';
import { ListarAgentesEquipeController } from './useCases/ListarAgentesEquipe/ListarAgentesEquipeController';
import { RegisterHousingController } from './useCases/RegisterHousingUnit/RegisterHousingController';
import { RegisterHousing } from './useCases/RegisterHousingUnit/RegisterHousingUnit';
import { HousingUnitRepository } from './repositories/IHousingUnitRepository';
import { PrismaHousingUnitRepository } from './repositories/prisma/PrismaHousingUnitRepository';
import { ObterDesastre } from './useCases/ObterDesastre/ObterDesastre';
import { GetDisasterController } from './useCases/ObterDesastre/ObterDesastreController';
import { GetAreaController } from './useCases/ObterArea/ObterAreaController';
import { ObterArea } from './useCases/ObterArea/ObterArea';
import { ObterUnidade } from './useCases/ObterUnidade/ObterUnidade';
import { GetHousingUnitController } from './useCases/ObterUnidade/ObterUnidadeController';
import { CriarFotosController } from './useCases/CriarFotos/CriarFotosController';
import { CriarFotos } from './useCases/CriarFotos/CriarFotos';
import { PhotosRepository } from './repositories/IPhotosRepository';
import { PrismaPhotoRepository } from './repositories/prisma/PrismaPhotoRepository';
import { ObterFotoController } from './useCases/ObterFoto/ObterFotoController';
import { EditarDesastre } from './useCases/EditarDesastre/EditarDesastre';
import { EditDisasterController } from './useCases/EditarDesastre/EditarDesastreController';
import { ListAgentsController } from './useCases/ListarAgentes/ListAgentsController';
import { ListarAgentes } from './useCases/ListarAgentes/ListarAgentes';
import { EditarUnidade } from './useCases/EditarUnidade/EditarUnidade';
import { EditarUnidadeController } from './useCases/EditarUnidade/EditarUnidadeController';
import { EditTeamController } from './useCases/EditarEquipe/EditarEquipeController';
import { EditarEquipe } from './useCases/EditarEquipe/EditarEquipe';
import { DeletarFotos } from './useCases/DeletarFotos/DeletarFotos';
import { DeletePhotosController } from './useCases/DeletarFotos/DeletarFotosController';
import { CreateAffectedController } from './useCases/CriarAfetado/CriarAfetadoController';
import { CreateAffected } from './useCases/CriarAfetado/CriarAfetado';
import { UpdateAffected } from './useCases/UpdateAffected/UpdateAffected';
import { UpdateAffectedController } from './useCases/UpdateAffected/UpdateAffectedController';
import { AffectedRepository } from './repositories/IAffectedRepository';
import { PrismaAffectedRepository } from './repositories/prisma/PrismaAffectedRepository';
import { ObterAgenteController } from './useCases/ObterAgente/ObterAgenteController';
import { ObterAgente } from './useCases/ObterAgente/ObterAgente';
import { EditAgentController } from './useCases/EditarAgente/EditarAgenteController';
import { EditarAgente } from './useCases/EditarAgente/EditarAgente';
import { GetAffectedController } from './useCases/ObterAfetado/ObterAfetadoController';
import { ObterAfetado } from './useCases/ObterAfetado/ObterAfetado';
import { ActionModule } from '../actions/action.module';
import { ImageModule } from '../images/image.module';
import { AppGateway } from 'src/infra/websocket/app.gateway';

@Module({
  imports: [ActionModule, ImageModule],
  controllers: [
    ListarCidadesController,
    ListDisastersController,
    ListarEquipePorAreaController,
    RegisterDisasterController,
    CriarAreaAfetadaController,
    EditAreaController,
    RegisterAgentController,
    LoginUserController,
    RegisterTeamForAffectedAreaController,
    ListarAgentesEquipeController,
    RegisterHousingController,
    GetDisasterController,
    GetAreaController,
    GetHousingUnitController,
    CriarFotosController,
    DeletePhotosController,
    ObterFotoController,
    EditDisasterController,
    ListAgentsController,
    EditarUnidadeController,
    EditTeamController,

    CreateAffectedController,
    UpdateAffectedController,
    GetAffectedController,

    ObterAgenteController,
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
    EditarDesastre,
    RegisterDisaster,
    CriarAgente,
    RegisterTeamForAffectedArea,
    RegisterHousing,
    CriarAreaAfetada,
    EditarAreaAfetada,
    ListarCidades,
    ListarEquipePorArea,
    ListarDesastres,
    LoginUser,
    ListarAgentesEquipe,
    ObterDesastre,
    ObterArea,
    ObterUnidade,
    CriarFotos,
    DeletarFotos,
    ListarAgentes,
    EditarUnidade,
    EditarEquipe,
    CreateAffected,
    UpdateAffected,
    ObterAfetado,
    ObterAgente,
    EditarAgente,
    AppGateway,
  ],
})
export class DesastreModule {}
