CREATE TABLE color (
   id_color SMALLINT AUTO_INCREMENT,
   color VARCHAR(50) NOT NULL,
   PRIMARY KEY (id_color),
   UNIQUE (color)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE material (
   id_material SMALLINT AUTO_INCREMENT,
   material VARCHAR(50) NOT NULL,
   PRIMARY KEY (id_material),
   UNIQUE (material)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE size (
   id_size SMALLINT AUTO_INCREMENT,
   size VARCHAR(50) NOT NULL,
   PRIMARY KEY (id_size),
   UNIQUE (size)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE category (
   id_category SMALLINT AUTO_INCREMENT,
   category VARCHAR(100) NOT NULL,
   PRIMARY KEY (id_category),
   UNIQUE (category)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE article (
   id_article SMALLINT AUTO_INCREMENT,
   name VARCHAR(150) NOT NULL,
   detail VARCHAR(50) NOT NULL,
   description VARCHAR(6000) NOT NULL,
   manufacturing VARCHAR(150),
   price DECIMAL(10,2) NOT NULL,
   reduction SMALLINT NOT NULL,
   genders VARCHAR(50) NOT NULL,
   id_category SMALLINT NOT NULL,
   PRIMARY KEY (id_article),
   FOREIGN KEY (id_category) REFERENCES category (id_category)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE image (
   id_image SMALLINT AUTO_INCREMENT,
   img VARCHAR(250) NOT NULL,
   id_article SMALLINT NOT NULL,
   PRIMARY KEY (id_image),
   FOREIGN KEY (id_article) REFERENCES article (id_article),
   UNIQUE (img)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE have_colors (
   id_article SMALLINT,
   id_color SMALLINT,
   PRIMARY KEY (id_article, id_color),
   FOREIGN KEY (id_article) REFERENCES article (id_article),
   FOREIGN KEY (id_color) REFERENCES color (id_color)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE have_materials (
   id_article SMALLINT,
   id_material SMALLINT,
   PRIMARY KEY (id_article, id_material),
   FOREIGN KEY (id_article) REFERENCES article (id_article),
   FOREIGN KEY (id_material) REFERENCES material (id_material)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE have_sizes (
   id_article SMALLINT,
   id_size SMALLINT,
   stock SMALLINT NOT NULL,
   PRIMARY KEY (id_article, id_size),
   FOREIGN KEY (id_article) REFERENCES article (id_article),
   FOREIGN KEY (id_size) REFERENCES size (id_size)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
