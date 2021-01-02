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
```