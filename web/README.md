# The frontend using React, Next.js and Chakra

## To create the template

```bash
npx create-next-app --example with-chakra-ui with-chakra-ui-app
# or
yarn create next-app --example with-chakra-ui with-chakra-ui-app
```

## Shifting to TS

```bash
yarn add --dev typescript @types/node
```

## URQL GraphQL client

```bash
yarn add urql graphql
```

## GraphQL Codegen - for creating graphql hooks

```bash
yarn add -D @graphql-codegen/cli
yarn graphql-codegen init
```

You'll be prompted with options, choose the following

```bash
? What type of application are you building? Application built with React
? Where is your schema?: (path or url) http://localhost:4000/graphql
? Where are your operations and fragments?: src/graphql/**/*.graphql
? Pick plugins: TypeScript (required by other typescript plugins), TypeScript Operations (operations and fragments), TypeScript React Apollo (typed
 components and HOCs)
? Where to write the output: src/generated/graphql.tsx
? Do you want to generate an introspection file? No
? How to name the config file? codegen.yml
? What script in package.json should run the codegen? gen
```

From codegen.yml, remove typescript-react-apollo and do the same in package.json for @graphql-codegen/'apollo and react'.
Then run

```bash
yarn add -D @graphql-codegen/typescript-urql
[For graphql code generator after adding the mutations and queries within the folder]
yarn gen
```
