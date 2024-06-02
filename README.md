# Movieland

This is a Movie Search and Trailer App that allows users to search for movies, view their trailers, and manage a list of favorite and watch later movies. The app is built using React, Redux, TypeScript, and SCSS, and includes both unit and end-to-end (E2E) tests using Jest and Cypress.

## Prerequisites

Ensure you have the following environment:

- Node.js
- npm or yarn

## Getting Started

Follow these steps to get the project up and running on your local machine.

### Clone the Repository

```bash
git clone https://github.com/bluejs/movie-search-trailer-app.git
cd movie-search-trailer-app
```

### Install Dependencies

```bash
npm install
# or
yarn
```

### Start in dev mode

```bash
npm run start
# or
yarn start
```

This will start the development server and open the app in your default web browser, you can also open it manually at http://localhost:3000

## Scripts

The following scripts are available to manage and test the application

### Build

```bash
npm run build
# or
yarn build
```

This script builds the app for production to the `build` folder, and it's ready-for-deploy

### Unit Tests

To run unit tests once and generate a coverage report:

```bash
npm run test:unit
# or
yarn test:unit
```

To run unit tests in watch mode:

```bash
npm run test:unit:watch
# or
yarn test:unit:watch
```

### E2E Tests

To run end-to-end tests using Cypress:

```bash
npm run test:e2e
# or
yarn test:e2e
```

Open the Cypress test runner and run tests in watch mode:

```bash
npm run test:e2e:watch
# or
yarn test:e2e:watch
```

### Run All Tests

To run both unit and e2e tests:

```bash
npm test
# or
yarn test
```

### Format Code with Prettier

To format the code using Prettier:

```bash
npm run prettier
# or
yarn prettier
```

#### Lint Code with ESLint

To lint the code and automatically fix issues:

```bash
npm run lint
# or
yarn lint
```

### Eject (NEVER DO THIS)

This command should NEVER be used:

```bash
npm run eject
# or
yarn eject
```

> **Note:** This action is permanent and cannot be undone

> If you're looking forward to customize configurations, use `react-app-rewired`
