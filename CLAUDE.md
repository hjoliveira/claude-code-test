# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Common Commands

### Development
- `npm run dev:server` - Start Express server in development mode (port 3001)
- `npm run dev:client` - Start Vite development server for React frontend (port 3000)
- `npm start` - Start production server from built files

### Testing
- `npm test` - Run all tests with Vitest
- `npm run test:ui` - Run tests with Vitest UI
- `vitest run src/server/todoService.test.ts` - Run specific test file

### Code Quality
- `npm run typecheck` - Run TypeScript type checking without emitting files
- `npm run lint` - Run ESLint on TypeScript files
- `npm run lint:fix` - Auto-fix ESLint issues
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check if code is formatted correctly

### Build
- `npm run build` - Build both server and client for production
- `npm run build:server` - Build only server TypeScript files
- `npm run build:client` - Build only client React app

## Architecture Overview

Full-stack TypeScript application with Express REST API and React frontend:

### Project Structure
- `src/shared/` - Shared TypeScript interfaces used by both client and server
- `src/server/` - Express.js REST API with in-memory todo storage
- `src/client/` - React frontend with Tailwind CSS styling

### API Architecture
- **TodoService**: Core business logic for todo CRUD operations
- **TodoController**: Express route handlers that use TodoService
- **Routes**: Express routes mounted at `/api` endpoint
- All todos stored in memory (no persistence)

### Frontend Architecture  
- **API client** (`src/client/api.ts`): Handles HTTP requests to backend
- **React components**: TodoItem, TodoList, AddTodoForm with full CRUD functionality
- **Vite proxy**: Development server proxies `/api` requests to Express server

### Testing Setup
- **Vitest** for both unit and integration tests
- **Testing Library** for React component tests
- **Supertest** for API endpoint testing
- Test files located next to source files (e.g., `todoService.test.ts`)

### Key Configuration
- TypeScript with strict mode enabled
- ESLint with TypeScript, React, and Prettier integration
- Tailwind CSS for styling
- Vite dev server runs on port 3000, Express on 3001