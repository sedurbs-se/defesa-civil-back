/*
  Warnings:

  - You are about to drop the column `agenteId` on the `Desastre` table. All the data in the column will be lost.
  - You are about to drop the column `estado` on the `Municipio` table. All the data in the column will be lost.
  - Added the required column `data` to the `Desastre` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Desastre` DROP FOREIGN KEY `Desastre_agenteId_fkey`;

-- AlterTable
ALTER TABLE `Desastre` DROP COLUMN `agenteId`,
    ADD COLUMN `data` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `Municipio` DROP COLUMN `estado`;
