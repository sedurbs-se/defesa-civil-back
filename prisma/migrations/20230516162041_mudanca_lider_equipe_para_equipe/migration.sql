/*
  Warnings:

  - You are about to drop the column `fl_lider_equipe` on the `Agente` table. All the data in the column will be lost.
  - You are about to drop the column `areaAfetadaId` on the `Equipe` table. All the data in the column will be lost.
  - Added the required column `area_afetada_id` to the `Equipe` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Agente` DROP COLUMN `fl_lider_equipe`;

-- AlterTable
ALTER TABLE `Equipe` DROP COLUMN `areaAfetadaId`,
    ADD COLUMN `area_afetada_id` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `EquipeAgente` ADD COLUMN `fl_lider_equipe` BOOLEAN NULL;

-- AddForeignKey
ALTER TABLE `Equipe` ADD CONSTRAINT `Equipe_area_afetada_id_fkey` FOREIGN KEY (`area_afetada_id`) REFERENCES `AreaAfetada`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
