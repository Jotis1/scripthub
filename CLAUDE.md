# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development
- `pnpm dev` - Start development server with Turbopack
- `pnpm build` - Build for production with Turbopack
- `pnpm start` - Start production server

### Code Quality
- `pnpm lint` - Run Biome linter/formatter checks
- `pnpm format` - Format code with Biome (writes changes)

### Database
- `npx prisma generate` - Generate Prisma client (outputs to src/lib/prisma)
- `npx prisma db push` - Push schema changes to database
- `npx prisma migrate dev` - Create and apply new migration
- `npx prisma studio` - Open Prisma Studio database browser

## Architecture

### Core Stack
- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript with strict mode
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: Better Auth with GitLab OAuth
- **UI**: Tailwind CSS with Radix UI components
- **Forms**: React Hook Form with Zod validation
- **Build Tool**: Turbopack
- **Code Quality**: Biome (replaces ESLint + Prettier)

### Project Structure
```
src/
├── actions/          # Server actions for data mutations
├── app/             # Next.js App Router pages and API routes
├── components/      # React components
│   ├── forms/       # Form components
│   ├── icons/       # Icon components
│   ├── layout/      # Layout components (navbar, etc.)
│   ├── shared/      # Shared business components
│   └── ui/          # Reusable UI components (shadcn/ui style)
├── hooks/           # Custom React hooks
├── lib/             # Utility libraries and configurations
│   ├── auth/        # Better Auth configuration
│   └── prisma/      # Generated Prisma client (auto-generated)
├── types/           # TypeScript type definitions
└── utils/           # Utility functions
```

### Key Architectural Patterns
- **Authentication**: Better Auth with Prisma adapter for session management
- **Database**: Prisma with PostgreSQL, client generated to `src/lib/prisma/`
- **State Management**: Server state via server actions, client state via React hooks
- **Styling**: Tailwind with `@/utils/cn` utility for conditional classes
- **Type Safety**: Zod schemas for validation, TypeScript strict mode
- **Repository Management**: Supports GitLab repositories with detailed metadata storage

### Database Schema
- **User/Session/Account**: Better Auth standard tables
- **Repository**: Stores GitLab repository metadata including group/project info, branch details, and web URLs

## Code Style

### Biome Configuration
- **Formatter**: Tabs (width: 4), tab indentation
- **Linter**: Recommended rules for React/Next.js
- **Import Organization**: Auto-organize imports enabled
- **File Ignores**: node_modules, .next, dist, build, prisma

### Path Aliases
- `@/*` maps to `src/*`

### Commit Conventions
Follow conventional commits with English descriptions:
- `feat(scope): description` - New features
- `fix(scope): description` - Bug fixes  
- `docs(scope): description` - Documentation only
- `style(scope): description` - Code formatting
- `refactor(scope): description` - Code refactoring
- `test(scope): description` - Tests
- `perf(scope): description` - Performance improvements
- `chore(scope): description` - Minor tasks
- `build(scope): description` - Build system changes
- `ci(scope): description` - CI configuration

Use imperative mood, max 50 characters for title, no trailing period.