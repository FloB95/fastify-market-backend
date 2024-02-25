## Fastify TypeScript Project Template

License: [https://opensource.org/licenses/MIT](https://opensource.org/licenses/MIT)  
GitHub Issues: [https://github.com/FloB95/fastify-market-backend/issues](https://github.com/FloB95/fastify-market-backend/issues)  
GitHub Pull Requests: [https://github.com/FloB95/fastify-market-backend/pulls](https://github.com/FloB95/fastify-market-backend/pulls)  

## Table of Contents

- Fastify TypeScript Project Template: [#fastify-typescript-project-template]
  - Table of Contents: [#table-of-contents]
  - About: [#about]
  - Features: [#features]
  - Folder Structure: [#folder-structure]
  - Project Organization: [#project-organization]
  - Setup: [#setup]

## About

This project provides a clean and well-structured template for building robust and scalable Fastify Node.js applications using TypeScript. It incorporates best practices for:

- **Clean Architecture:** Organize your codebase for clarity and flexibility.
- **TypeScript Support:** Ensure type safety and leverage language features for a better developer experience.
- **Security:** Implement robust security measures to protect your application from vulnerabilities.
- **Logging:** Track application events, monitor performance, and facilitate debugging.
- **Testing:** Write unit and integration tests for reliability and correctness.
- **Linting and Formatting:** Enforce coding standards and maintain consistency.
- **Continuous Integration:** Automate testing and code quality checks to streamline development.

## Features

- **Modular Structure:** Adheres to Clean Architecture principles for better maintainability and scalability.
- **Clear Project Organization:** Follows a logical folder structure with well-defined responsibilities for each component.
- **Secure by Design:** Integrates security best practices throughout the application.
- **Comprehensive Testing:** Ensures code quality and reliability through unit and integration tests.
- **Enhanced Developer Experience:** Benefits from TypeScript's type safety and linting for improved code quality.
- **Automated Workflows:** Streamlines development with continuous integration/continuous delivery (CI/CD) practices.

## Folder Structure

The project adheres to a well-organized and well-documented folder structure:

### Core

```markdown
├── adapters
│   ├── api             # Handles API-specific logic, potentially further separated by version (e.g., v1, v2).
│   ├── controllers     # Contains API route handlers.
│   └── repositories    # Abstractions for interacting with data sources.
├── config               # Stores global application configuration (database, server, etc.).
├── domain
│   ├── cache           # Handles caching mechanisms.
│   ├── documentation   # Stores documentation related to the domain layer.
│   ├── dto             # Defines data transfer objects used for communication between layers.
│   ├── entities        # Represents core domain entities and models.
│   ├── events          # Defines domain events and event handling mechanisms.
│   ├── http            # Provides abstractions for HTTP requests and responses.
│   ├── logger          # Implements logging functionality.
│   ├── repositories    # Abstractions for accessing domain entities.
│   └── use_cases       # Use cases related to users.
├── errors              # Defines custom error classes for consistent error handling.
├── zod                 # Custom error handling for Zod validation errors.
├── helpers             # Contains reusable utility functions.
├── infrastructure
│   ├── cache           # Implements the chosen cache mechanism (e.g., Redis).
│   ├── db
│       ├── migrations  # Stores database migration scripts.
│       ├── schema      # Defines database schema and models.
│       └── seed        # Populates the database with initial data.
│   ├── documentation   # Stores infrastructure-specific documentation.
│   ├── event           # Handles event management and communication.
│   ├── fastify         # Configures and initializes the Fastify server.
│   └── logger          # Implements the chosen logging library.
├── server              # Starts the Fastify server and its associated components.
└── utils               # Contains general utilities not specific to other folders.

```

**Modules:**
Each module encapsulates a specific feature or functionality.

**Example:** user module

```markdown

└── user
    ├── adapters
    │   ├── controllers  # Adapters related to user functionality (e.g., controllers, repositories).
    │   └── repositories # (Optional)
    ├── application
    │   ├── dtos        # Data transfer objects specific to user data.
    │   ├── events       # User-related events.
    │   ├── factories     # Creates test data for users.
    │   ├── services     # User-related business logic.
    │   └── documentation # Module-specific documentation.
    ├── domain
    │   ├── entities     # Domain entities and models related to users.
    │   └── use_cases    # Use cases related to users.
    ├── infrastructure
    │   ├── db           # (Optional) Database-specific implementations for user-related functionality.
    │   └── event        # (Optional) Event-related implementations for user-related functionality.
    └── setup          # Module initialization logic.

```

## Project Organization

Each layer within the folder structure has a well-defined purpose, promoting clean separation of concerns:

- **Core:** Contains pure business logic and domain rules, independent of infrastructure and presentation.
- **Adapters:** Mediates communication with external systems.
- **Infrastructure:** Provides concrete implementations for interacting with external systems.
- **Presentation:** Handles user interface and interaction logic (optional).

You can adapt this structure to your specific project needs and preferences, ensuring clarity and maintainability.

## Setup

1. Clone this repository:

   ```bash
   git clone https://github.com/your-username/your-repo.git
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. (Optional) Set up a local database using Docker Compose:

   ```bash
   docker-compose up -d
   ```

4. Refer to the `config.env` file for environment variables and adjust as needed.

5. Start the development server:

   ```bash
   # Replace
