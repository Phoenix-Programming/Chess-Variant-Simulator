# Chess Variant Simulator

A web application for simulating and playing various chess variants. Built with modern web technologies to provide an interactive and educational chess experience.

## Features

- Interactive chess variant gameplay
- Modern, responsive user interface
- Type-safe codebase with TypeScript
- State management with Pinia
- Routing capabilities for multi-view application

## Tech Stack

### Core Framework & Language

- **[Vue 3](https://vuejs.org/)** - Progressive JavaScript framework with Composition API
- **[TypeScript](https://www.typescriptlang.org/)** - Static type checking and enhanced developer experience

### Build Tools & Development

- **[Vite](https://vite.dev/)** - Lightning-fast build tool and development server
- **[Vue DevTools](https://github.com/vuejs/devtools)** - Browser extension for debugging Vue applications

### State Management & Routing

- **[Pinia](https://pinia.vuejs.org/)** - Intuitive, type-safe state management for Vue
- **[Vue Router](https://router.vuejs.org/)** - Official routing library for Vue.js

### Code Quality & Linting

- **[ESLint](https://eslint.org/)** - Pluggable linting utility for JavaScript and TypeScript
- **[Oxlint](https://oxc.rs/docs/guide/usage/linter.html)** - Fast Rust-based linter for additional validation
- **[Prettier](https://prettier.io/)** - Opinionated code formatter

### Testing

- **[Vitest](https://vitest.dev/)** - Fast unit testing framework powered by Vite
- **[Cypress](https://www.cypress.io/)** - End-to-end testing framework
- **[Vue Test Utils](https://test-utils.vuejs.org/)** - Official testing utilities for Vue components
- **[jsdom](https://github.com/jsdom/jsdom)** - JavaScript implementation of web standards for Node.js

### Additional Tools

- **[vue-tsc](https://github.com/vuejs/language-tools)** - TypeScript compiler wrapper for Vue SFC type checking
- **[npm-run-all2](https://github.com/bcomnes/npm-run-all2)** - CLI tool for running multiple npm scripts

## Requirements

- **Node.js**: >=22.12.0

## Project Setup

Install dependencies:

```sh
npm install
```

## Development

### Start Development Server

Run the application with hot-reload for development:

```sh
npm run dev
```

The development server will start at `http://localhost:5173` (or another port if 5173 is in use).

### Type Checking

Run TypeScript type checking:

```sh
npm run type-check
```

### Code Linting & Formatting

Lint and auto-fix code issues:

```sh
npm run lint
```

Format code with Prettier:

```sh
npm run format
```

## Running Tests

### Unit Tests

Run unit tests with Vitest:

```sh
npm run test:unit
```

### End-to-End Tests

Run E2E tests in development mode (with Cypress UI):

```sh
npm run test:e2e:dev
```

Run E2E tests against production build (headless):

```sh
npm run build
npm run test:e2e
```

## Production

### Build for Production

Type-check, compile, and minify for production:

```sh
npm run build
```

The production-ready files will be generated in the `dist` directory.

### Preview Production Build

Preview the production build locally:

```sh
npm run preview
```
