CREATE TABLE `RefreshToken` (
	`id` varchar(36) NOT NULL,
	`userId` varchar(36) NOT NULL,
	`expiresAt` datetime NOT NULL,
	`createdAt` datetime NOT NULL,
	`updatedAt` datetime DEFAULT null,
	CONSTRAINT `RefreshToken_id` PRIMARY KEY(`id`),
	CONSTRAINT `userId` UNIQUE(`userId`)
);
--> statement-breakpoint
CREATE TABLE `User` (
	`id` varchar(36) NOT NULL,
	`firstname` varchar(255) NOT NULL,
	`password` varchar(255) NOT NULL,
	`lastname` varchar(255) NOT NULL,
	`email` varchar(255) NOT NULL,
	`roles` json NOT NULL DEFAULT ('["APPLICATION_USER"]'),
	`createdAt` datetime NOT NULL,
	`updatedAt` datetime DEFAULT null,
	CONSTRAINT `User_id` PRIMARY KEY(`id`),
	CONSTRAINT `email` UNIQUE(`email`)
);
--> statement-breakpoint
CREATE INDEX `expiresAt` ON `RefreshToken` (`expiresAt`);--> statement-breakpoint
CREATE INDEX `firstname` ON `User` (`firstname`);--> statement-breakpoint
CREATE INDEX `lastname` ON `User` (`lastname`);--> statement-breakpoint
CREATE INDEX `createdAt` ON `User` (`createdAt`);--> statement-breakpoint
CREATE INDEX `updatedAt` ON `User` (`updatedAt`);--> statement-breakpoint
ALTER TABLE `RefreshToken` ADD CONSTRAINT `RefreshToken_userId_User_id_fk` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE cascade ON UPDATE no action;