import { __prod__ } from "./constants";
import { Post } from "./entities/Post";
import { MikroORM } from "@mikro-orm/core";
import path from "path";

export default {
    migrations: {
        path: path.join(__dirname, './migrations'), 
        pattern: /^[\w-]+\d+\.[tj]s$/,
    },
    entities: [Post],
    dbName: "machinecapitol",
    type: "postgresql",
    debug: !__prod__,
} as Parameters<typeof MikroORM.init>[0];
// If we don't give "export default {|} as --something--", it'll be casted to string by default giving problem in the import at index
// We can give "as const" and it casts the types of type to postgresql and etc but that won't help with auto completion
// Hence a better method is to take in whatever the init function accepts in index.js
// So a smarter way is Parameters<typeof MikroORM.init>[0] ie. take in the type of MikroORM.init and instantiate Parameters
// Parameters returns an array and hence pass the very first object