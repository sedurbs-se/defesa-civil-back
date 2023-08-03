// import { PrismaService } from 'src/prisma.service';
// import { AffectedAreaRepository } from '../IAffectedAreaRepository';
// import { Injectable } from '@nestjs/common';
// import { AffectedArea } from '../../domain/affectedArea/affected-area';
// import { AffectedAreaMapper } from '../../mappers/AffectedAreaMapper';


// export class InMemoryAffectedAreaRepository implements AffectedAreaRepository {
//   constructor(private db: AffectedArea[] = []) {};

//   async save(affectedArea: AffectedArea): Promise<void> {
//     const a = AffectedAreaMapper.toPersistence(affectedArea);

//     await this.db.push()

//     await this.prisma.areaAfetada.create({
//       data: {
//         ...a,
//       },
//     });
//   }

//   async update(affectedArea: AffectedArea): Promise<void> {
//     const a = AffectedAreaMapper.toPersistence(affectedArea);



//     await this.prisma.areaAfetada.update({
//       where: {
//         id: a.id,
//       },
//       data: {
//         ...a,
//       },
//     });
//   }

//   async find(id: string): Promise<AffectedArea> {
//     const area = await this.prisma.areaAfetada.findUnique({
//       where: {
//         id,
//       },
//       include: {
//         unidadesHabitacionais: true,
//       },
//     });

//     if (!area) return null;

//     return AffectedAreaMapper.toDomain(area);
//   }
//   async findByOrder(order: number): Promise<AffectedArea> {
//     const area = await this.prisma.areaAfetada.findUnique({
//       where: {
//         ORDEM: order,
//       },
//       include: {
//         unidadesHabitacionais: true,
//       },
//     });

//     if (!area) return null;

//     return AffectedAreaMapper.toDomain(area);
//   }

//   async findAll(): Promise<AffectedArea[]> {
//     const areas = await this.prisma.areaAfetada.findMany({});

//     return areas.map(AffectedAreaMapper.toDomain);
//   }
// }
