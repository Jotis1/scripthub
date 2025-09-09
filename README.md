# ScriptHub

A modern web application for serving PowerShell scripts from GitLab repositories as HTTP endpoints. Built with Next.js 15, TypeScript, and Prisma.

## Features

✨ **Repository Management**
- Connect GitLab repositories with OAuth authentication
- Browse repository branches and select specific branches to track
- Support for multiple repositories and branches

🚀 **Script Serving**
- Automatically discover PowerShell (.ps1) files in repositories
- Create custom HTTP endpoints for each script
- Serve scripts as plain text via `/api/scripts/[...path]` routes
- Real-time script content fetched from GitLab

🎛️ **Endpoint Management**
- Interactive script selection with multi-file support
- Custom endpoint path configuration (protected `/api/scripts/` prefix)
- Activate/deactivate endpoints without deletion
- Copy script URLs to clipboard
- Delete endpoints with confirmation

🔐 **Authentication & Security**
- GitLab OAuth integration via Better Auth
- Session management with PostgreSQL storage
- Path validation to prevent endpoint conflicts

## Tech Stack

- **Framework:** Next.js 15 with App Router and Turbopack
- **Language:** TypeScript with strict mode
- **Database:** PostgreSQL with Prisma ORM
- **Authentication:** Better Auth with GitLab OAuth
- **UI:** Tailwind CSS with Radix UI components
- **Forms:** React Hook Form with Zod validation
- **Code Quality:** Biome (linting and formatting)

## Getting Started

### Prerequisites

- Node.js 18+ and pnpm
- PostgreSQL database
- GitLab application for OAuth (Client ID and Secret)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd scripthub
```

2. Install dependencies:
```bash
pnpm install
```

3. Set up environment variables:
```bash
cp .env.example .env
# Configure your database URL, GitLab OAuth credentials, etc.
```

4. Set up the database:
```bash
pnpm prisma migrate dev
pnpm prisma generate
```

5. Start the development server:
```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## Usage

### 1. Connect a Repository
1. Sign in with your GitLab account
2. Click "Add Repository" 
3. Select Group → Project → Branch
4. Repository is now tracked in ScriptHub

### 2. Create Script Endpoints
1. Navigate to a repository page
2. Click "Add Script Endpoint"
3. Select PowerShell files from the repository
4. Configure custom endpoint paths
5. Scripts are immediately available via HTTP

### 3. Access Your Scripts
Scripts are served at: `https://your-domain.com/api/scripts/your-custom-path`

Example:
- File: `scripts/deploy.ps1`  
- Endpoint: `/api/scripts/deploy`
- URL: `https://scripthub.com/api/scripts/deploy`

## Development Commands

```bash
pnpm dev          # Start development server
pnpm build        # Build for production  
pnpm start        # Start production server
pnpm lint         # Run Biome linter
pnpm format       # Format code with Biome
pnpm prisma generate  # Generate Prisma client
pnpm prisma studio    # Open database browser
```

## Project Structure

```
src/
├── actions/          # Server actions for data mutations
├── app/             # Next.js App Router pages and API routes
├── components/      # React components
│   ├── forms/       # Form components  
│   ├── shared/      # Business logic components
│   └── ui/          # Reusable UI components
├── lib/             # Utility libraries and configurations
├── types/           # TypeScript type definitions  
└── utils/           # Utility functions
```

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and commit message conventions.

## License

This project is licensed under the MIT License.
