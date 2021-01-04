import 'reflect-metadata';
import { MikroORM } from "@mikro-orm/core";
import express from "express";
import { __prod__ } from "./constants";
// import { Post } from "./entities/Post";
import microConfig from "./mikro-orm.config";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { HelloResolver } from "./resolvers/helo";
import { PostResolver } from "./resolvers/post";
// import { User } from './entities/User';
import { UserResolver } from './resolvers/user';

const main = async() => {
    const orm = await MikroORM.init(microConfig);
    await orm.getMigrator().up();
    const app = express();

    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [HelloResolver, PostResolver, UserResolver],
            validate: false
        }),
        context: () => ({ em: orm.em})
    });

    apolloServer.applyMiddleware({ app });

    app.get('/', (_, res) => {
        res.send('Hey');
    })
    app.listen(4000, () => {
        console.log('Server started on localhost:4000')
    })
}

main().catch((err) => {
    console.error(err);
});