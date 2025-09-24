# NestJS Clean Architecture Template

This is a template for a NestJS application with a clean architecture. It provides a solid foundation for building scalable and maintainable applications.

## Features

- **Clean Architecture:** The code is organized into layers (Entities, Use Cases, Adapters) to separate concerns and improve maintainability.
- **JWT Authentication:** Comes with a ready-to-use JWT authentication and authorization system.
- **In-Memory Database:** Includes an in-memory database for development and testing, with the option to switch to a persistent database like MongoDB.
- **Configuration:** Uses `.env` files for easy configuration management.
- **Testing:** `TODO`
- **Linting and Formatting:** Uses ESLint and Prettier for code quality.

## Project Structure

The project follows the principles of Clean Architecture, which is divided into the following layers:

- `src/entities`: Contains the core business entities of the application.
- `src/application`: Contains the application-specific business rules. It includes use cases, repositories interfaces, and services interfaces.
- `src/adapters`: Contains the implementation of the interfaces defined in the application layer. This includes controllers, repositories, and services.
- `src/shared`: Contains shared utilities and helper functions.
- `src/config`: Contains the environment configuration.
- `src/main.ts`: The entry point of the application.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/en/) (v22 or higher)
- [pnpm](https://pnpm.io/)

### Installation

1.  Clone the repository:

    ```bash
    git clone https://github.com/your-username/nestjs-clean-architecture-template.git
    ```

2.  Navigate to the project directory:

    ```bash
    cd nestjs-clean-architecture-template
    ```

3.  Install the dependencies:

    ```bash
    pnpm install
    ```

4.  Create a `.env` file by copying the `.env.example` file:

    ```bash
    cp .env.example .env
    ```

5.  Update the `.env` file with your configuration.

## Running the app

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Configuration

The application is configured using environment variables. You can find the available variables in the `.env.example` file.

| Variable                 | Description                                    | Default            |
| ------------------------ | ---------------------------------------------- | ------------------ |
| `NODE_ENV`               | Node environment                               | `development`      |
| `PORT`                   | The port to run the application on             | `3000`             |
| `DATABASE_URL`           | The URL of the database                        | `mongodb://...`    |
| `JWT_SECRET`             | The secret key for JWT                         | `this_is_a_secret` |
| `JWT_ACCESS_EXPIRES_IN`  | The expiration time for the access token       | `1h`               |
| `JWT_REFRESH_EXPIRES_IN` | The expiration time for the refresh token      | `7d`               |
| `BCRYPT_ROUNDS`          | The number of rounds for password hashing      | `10`               |
| `DB_SELECT`              | The database to use (`MONGODB` or `IN_MEMORY`) | `IN_MEMORY`        |

## Testing

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```

## License

This project is licensed under the UNLICENSED License.
