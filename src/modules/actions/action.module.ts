import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { RegisterAction } from './useCases/RegisterAction/RegisterAction';
import { AcaoRepository } from './repositories/IAcaoRepository';
import { PrismaAcaoRepository } from './repositories/prisma/PrismaAcaoRepository';
import { RegisterActionController } from './useCases/RegisterAction/RegisterActionController';
import { RegisterTaskController } from './useCases/RegisterTask/RegisterTaskController';
import { RegisterTask } from './useCases/RegisterTask/RegisterTask';
import { TaskRepository } from './repositories/ITaskRepository';
import { PrismaTaskRepository } from './repositories/prisma/PrismaTaskRepository';

@Module({
  imports: [],
  controllers: [RegisterActionController, RegisterTaskController],
  providers: [
    {
      provide: AcaoRepository,
      useClass: PrismaAcaoRepository,
    },
    {
      provide: TaskRepository,
      useClass: PrismaTaskRepository,
    },
    PrismaService,
    RegisterAction,
    RegisterTask,
  ],
})
export class ActionModule {}
