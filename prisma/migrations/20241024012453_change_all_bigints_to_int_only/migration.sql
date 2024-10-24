/*
  Warnings:

  - You are about to alter the column `product_price` on the `product_transaction_details` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `amount` on the `product_transaction_details` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `total_amount` on the `product_transactions` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `service_charge` on the `product_transactions` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `price` on the `products` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.

*/
-- AlterTable
ALTER TABLE `product_transaction_details` MODIFY `product_price` INTEGER NOT NULL,
    MODIFY `amount` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `product_transactions` MODIFY `total_amount` INTEGER NOT NULL,
    MODIFY `service_charge` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `products` MODIFY `price` INTEGER NOT NULL;
