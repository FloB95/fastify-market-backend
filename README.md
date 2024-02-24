# Fastify TypeScript Project Template

This is a template repository for setting up a Fastify Node.js project with TypeScript, including best practices for project structure, security, logging, testing, and more.

[![License](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![GitHub Issues](https://img.shields.io/github/issues/yourusername/your-repo.svg)](https://github.com/FloB95/fastify-market-backend/issues)
[![GitHub Pull Requests](https://img.shields.io/github/issues-pr/yourusername/your-repo.svg)](https://github.com/FloB95/fastify-market-backend/pulls)

## Table of Contents

- [Fastify TypeScript Project Template](#fastify-typescript-project-template)
  - [Table of Contents](#table-of-contents)
  - [About](#about)
  - [Features](#features)
  - [Folder Structure](#folder-structure)
  - [Setup](#setup)

## About

This project provides a clean template for building Fastify Node.js applications using TypeScript. It incorporates best practices for project organization, security, logging, testing, and more to help you get started quickly and efficiently.

## Features

- **Clean Architecture**: Organize your codebase using the principles of Clean Architecture for better maintainability and scalability.
- **TypeScript Support**: Write your code in TypeScript for improved type safety and developer productivity.
- **Security**: Implement security best practices, such as request validation and authentication, to protect your application from common vulnerabilities.
- **Logging**: Set up structured logging to track application events and monitor performance.
- **Testing**: Write unit tests and integration tests to ensure the reliability and correctness of your codebase.
- **Linting and Formatting**: Enforce coding standards and consistency using ESLint and Prettier.
- **Continuous Integration**: Automate tests and code quality checks with GitHub Actions.

## Folder Structure

The project follows a modular folder structure based on Clean Architecture principles:

- **src**: Contains the source code of your application.
  - **adapters**: Adapters to interact with external systems (e.g., database, external APIs).
  - **application**: Application layer containing business logic and use cases.
  - **domain**: Domain layer containing entities and domain logic.
  - **interfaces**: Interfaces and DTOs used across layers.
  - **services**: Services for performing business operations.
- **tests**: Contains unit tests and integration tests for your application.

## Setup

1. Clone this repository.
2. Install dependencies:

   ```bash
   npm install
3. Setup Local Database:

   ```bash
   docker-compose up -d
