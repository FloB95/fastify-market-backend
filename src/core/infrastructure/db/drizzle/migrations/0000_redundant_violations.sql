CREATE TABLE `User` (
	`id` varchar(36) NOT NULL,
	`firstname` varchar(255) NOT NULL,
	`lastname` varchar(255) NOT NULL,
	`email` varchar(255) NOT NULL,
	`createdAt` datetime NOT NULL,
	`updatedAt` datetime DEFAULT null,
	CONSTRAINT `User_id` PRIMARY KEY(`id`),
	CONSTRAINT `email` UNIQUE(`email`)
);
