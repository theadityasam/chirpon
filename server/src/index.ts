import 'reflect-metadata';
import { MikroORM } from "@mikro-orm/core";
import express from "express";
import { __prod__ } from "./constants";
import microConfig from "./mikro-orm.config";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { HelloResolver } from "./resolvers/helo";
import { PostResolver } from "./resolvers/post";
import { UserResolver } from './resolvers/user';
import redis from 'redis';
import session from 'express-session';
import connectRedis from 'connect-redis'
import cors from 'cors';
declare module "express-session" {
    interface Session {
      userId: number;
    }
}

const main = async() => {
    const orm = await MikroORM.init(microConfig);
    await orm.getMigrator().up();
    const app = express();

    //The order matters, this goes between the app
    const RedisStore = connectRedis(session)
    const redisClient = redis.createClient()
    app.use(cors({
        origin: 'http://localhost:3000',
        credentials: true,
    }));
    app.use(
    session({
        name : 'qid',
        store: new RedisStore({ 
            client: redisClient,
            disableTouch: true
         }),
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 365 * 10, //10 years
            httpOnly: true,
            sameSite: "lax", // csrf
            secure: false, // cookie works onli in https
        },
        saveUninitialized: false,
        secret: "whjefhwoqfgboqwefg",
        resave: false,
    })
    )
    // And the middleware
    // The order that we apply express middleware is the order that they run. Session middleware would be used inside 
    // apollo middleware and should run first


    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [HelloResolver, PostResolver, UserResolver],
            validate: false
        }),
        context: ({req, res}) => ({ em: orm.em, req, res}),
    });

    apolloServer.applyMiddleware({ app, cors: false});

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