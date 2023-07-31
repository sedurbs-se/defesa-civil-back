/*
  Warnings:

  - You are about to drop the column `tipoAcaoId` on the `Acao` table. All the data in the column will be lost.
  - You are about to drop the `DanosHumanos` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `DanosMateriais` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TipoAcao` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `tipo` to the `Acao` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fl_danificado` to the `UnidadeHabitacional` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fl_desabrigado` to the `UnidadeHabitacional` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fl_desalojado` to the `UnidadeHabitacional` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fl_destroido` to the `UnidadeHabitacional` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fl_resiliente` to the `UnidadeHabitacional` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fl_resistente` to the `UnidadeHabitacional` table without a default value. This is not possible if the table is not empty.
  - Added the required column `qtd_adolescente` to the `UnidadeHabitacional` table without a default value. This is not possible if the table is not empty.
  - Added the required column `qtd_adultos` to the `UnidadeHabitacional` table without a default value. This is not possible if the table is not empty.
  - Added the required column `qtd_criancas` to the `UnidadeHabitacional` table without a default value. This is not possible if the table is not empty.
  - Added the required column `qtd_familias` to the `UnidadeHabitacional` table without a default value. This is not possible if the table is not empty.
  - Added the required column `qtd_homens` to the `UnidadeHabitacional` table without a default value. This is not possible if the table is not empty.
  - Added the required column `qtd_idosos` to the `UnidadeHabitacional` table without a default value. This is not possible if the table is not empty.
  - Added the required column `qtd_mulheres` to the `UnidadeHabitacional` table without a default value. This is not possible if the table is not empty.
  - Added the required column `qtd_pessoas` to the `UnidadeHabitacional` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Acao` DROP FOREIGN KEY `Acao_tipoAcaoId_fkey`;

-- DropForeignKey
ALTER TABLE `DanosHumanos` DROP FOREIGN KEY `DanosHumanos_unidadeHabitacionalId_fkey`;

-- DropForeignKey
ALTER TABLE `DanosMateriais` DROP FOREIGN KEY `DanosMateriais_unidadeHabitacionalId_fkey`;

-- AlterTable
ALTER TABLE `Acao` DROP COLUMN `tipoAcaoId`,
    ADD COLUMN `tipo` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `UnidadeHabitacional` ADD COLUMN `fl_danificado` BOOLEAN NOT NULL,
    ADD COLUMN `fl_desabrigado` BOOLEAN NOT NULL,
    ADD COLUMN `fl_desalojado` BOOLEAN NOT NULL,
    ADD COLUMN `fl_destroido` BOOLEAN NOT NULL,
    ADD COLUMN `fl_resiliente` BOOLEAN NOT NULL,
    ADD COLUMN `fl_resistente` BOOLEAN NOT NULL,
    ADD COLUMN `qtd_adolescente` INTEGER NOT NULL,
    ADD COLUMN `qtd_adultos` INTEGER NOT NULL,
    ADD COLUMN `qtd_criancas` INTEGER NOT NULL,
    ADD COLUMN `qtd_familias` INTEGER NOT NULL,
    ADD COLUMN `qtd_homens` INTEGER NOT NULL,
    ADD COLUMN `qtd_idosos` INTEGER NOT NULL,
    ADD COLUMN `qtd_mulheres` INTEGER NOT NULL,
    ADD COLUMN `qtd_pessoas` INTEGER NOT NULL;

-- DropTable
DROP TABLE `DanosHumanos`;

-- DropTable
DROP TABLE `DanosMateriais`;

-- DropTable
DROP TABLE `TipoAcao`;
