# Contributing to Chess Variant Simulator

Thank you for your interest in contributing to the Chess Variant Simulator! This document provides guidelines and information to help you contribute effectively.

## Getting Started

1. **Clone the repository** to your local machine: `git clone https://github.com/Phoenix-Programming/Chess-Variant-Simulator.git`
2. **Install dependencies**: `npm install`
3. **Create a feature branch**: `git checkout -b FName_LInitial_Issue#_Feature-Name`
4. **Make your changes** following our code standards
5. **Test your changes**: Run unit and E2E tests
6. **Commit your changes**: Use clear, descriptive commit messages
7. **Open a pull request** against the `main` branch and describe your changes
8. **Request review** from other contributors and address any feedback

## Recommended VS Code Extensions

[Recommended VS Code Extensions](./.vscode/extensions.json) - A curated list of extensions to enhance your development experience

## Recommended VS Code Settings

Recommended VS Code Settings (add to your `.vscode/settings.json`):

``` json
{
  "explorer.fileNesting.enabled": true,
  "explorer.fileNesting.patterns": {
    "tsconfig.json": "tsconfig.*.json, env.d.ts, typed-router.d.ts",
    "vite.config.*": "jsconfig*, vitest.config.*, cypress.config.*, playwright.config.*",
    "package.json": "package-lock.json, pnpm*, .yarnrc*, yarn*, .eslint*, eslint*, .oxlint*, oxlint*, .oxfmt*, .prettier*, prettier*, .editorconfig"
  },
  "editor.codeActionsOnSave": {
    "source.fixAll": "explicit"
  },
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode"
}
```

## Development Workflow

### Running the Development Server

```sh
npm run dev
```

### Code Quality Checks

Before submitting a pull request, ensure your code passes all quality checks:

```sh
# Type checking
npm run type-check

# Linting and auto-fix
npm run lint

# Code formatting
npm run format

# Unit tests
npm run test:unit

# E2E tests (development mode)
npm run test:e2e:dev
```

## Code Standards

- **TypeScript**: All code must be written in TypeScript with proper type annotations
- **Vue 3**: Use Composition API and `<script setup>` syntax
- **Linting**: Code must pass ESLint and Oxlint checks
- **Formatting**: Code must be formatted with Prettier
- **Testing**: New features should include unit tests and, where applicable, E2E tests

## Project Structure

Below is an ASCII representation with descriptions of the important files and directories in this repository:

``` txt
Chess-Variant-Simulator/
│
├── .github/                          # GitHub-specific files and configurations
│   ├── workflows/                    # GitHub Actions CI/CD workflows
│   │   └── ci.yml                    # Continuous Integration workflow
│   └── CODEOWNERS                    # Code owners for pull request reviews
│
├── .vscode/                          # VS Code workspace settings and extensions
│   ├── extensions.json               # Recommended VS Code extensions
│   └── settings.json                 # VS Code settings
│
├── cypress/                          # End-to-end testing with Cypress
│   ├── e2e/                          # E2E test specifications
│   │   └── example.cy.ts             # Example E2E test
│   ├── fixtures/                     # Test fixtures and mock data
│   ├── support/                      # Cypress support files and custom commands
│   │   ├── commands.ts               # Custom Cypress commands
│   │   └── e2e.ts                    # E2E test configuration and setup
│   └── tsconfig.json                 # TypeScript config for Cypress
│
├── dist/                             # Production build output (generated)
├── node_modules/                     # npm dependencies (generated)
├── public/                           # Static files served as-is (favicon, etc.)
│
├── src/                              # Main source code directory
│   ├── assets/                       # Static assets (CSS, images, etc.)
│   │   └── styles/                   # Stylesheets
│   │       ├── base.css              # Base CSS styles and CSS variables
│   │       └── main.css              # Main application styles
│   │
│   ├── components/                   # Reusable Vue components
│   │   ├── __tests__/                # Component unit tests
│   │   └── icons/                    # SVG icon components
│   │
│   ├── router/                       # Vue Router configuration
│   │   └── index.ts                  # Route definitions and router setup
│   │
│   ├── stores/                       # Pinia state management stores
│   ├── views/                        # Page-level components (routed views)
│   │
│   ├── App.vue                       # Root Vue component
│   └── main.ts                       # Application entry point, Vue app initialization
│
├── .gitattributes                    # Git attributes for handling file types
├── .gitignore                        # Git ignore rules for untracked files
├── CONTRIBUTING.md                   # This file - contribution guidelines
├── LICENSE                           # Project license information
├── README.md                         # Project documentation and setup guide
├── index.html                        # HTML entry point for the SPA
│
├── package.json                      # Project metadata, dependencies, and scripts
├── .editorconfig                     # Editor configuration for consistent coding styles
├── .eslintcache                      # ESLint cache files (generated)
├── .oxlintrc.json                    # Oxlint configuration file
├── .prettierrc.json                  # Prettier configuration file
├── eslint.config.ts                  # ESLint linting configuration
├── package-lock.json                 # Locked dependency versions
│
├── tsconfig.json                     # Base TypeScript configuration
├── env.d.ts                          # TypeScript environment declarations
├── tsconfig.app.json                 # TypeScript config for application code
├── tsconfig.node.json                # TypeScript config for Node.js scripts
├── tsconfig.vitest.json              # TypeScript config for Vitest tests
│
├── vite.config.ts                    # Vite build tool configuration
├── cypress.config.ts                 # Cypress E2E testing configuration
└── vitest.config.ts                  # Vitest unit testing configuration
```

## File Organization Guidelines

### Components (`src/components/`)

- **Reusable components** that can be used across multiple views
- Each component should have a clear, single responsibility
- Include unit tests in `__tests__/` subdirectory
- Icon components go in the `icons/` subdirectory

### Views (`src/views/`)

- **Page-level components** that represent entire routes/pages
- Typically compose multiple smaller components
- Should be referenced in the router configuration

### Stores (`src/stores/`)

- **Pinia stores** for global state management
- Use the Composition API style with `defineStore`
- Keep stores focused and modular

### Router (`src/router/`)

- Define all application routes
- Configure navigation guards if needed
- Use lazy loading for route components when appropriate

## Testing Guidelines

### Unit Tests

- Located in `src/components/__tests__/`
- Test component behavior, not implementation details
- Use Vue Test Utils for component testing
- Run with: `npm run test:unit`

### End-to-End Tests

- Located in `cypress/e2e/`
- Test complete user workflows
- Use Cypress best practices and custom commands
- Run with: `npm run test:e2e:dev` (interactive) or `npm run test:e2e` (headless)

## Pull Request Process

1. **Follow the code style** enforced by ESLint and Prettier
2. **Ensure all tests pass** and add new tests for new functionality
3. **Update documentation** if you're adding or changing features
4. **Update the README** if you're changing setup or usage
5. **Write clear commit messages** describing what and why
6. **Request review** from maintainers and address feedback promptly
