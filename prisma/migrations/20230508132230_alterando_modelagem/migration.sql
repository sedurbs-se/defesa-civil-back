-- CreateTable
CREATE TABLE `Municipio` (
    `id` VARCHAR(191) NOT NULL,
    `nome` VARCHAR(191) NOT NULL,
    `estado` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Desastre` (
    `id` VARCHAR(191) NOT NULL,
    `municipio_id` VARCHAR(191) NOT NULL,
    `agenteId` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AreaAfetada` (
    `id` VARCHAR(191) NOT NULL,
    `ORDEM` INTEGER NOT NULL,
    `nome` VARCHAR(191) NOT NULL,
    `desastreId` VARCHAR(191) NULL,

    UNIQUE INDEX `AreaAfetada_ORDEM_key`(`ORDEM`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UnidadeHabitacional` (
    `id` VARCHAR(191) NOT NULL,
    `ORDEM` INTEGER NOT NULL,
    `endereco` VARCHAR(191) NOT NULL,
    `coordenadas` VARCHAR(191) NOT NULL,
    `areaAfetadaId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `fl_sos` BOOLEAN NULL,
    `dt_finalizado` DATETIME(3) NULL,

    UNIQUE INDEX `UnidadeHabitacional_ORDEM_key`(`ORDEM`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DanosHumanos` (
    `id` VARCHAR(191) NOT NULL,
    `unidadeHabitacionalId` VARCHAR(191) NOT NULL,
    `qtd_familas` INTEGER NOT NULL,
    `qtd_pessoas` INTEGER NOT NULL,
    `qtd_idosos` INTEGER NOT NULL,
    `qtd_criancas` INTEGER NOT NULL,
    `qtd_adulto` INTEGER NOT NULL,
    `qtd_adolescente` INTEGER NOT NULL,
    `qtd_homens` INTEGER NOT NULL,
    `qtd_mulheres` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DanosMateriais` (
    `id` VARCHAR(191) NOT NULL,
    `unidadeHabitacionalId` VARCHAR(191) NOT NULL,
    `fl_resistente` BOOLEAN NOT NULL,
    `fl_danificado` BOOLEAN NOT NULL,
    `fl_destroido` BOOLEAN NOT NULL,
    `fl_resiliente` BOOLEAN NOT NULL,
    `fl_desabrigado` BOOLEAN NOT NULL,
    `fl_desalojado` BOOLEAN NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TipoAcao` (
    `id` VARCHAR(191) NOT NULL,
    `nome` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Acao` (
    `id` VARCHAR(191) NOT NULL,
    `tipoAcaoId` VARCHAR(191) NOT NULL,
    `unidadeHabitacionalId` VARCHAR(191) NOT NULL,
    `afetado_cpf` VARCHAR(191) NOT NULL,
    `afetado_contato` VARCHAR(191) NOT NULL,
    `afetado_nome` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `FotoUnidade` (
    `id` VARCHAR(191) NOT NULL,
    `unidadeHabitacionalId` VARCHAR(191) NOT NULL,
    `url` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Usuario` (
    `id` VARCHAR(191) NOT NULL,
    `cpf` VARCHAR(191) NOT NULL,
    `nome` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Usuario_cpf_key`(`cpf`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Agente` (
    `id` VARCHAR(191) NOT NULL,
    `funcao` VARCHAR(191) NOT NULL,
    `contato` VARCHAR(191) NOT NULL,
    `usuario_id` VARCHAR(191) NOT NULL,
    `fl_lider_equipe` BOOLEAN NULL,

    UNIQUE INDEX `Agente_usuario_id_key`(`usuario_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Equipe` (
    `id` VARCHAR(191) NOT NULL,
    `nome` VARCHAR(191) NOT NULL,
    `funcao` VARCHAR(191) NOT NULL,
    `contato` VARCHAR(191) NOT NULL,
    `areaAfetadaId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `EquipeAgente` (
    `agenteId` VARCHAR(191) NOT NULL,
    `equipeId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`agenteId`, `equipeId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Desastre` ADD CONSTRAINT `Desastre_municipio_id_fkey` FOREIGN KEY (`municipio_id`) REFERENCES `Municipio`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Desastre` ADD CONSTRAINT `Desastre_agenteId_fkey` FOREIGN KEY (`agenteId`) REFERENCES `Agente`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AreaAfetada` ADD CONSTRAINT `AreaAfetada_desastreId_fkey` FOREIGN KEY (`desastreId`) REFERENCES `Desastre`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UnidadeHabitacional` ADD CONSTRAINT `UnidadeHabitacional_areaAfetadaId_fkey` FOREIGN KEY (`areaAfetadaId`) REFERENCES `AreaAfetada`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DanosHumanos` ADD CONSTRAINT `DanosHumanos_unidadeHabitacionalId_fkey` FOREIGN KEY (`unidadeHabitacionalId`) REFERENCES `UnidadeHabitacional`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DanosMateriais` ADD CONSTRAINT `DanosMateriais_unidadeHabitacionalId_fkey` FOREIGN KEY (`unidadeHabitacionalId`) REFERENCES `UnidadeHabitacional`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Acao` ADD CONSTRAINT `Acao_tipoAcaoId_fkey` FOREIGN KEY (`tipoAcaoId`) REFERENCES `TipoAcao`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Acao` ADD CONSTRAINT `Acao_unidadeHabitacionalId_fkey` FOREIGN KEY (`unidadeHabitacionalId`) REFERENCES `UnidadeHabitacional`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FotoUnidade` ADD CONSTRAINT `FotoUnidade_unidadeHabitacionalId_fkey` FOREIGN KEY (`unidadeHabitacionalId`) REFERENCES `UnidadeHabitacional`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Agente` ADD CONSTRAINT `Agente_usuario_id_fkey` FOREIGN KEY (`usuario_id`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EquipeAgente` ADD CONSTRAINT `EquipeAgente_agenteId_fkey` FOREIGN KEY (`agenteId`) REFERENCES `Agente`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EquipeAgente` ADD CONSTRAINT `EquipeAgente_equipeId_fkey` FOREIGN KEY (`equipeId`) REFERENCES `Equipe`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
