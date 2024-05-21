# Side Take Home

## Description

The GraphAL API is set up in a monorepo for easy sharing of authorization, entity factories, utility functions, and end-to-end tests.

The main GraphQL API is exposed by Express in the `apps/api/src/index.ts` file.

Entities included by the GraphQL API are defined in the `apps/api/src/entities/` folder. Each entity has its own GraphQL type definitions, resolvers, and database models.

Inside the `apps/e2e-tests` folder, you'll find the end-to-end test suite. This test suite expects the API and database to be running locally.

## Setup

To run the API locally, you will need to:

1. Install the dependencies using `yarn` with the correct `node` version installed (see `.nvmrc` if you encounter errors).
2. Copy `.env.example` to `.env`.
3. Run `yarn codegen` in the root of the repo to generate clients from the API.
4. Run `yarn start:database` and `yarn start:server` in `apps/api`.
5. You can now query the API locally on the port configured in your `.env` file or run the end-to-end test suite in `apps/e2e-tests` with the `yarn test:e2e` command.

## Package Intended Use Cases

- `packages/auth`: This package uses `casl` to define auth rules for various entities. It should be used on the frontend and backend to enforce auth. There are many ways to use this package with Mongo, React, and vanilla JS. We should push all auth logic to here.
- `packages/factories`: These factories are generated with `factory.ts` and `faker`. We should use them in our frontend and other unit tests to avoid manually writing entities.
- `packages/scripts`: This is a place to put simple scripts that get consumed by more than one app or package.
- `packages/tsconfig`: A shared place to put our tsconfig base file.
- `packages/types`: This is a place to put utility types that are reused.
- `packages/utils`: This is a place to put utility functions that are _non-runtime_ specific. Avoid putting utilities specific to Node or the browser in here.

## API Architecture

The GraphQL API uses several strategies to make it more secure, performant, and reliable:

- **GraphQL Codegen**: You can run `yarn codegen` in the root of the monorepo to generate types and clients from the main GraphQL API. This allows us to statically check our GraphQL queries before running tests or executing API requests. It also ensures our resolvers return the correct types that GraphQL expects.
- **GraphQL Scalars**: We have several custom GraphQL scalars set up. You can see them in `packages/scripts/scalars.ts`. Please use as specific a scalar as possible to ensure reliability and correctness across the app.
- **GraphQL Middleware**: There is a middleware package set up to allow us to insert business logic into the GraphQL API. Please use this for logging, analytics, and performance monitoring.
- **GraphQL Decorators**: The GraphQL API currently has a `@private` decorator set up. We should improve the API and add more decorators to allow for easy sanitation of strings passed into mutations, and more.
- **Dataloaders**: To keep the API performant, we are using dataloaders to resolve resources. The dataloader cache is reset for every request in the main GraphQL context. This allows us to de-dupe requests for the same resource that may happen during a GraphQL query.

### Adding a New GraphQL Entity

(IMPROVE: implement a Plop.js template to automate this)

- Create a new entity folder in `apps/api/src/entities`.
- Add a type definitions file, resolvers file, and Mongoose model file.
- Import those files to the correct location.

## Deployment Checks

There are several quality checks enabled to ensure reliability:

- Renovate is configured to update dependencies regularly.
- GitHub Actions are configured to run lint, type-check, and tests against open pull requests before they are merged.
- A security check is run against installed dependencies for all pull requests to ensure we are not shipping dependencies with known vulnerabilities.
