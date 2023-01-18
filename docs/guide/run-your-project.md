## Ingredients

- Static Types with [TypeScript](https://typescriptlang.org)
- Styling with [Tailwind](https://tailwindcss.com/)
- End-to-end testing with [Playwright](https://playwright.dev/)
- Local third party request mocking with [MSW](https://mswjs.io)
- Unit testing with [Vitest](https://vitest.dev) and [Testing Library](https://testing-library.com)
- Code formatting with [Prettier](https://prettier.io)
- Linting with [ESLint](https://eslint.org)
- [GitHub Actions](https://github.com/features/actions) for deploy on merge to production and development environments

**Requirements:**

- `npm`
- `Node.js` _v.16_

Before you begin setup, make sure you have Node 16 installed on your machine. We like to use [Node Version Manager](https://github.com/nvm-sh/nvm) ("nvm"). If you don't use node 16, the development server will throw an error. If you see an error about your node version, make sure you're using version 16.

### Set up direnv

For managing environment variables, you'll need to set up [direnv](https://direnv.net). Follow their [directions](https://direnv.net/#getting-started) for installation and hooking into whatever shell you're using.

Then, allow access to the variables by running

```bash
direnv allow
```

### Start the dev server

When initializing the stack for the first time, run build to generate the initial Tailwind files:

```
npm run build
```

Then, start your development server!

```sh
npm run dev
```

This starts your app in development mode (by default on `localhost:3000`), rebuilding assets automatically on file changes.

## A tour of important files

### `app/root.tsx`

The default export in this file is the top-level React component for your application. Any matching routes will land in the `<Outlet/>`, so you can add a header and footer above and below that if you want them on every page.

If there's any data you'll need to fetch on every page, you can put it in the loader function in this file.

### `routes`

The routes directory has a file for each route in your app. Try adding `routes/veggies.tsx` and export a component listing some of your favorite veggies:

```tsx
export default function Veggies() {
  return (
    <div className="mx-auto">
      <h1 className="font-bold">My favorite Veggies</h1>
      <ul>
        <li>Broccoli</li>
        <li>Brussels Sprouts</li>
        <li>Carrot</li>
      </ul>
    </div>
  );
}
```

Visit http://localhost:3000/veggies to see your glorious handiwork.

### Make accounts with third-party services

[![Accounts to setup](./images/accounts-to-setup.png)](https://dept-dash-demo-videos.s3.amazonaws.com/Account+Setup.mp4)
