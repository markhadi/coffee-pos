/*
  Warnings:

  - You are about to alter the column `service_charge` on the `product_transactions` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.

*/
-- AlterTable
ALTER TABLE `product_transactions` MODIFY `service_charge` DOUBLE NOT NULL;
