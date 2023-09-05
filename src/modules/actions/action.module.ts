import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { RegisterAction } from './useCases/RegistrarAcao/RegisterAction';
import { AcaoRepository } from './repositories/AcaoRepository';
import { PrismaAcaoRepository } from './repositories/prisma/PrismaAcaoRepository';
import { RegisterActionController } from './useCases/RegistrarAcao/RegisterActionController';
import { RegisterTaskController } from './useCases/RegistrarTarefa/RegisterTaskController';
import { RegisterTask } from './useCases/RegistrarTarefa/RegisterTask';
import { TarefaRepository } from './repositories/TarefaRepository';
import { PrismaTaskRepository } from './repositories/prisma/PrismaTarefaRepository';
import { RegisterEventController } from './useCases/RegistrarEvento/RegisterEventController';
import { RegisterEvent } from './useCases/RegistrarEvento/RegisterEvent';
import { EventoRepository } from './repositories/EventoRepository';
import { PrismaEventRepository } from './repositories/prisma/PrismaEventoRepository';
import { ListarAcoes } from './useCases/ListarAcoes/ListarAcoes';
import { ListarAcoesController } from './useCases/ListarAcoes/ListarAcoesController';
import { ListTasks } from './useCases/ListarTarefas/ListTasks';
import { ListTasksController } from './useCases/ListarTarefas/ListTasksController';
import { ListarEventos } from './useCases/ListarEventos/ListarEventos';
import { ListarEventosController } from './useCases/ListarEventos/ListarEventosController';

@Module({
  imports: [],
  controllers: [
    RegisterActionController,
    RegisterTaskController,
    RegisterEventController,
    ListarAcoesController,
    ListTasksController,
    ListarEventosController,
  ],
  providers: [
    {
      provide: AcaoRepository,
      useClass: PrismaAcaoRepository,
    },
    {
      provide: TarefaRepository,
      useClass: PrismaTaskRepository,
    },
    {
      provide: EventoRepository,
      useClass: PrismaEventRepository,
    },
    PrismaService,
    RegisterAction,
    RegisterTask,
    RegisterEvent,
    ListarAcoes,
    ListTasks,
    ListarEventos,
  ],
})
export class ActionModule {}
