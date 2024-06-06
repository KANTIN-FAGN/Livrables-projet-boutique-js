CREATE TABLE color (
   id_color INT AUTO_INCREMENT,
   color VARCHAR(50) NOT NULL,
   PRIMARY KEY (id_color),
   UNIQUE (color)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE material (
   id_material INT AUTO_INCREMENT,
   material VARCHAR(50) NOT NULL,
   PRIMARY KEY (id_material),
   UNIQUE (material)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE size (
   id_size INT AUTO_INCREMENT,
   size VARCHAR(50) NOT NULL,
   PRIMARY KEY (id_size),
   UNIQUE (size)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE category (
   id_category INT AUTO_INCREMENT,
   category VARCHAR(100) NOT NULL,
   PRIMARY KEY (id_category),
   UNIQUE (category)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE article (
   id_article INT AUTO_INCREMENT,
   name VARCHAR(150) NOT NULL,
   detail VARCHAR(50) NOT NULL,
   description VARCHAR(6000) NOT NULL,
   manufacturing VARCHAR(150),
   price DECIMAL(10,2) NOT NULL,
   reduction TINYINT NOT NULL,
   genders VARCHAR(50) NOT NULL,
   id_category INT NOT NULL,
   PRIMARY KEY (id_article),
   FOREIGN KEY (id_category) REFERENCES category (id_category)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE image (
   id_image INT AUTO_INCREMENT,
   img VARCHAR(250) NOT NULL,
   id_article INT NOT NULL,
   PRIMARY KEY (id_image),
   FOREIGN KEY (id_article) REFERENCES article (id_article),
   UNIQUE (img)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE have_colors (
   id_article INT,
   id_color INT,
   PRIMARY KEY (id_article, id_color),
   FOREIGN KEY (id_article) REFERENCES article (id_article),
   FOREIGN KEY (id_color) REFERENCES color (id_color)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE have_materials (
   id_article INT,
   id_material INT,
   PRIMARY KEY (id_article, id_material),
   FOREIGN KEY (id_article) REFERENCES article (id_article),
   FOREIGN KEY (id_material) REFERENCES material (id_material)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE have_sizes (
   id_article INT,
   id_size INT,
   stock INT NOT NULL,
   PRIMARY KEY (id_article, id_size),
   FOREIGN KEY (id_article) REFERENCES article (id_article),
   FOREIGN KEY (id_size) REFERENCES size (id_size)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE users(
   id_user INT AUTO_INCREMENT,
   firstname VARCHAR(200) NOT NULL,
   lastname VARCHAR(200) NOT NULL,
   email VARCHAR(250) NOT NULL,
   pswd VARCHAR(250) NOT NULL,
   salt VARCHAR(50) NOT NULL,
   adress VARCHAR(250) NOT NULL,
   PRIMARY KEY(id_user),
   UNIQUE(email)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE have_order(
   id_article SMALLINT,
   id_user INT,
   id_order INT AUTO_INCREMENT,
   currentdate timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
   PRIMARY KEY(id_order),
   FOREIGN KEY(id_article) REFERENCES article(id_article),
   FOREIGN KEY(id_user) REFERENCES users(id_user)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE have_fav(
   id_article SMALLINT, 
   id_user INT,
   PRIMARY KEY(id_article, id_user),
   FOREIGN KEY(id_article) REFERENCES article(id_article),
   FOREIGN KEY(id_user) REFERENCES users(id_user)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


