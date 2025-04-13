# Vite + Deno + React + TypeScript + Rolldown

## Experimentation

These interfacs makes use of [early rolldown integration](https://main.vite.dev/guide/rolldown.html)

## Running

You need to have Deno v2.0.0 or later installed to run this repo.

Start a dev server:

```
$ deno task dev
```

## Deploy

Build production assets:

```
$ deno task build
```

## Testing

[React unit testing using Vitest, RTL and MSW](https://dev.to/medaymentn/react-unit-testing-using-vitest-rtl-and-msw-216j) article provides some details about stack setup.
[Configuring Vite with TypeScript, Vitest, and React Testing Library](https://johnsmilga.com/articles/2024/10/15) article focus on a simpler scope, excluding msw from the setup.
[Configure Vitest with React Testing Library](https://dev.to/pacheco/configure-vitest-with-react-testing-library-5cbb) descibe a step by step example which is based on yarn.
