CREATE TABLE IF NOT EXISTS `articles` (
    `id` INT AUTO_INCREMENT,
    `name` VARCHAR(128) NOT NULL,
    `materials` VARCHAR(255) NOT NULL,
    `description` VARCHAR(6000) NOT NULL,
    `manufacturing` VARCHAR(255) NOT NULL,
    `price` DECIMAL(10,2) NOT NULL,
    `reduction` INT NOT NULL,
    `sex` BOOLEAN NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `images` (
    `id` INT AUTO_INCREMENT,
    `article_id` INT NOT NULL,
    `URL` VARCHAR(255) NOT NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`article_id`) REFERENCES `articles`(`id`) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS `sizes` (
    `id` INT AUTO_INCREMENT,
    `article_id` INT NOT NULL,
    `size` VARCHAR(20) NOT NULL,
    `quantity` INT NOT NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`article_id`) REFERENCES `articles`(`id`) ON DELETE CASCADE
);
