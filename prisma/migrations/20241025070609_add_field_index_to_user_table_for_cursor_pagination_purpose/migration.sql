/*
  Warnings:

  - A unique constraint covering the columns `[index]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `index` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `users` ADD COLUMN `index` INTEGER NOT NULL AUTO_INCREMENT;

-- CreateIndex
CREATE UNIQUE INDEX `users_index_key` ON `users`(`index`);

-- CreateIndex
CREATE INDEX `users_index_idx` ON `users`(`index`);
