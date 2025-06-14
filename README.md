# ttg-client-web

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md)

## Prerequisites

- [nvm](https://github.com/nvm-sh/nvm) or [fnm](https://github.com/Schniz/fnm)
- [Node.js v20.x 'Iron' (LTS)](https://nodejs.org/en)
- [Git](https://git-scm.com/)
- [Visual Studio Code](https://code.visualstudio.com/)

## Setup

You will need to provide the following environment variables:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `NEXT_PUBLIC_API_URL`: Your [ttg-server](https://github.com/tabletop-generator/ttg-server/) deployment URL

1. Clone the project to your workspace.

   ```bash
   git clone <url> ttg-client-web
   cd ttg-client-web
   ```

2. Create a .env file with development presets. Then enter your own environment variables from the links above.

   ```bash
   cp .env.example .env
   ```

3. Install and use the project's supported Node.js version.

   With nvm:

   ```bash
   nvm install
   ```

   With fnm:

   ```bash
   fnm install
   ```

4. Install dependencies.

   ```bash
   npm install
   ```

5. Build the website.

   ```bash
   npm run build
   ```

6. Serve the website on `localhost:3000`.

   ```bash
   npm run start
   ```

## Solution Stack

- **Language:** [TypeScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- **Framework:** [Next.js](https://nextjs.org/docs)
- **Styling:** [TailwindCSS](https://tailwindcss.com/docs/)
- **Authentication:** [Supabase Auth](https://supabase.com/docs/guides/auth)
- **Runtime:** [Node.js](https://nodejs.org/docs/latest-v20.x/api/)
- **Package Manager:** [npm](https://docs.npmjs.com/)
- **Version Control System:**
  - [Git](https://git-scm.com/doc)
  - [GitHub](https://docs.github.com/)
- **CI/CD:** [GitHub Actions](https://docs.github.com/en/actions)
- **Linting:** [ESLint](https://eslint.org/docs/v8.x/)
- **Formatting:** [Prettier](https://prettier.io/docs/en/)
- **Git Hooks:**
  - [Husky](https://typicode.github.io/husky/)
  - [lint-staged](https://github.com/lint-staged/lint-staged)
