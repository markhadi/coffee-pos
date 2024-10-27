/*
  Warnings:

  - You are about to alter the column `product_price` on the `product_transaction_details` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.
  - You are about to alter the column `amount` on the `product_transaction_details` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.
  - You are about to alter the column `total_amount` on the `product_transactions` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.
  - You are about to alter the column `price` on the `products` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.

*/
-- AlterTable
ALTER TABLE `product_transaction_details` MODIFY `product_price` DOUBLE NOT NULL,
    MODIFY `amount` DOUBLE NOT NULL;

-- AlterTable
ALTER TABLE `product_transactions` MODIFY `total_amount` DOUBLE NOT NULL;

-- AlterTable
ALTER TABLE `products` MODIFY `price` DOUBLE NOT NULL;
