/*
  Warnings:

  - The primary key for the `Images` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Images` table. All the data in the column will be lost.
  - You are about to alter the column `file_path` on the `Images` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `Char(36)`.

*/
-- AlterTable
ALTER TABLE `Images` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    MODIFY `file_path` CHAR(36) NOT NULL,
    ADD PRIMARY KEY (`file_path`);
