This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Linting and Formatting

This project uses ESLint and Prettier for code quality and formatting.

### Available Scripts

- `npm run lint`: Run ESLint to check for issues
- `npm run lint:fix`: Run ESLint with automatic fixing
- `npm run format`: Format all files with Prettier
- `npm run check-format`: Check if files are formatted correctly
- `npm run check-types`: Check TypeScript types
- `npm run validate`: Run all checks (lint, format, types)

### VS Code Setup

For the best development experience in VS Code, install these extensions:

- ESLint
- Prettier

The project includes VS Code settings that automatically format code on save and run ESLint fixes.

### Pre-commit Hooks

The project uses Husky and lint-staged to automatically lint and format code before each commit.

### Key Features of the Setup

1. **Import Ordering**: Imports are automatically organized and grouped
2. **Prop Sorting**: JSX props are sorted alphabetically for better readability
3. **Unused Code Detection**: Warns about unused imports and variables
4. **Type Checking**: Enforces TypeScript best practices
5. **Consistent Formatting**: Ensures consistent code style across the project
