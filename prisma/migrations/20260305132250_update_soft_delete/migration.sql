-- DropForeignKey
ALTER TABLE `ScrapeConfig` DROP FOREIGN KEY `ScrapeConfig_userId_fkey`;

-- DropForeignKey
ALTER TABLE `Token` DROP FOREIGN KEY `Token_userId_fkey`;

-- DropIndex
DROP INDEX `ScrapeConfig_userId_fkey` ON `ScrapeConfig`;

-- DropIndex
DROP INDEX `Token_userId_fkey` ON `Token`;

-- AlterTable
ALTER TABLE `User` ADD COLUMN `deleteAt` DATETIME(3) NULL,
    ADD COLUMN `isDeleted` BOOLEAN NOT NULL DEFAULT false;

-- AddForeignKey
ALTER TABLE `Token` ADD CONSTRAINT `Token_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ScrapeConfig` ADD CONSTRAINT `ScrapeConfig_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
