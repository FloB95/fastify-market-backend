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
CREATE INDEX `expiresAt` ON `RefreshToken` (`expiresAt`);