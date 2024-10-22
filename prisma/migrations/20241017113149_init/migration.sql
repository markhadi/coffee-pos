-- CreateTable
CREATE TABLE `users` (
    `username` VARCHAR(100) NOT NULL,
    `password` VARCHAR(100) NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `refresh_token` TEXT NULL,
    `role` ENUM('ADMIN', 'CASHIER') NOT NULL,

    PRIMARY KEY (`username`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `categories` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `products` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `code` VARCHAR(10) NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `stock` INTEGER NOT NULL,
    `price` BIGINT NOT NULL,
    `category_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `created_by_username` VARCHAR(100) NOT NULL,
    `updated_by_username` VARCHAR(100) NOT NULL,

    UNIQUE INDEX `products_code_key`(`code`),
    INDEX `products_code_idx`(`code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `payment_methods` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    `description` TEXT NULL,
    `is_active` BOOLEAN NOT NULL DEFAULT true,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `created_by_username` VARCHAR(100) NOT NULL,
    `updated_by_username` VARCHAR(100) NOT NULL,

    UNIQUE INDEX `payment_methods_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `product_transactions` (
    `transaction_id` VARCHAR(10) NOT NULL,
    `customer_name` VARCHAR(100) NOT NULL,
    `total_quantity` INTEGER NOT NULL,
    `total_amount` BIGINT NOT NULL,
    `payment_method_id` INTEGER NOT NULL,
    `payment_method` VARCHAR(100) NOT NULL,
    `username` VARCHAR(100) NOT NULL,
    `service_by` VARCHAR(100) NOT NULL,
    `service_charge` BIGINT NOT NULL,
    `issued_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`transaction_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `product_transaction_details` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `transaction_id` VARCHAR(10) NOT NULL,
    `product_id` INTEGER NOT NULL,
    `product_name` VARCHAR(100) NOT NULL,
    `product_price` BIGINT NOT NULL,
    `product_category_id` INTEGER NOT NULL,
    `product_category_name` VARCHAR(100) NOT NULL,
    `quantity` INTEGER NOT NULL,
    `amount` BIGINT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `products` ADD CONSTRAINT `products_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `products` ADD CONSTRAINT `products_created_by_username_fkey` FOREIGN KEY (`created_by_username`) REFERENCES `users`(`username`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `products` ADD CONSTRAINT `products_updated_by_username_fkey` FOREIGN KEY (`updated_by_username`) REFERENCES `users`(`username`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `payment_methods` ADD CONSTRAINT `payment_methods_created_by_username_fkey` FOREIGN KEY (`created_by_username`) REFERENCES `users`(`username`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `payment_methods` ADD CONSTRAINT `payment_methods_updated_by_username_fkey` FOREIGN KEY (`updated_by_username`) REFERENCES `users`(`username`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `product_transaction_details` ADD CONSTRAINT `product_transaction_details_transaction_id_fkey` FOREIGN KEY (`transaction_id`) REFERENCES `product_transactions`(`transaction_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
