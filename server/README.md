# Package Script

```
"watch": "tsc -w"
```

# Setting up the project

```
npm init -y
yarn add -D @types/node typescript
npx tsconfig.json
```

# Install MikroORM

```
yarn add @mikro-orm/cli @mikro-orm/core @mikro-orm/migrations @mikro-orm/postgresql pg
[Add ts types from yarn] yarn add -D @types/node typescript
```

# Initialize postgres db in Arch

```
[First time]
sudo -iu postgres // Enter postgres root
[postgres]$ initdb -D /var/lib/postgres/data

[To start the db service]
[postgres]$ pg_ctl -D /var/lib/postgres/data -l logfile start
[Or in terminal]$ sudo systemctl start postgres

[To create a user]
[postgres]$ createuser --interactive
```

# Initialize mikroorm from their website

```
[Running migrations]
npx mikro-orm migration:create
```

# Yarn adds

```
yarn add express apollo-server-express graphql type-graphql
yarn add -D @types/express
yarn add reflect-metadata
```

# Store cookies on redis

Expressjs session cookies will be stored on redis

```
yarn add redis connect-redis express-session
[Add types, it's a dev dependency]
yarn add -D @types/express-session @types/redis @types/connect-redis
```

# To avoid a cors error

```
yarn add cors
yarn add -D @types/cors
```
