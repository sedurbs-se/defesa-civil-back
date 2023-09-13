import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CriarDesastre } from './useCases/CriarDesastre/CriarDesastre';
import { CriarDesastreController } from './useCases/CriarDesastre/CriarDesastreController';
import { DesastreRepository } from './repositories/DesastreRepository';
import { PrismaDesastreRepository } from './repositories/prisma/PrismaDesastreRepository';
import { CidadeRepository } from './repositories/CidadeRepository';
import { PrismaCidadeRepository } from './repositories/prisma/PrismaCidadeRepository';
import { ErrorsInterceptor } from 'src/core/interceptors/error.interceptor';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ListarCidades } from './useCases/ListarCidades/ListarCidades';
import { ListarCidadesController } from './useCases/ListarCidades/ListarCidadesController';
import { ListarDesastres } from './useCases/ListarDesastres/ListarDesastres';
import { ListarDesastresController } from './useCases/ListarDesastres/ListarDesastresController';
import { CriarAreaAfetadaController } from './useCases/CriarAreaAfetada/CriarAreaAfetadaController';
import { AreaAfetadaRepository } from './repositories/AreaAfetadaRepository';
import { PrismaAreaAfetadaRepository } from './repositories/prisma/PrismaAreaAfetadaRepository';
import { CriarAreaAfetada } from './useCases/CriarAreaAfetada/CriarAreaAfetada';
import { EditarAreaAfetada } from './useCases/EditarAreaAfetada/EditarAreaAfetada';
import { EditarAreaAfetadaController } from './useCases/EditarAreaAfetada/EditarAreaAfetadaController';
import { CriarAgenteController } from './useCases/CriarAgente/CriarAgenteController';
import { CriarAgente } from './useCases/CriarAgente/CriarAgente';
import { PrismaAgenteRepository } from './repositories/prisma/PrismaAgenteRepository';
import { AgenteRepository } from './repositories/AgenteRepository';
import { UsuarioRepository } from './repositories/UsuarioRepository';
import { PrismaUsuarioRepository } from './repositories/prisma/PrismaUsuarioRepository';
import { LoginUser } from './useCases/LoginUser/LoginUser';
import { LoginUserController } from './useCases/LoginUser/LoginUserController';
import { CriarEquipeController } from './useCases/CriarEquipe/CriarEquipeController';
import { CriarEquipe } from './useCases/CriarEquipe/CriarEquipe';
import { EquipeRepository } from './repositories/EquipeRepository';
import { PrismaEquipeRepository } from './repositories/prisma/PrismaEquipeRepository';
import { ListarEquipePorArea } from './useCases/ListarEquipePorArea/ListarEquipePorArea';
import { ListarEquipePorAreaController } from './useCases/ListarEquipePorArea/ListarEquipePorAreaController';
import { ListarAgentesEquipe } from './useCases/ListarAgentesEquipe/ListarAgentesEquipe';
import { ListarAgentesEquipeController } from './useCases/ListarAgentesEquipe/ListarAgentesEquipeController';
import { CriarUnidadeController } from './useCases/CriarUnidade/CriarUnidadeController';
import { CriarUnidade } from './useCases/CriarUnidade/CriarUnidade';
import { UnidadeHabitacionalRepository } from './repositories/UnidadeHabitacionalRepository';
import { PrismaUnidadeHabitacionalRepository } from './repositories/prisma/PrismaUnidadeHabitacionalRepository';
import { ObterDesastre } from './useCases/ObterDesastre/ObterDesastre';
import { ObterDesastreController } from './useCases/ObterDesastre/ObterDesastreController';
import { ObterAreaController } from './useCases/ObterArea/ObterAreaController';
import { ObterArea } from './useCases/ObterArea/ObterArea';
import { ObterUnidade } from './useCases/ObterUnidade/ObterUnidade';
import { ObterUnidadeController } from './useCases/ObterUnidade/ObterUnidadeController';
import { CriarFotosController } from './useCases/CriarFotos/CriarFotosController';
import { CriarFotos } from './useCases/CriarFotos/CriarFotos';
import { FotosRepository } from './repositories/FotosRepository';
import { PrismaFotoRepository } from './repositories/prisma/PrismaFotoRepository';
import { ObterFotoController } from './useCases/ObterFoto/ObterFotoController';
import { EditarDesastre } from './useCases/EditarDesastre/EditarDesastre';
import { EditarDesastreController } from './useCases/EditarDesastre/EditarDesastreController';
import { ListarAgentesController } from './useCases/ListarAgentes/ListAgentsController';
import { ListarAgentes } from './useCases/ListarAgentes/ListarAgentes';
import { EditarUnidade } from './useCases/EditarUnidade/EditarUnidade';
import { EditarUnidadeController } from './useCases/EditarUnidade/EditarUnidadeController';
import { EditarEquipeController } from './useCases/EditarEquipe/EditarEquipeController';
import { EditarEquipe } from './useCases/EditarEquipe/EditarEquipe';
import { DeletarFotos } from './useCases/DeletarFotos/DeletarFotos';
import { DeletarFotosController } from './useCases/DeletarFotos/DeletarFotosController';
import { CreateAffectedController } from './useCases/CriarAfetado/CriarAfetadoController';
import { CreateAffected } from './useCases/CriarAfetado/CriarAfetado';
import { EditarAfetado } from './useCases/EditarAfetado/EditarAfetado';
import { EditarAfetadoController } from './useCases/EditarAfetado/EditarAfetadoController';
import { AfetadoRepository } from './repositories/AfetadoRepository';
import { PrismaAfetadoRepository } from './repositories/prisma/PrismaAfetadoRepository';
import { ObterAgenteController } from './useCases/ObterAgente/ObterAgenteController';
import { ObterAgente } from './useCases/ObterAgente/ObterAgente';
import { EditarAgenteController } from './useCases/EditarAgente/EditarAgenteController';
import { EditarAgente } from './useCases/EditarAgente/EditarAgente';
import { ObterAfetadoController } from './useCases/ObterAfetado/ObterAfetadoController';
import { ObterAfetado } from './useCases/ObterAfetado/ObterAfetado';
import { ActionModule } from '../actions/action.module';
import { ImageModule } from '../images/image.module';
import { AppGateway } from 'src/infra/websocket/app.gateway';
import { ObterEquipePorAgenteController } from './useCases/ObterEquipePorAgente/ObterEquipePorAgenteController';
import { ObterEquipePorAgente } from './useCases/ObterEquipePorAgente/ObterEquipePorAgente';
import { AlteracaoRepository } from '../historico/repositories/AlteracaoRepository';
import { PrismaAlteracaoRepository } from '../historico/repositories/prisma/PrismaAlteracaoRepository';
import { ObterAlteracoes } from '../historico/useCases/ObterAlteracoes/ObterAlteracoes';
import { ObterAlteracoesController } from '../historico/useCases/ObterAlteracoes/ObterAlteracoesController';

@Module({
  imports: [ActionModule, ImageModule],
  controllers: [
    ListarCidadesController,
    ListarDesastresController,
    ListarEquipePorAreaController,
    CriarDesastreController,
    CriarAreaAfetadaController,
    EditarAreaAfetadaController,
    CriarAgenteController,
    LoginUserController,
    CriarEquipeController,
    ListarAgentesEquipeController,
    CriarUnidadeController,
    ObterDesastreController,
    ObterAreaController,
    ObterUnidadeController,
    CriarFotosController,
    DeletarFotosController,
    ObterFotoController,
    EditarDesastreController,
    ListarAgentesController,
    EditarUnidadeController,
    EditarEquipeController,

    CreateAffectedController,
    EditarAfetadoController,
    ObterAfetadoController,

    ObterAgenteController,
    EditarAgenteController,
    ObterEquipePorAgenteController,


    ObterAlteracoesController,
  ],
  providers: [
    {
      provide: DesastreRepository,
      useClass: PrismaDesastreRepository,
    },
    {
      provide: CidadeRepository,
      useClass: PrismaCidadeRepository,
    },
    {
      provide: AreaAfetadaRepository,
      useClass: PrismaAreaAfetadaRepository,
    },
    {
      provide: AgenteRepository,
      useClass: PrismaAgenteRepository,
    },
    {
      provide: UsuarioRepository,
      useClass: PrismaUsuarioRepository,
    },
    {
      provide: EquipeRepository,
      useClass: PrismaEquipeRepository,
    },
    {
      provide: UnidadeHabitacionalRepository,
      useClass: PrismaUnidadeHabitacionalRepository,
    },
    {
      provide: FotosRepository,
      useClass: PrismaFotoRepository,
    },
    {
      provide: AfetadoRepository,
      useClass: PrismaAfetadoRepository,
    },
    {
      provide: AlteracaoRepository,
      useClass: PrismaAlteracaoRepository,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ErrorsInterceptor,
    },

    PrismaService,
    EditarDesastre,
    CriarDesastre,
    CriarAgente,
    CriarEquipe,
    CriarUnidade,
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
    EditarAfetado,
    ObterAfetado,
    ObterAgente,
    EditarAgente,
    ObterEquipePorAgente,

    ObterAlteracoes,
    AppGateway,
  ],
})
export class DesastreModule {}
