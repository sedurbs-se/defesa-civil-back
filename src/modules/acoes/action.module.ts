import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { RegisterAction } from './useCases/RegisterAction/RegisterAction';
import { AcaoRepository } from './repositories/AcaoRepository';
import { PrismaAcaoRepository } from './repositories/prisma/PrismaAcaoRepository';
import { RegisterActionController } from './useCases/RegisterAction/RegisterActionController';
import { RegisterTaskController } from './useCases/RegisterTask/RegisterTaskController';
import { RegisterTask } from './useCases/RegisterTask/RegisterTask';
import { TaskRepository } from './repositories/TarefaRepository';
import { PrismaTaskRepository } from './repositories/prisma/PrismaTaskRepository';
import { RegisterEventController } from './useCases/RegisterEvent/RegisterEventController';
import { RegisterEvent } from './useCases/RegisterEvent/RegisterEvent';
import { EventRepository } from './repositories/EventoRepository';
import { PrismaEventRepository } from './repositories/prisma/PrismaEventRepository';
import { ListActions } from './useCases/ListActions/ListActions';
import { ListActionsController } from './useCases/ListActions/ListActionsController';
import { ListTasks } from './useCases/ListTasks/ListTasks';
import { ListTasksController } from './useCases/ListTasks/ListTasksController';
import { ListEvents } from './useCases/ListEvents/ListEvents';
import { ListEventsController } from './useCases/ListEvents/ListEventsController';

@Module({
  imports: [],
  controllers: [
    RegisterActionController,
    RegisterTaskController,
    RegisterEventController,
    ListActionsController,
    ListTasksController,
    ListEventsController,
  ],
  providers: [
    {
      provide: AcaoRepository,
      useClass: PrismaAcaoRepository,
    },
    {
      provide: TaskRepository,
      useClass: PrismaTaskRepository,
    },
    {
      provide: EventRepository,
      useClass: PrismaEventRepository,
    },
    PrismaService,
    RegisterAction,
    RegisterTask,
    RegisterEvent,
    ListActions,
    ListTasks,
    ListEvents,
  ],
})
export class ActionModule {}
