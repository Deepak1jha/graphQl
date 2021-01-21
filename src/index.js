import { GraphQLServer } from "graphql-yoga";
import db from "./db";
import Query from "./resolvers/Query";
import Post from "./resolvers/Post";
import Author from "./resolvers/Author";
import Mutation from "./resolvers/Mutation";

const server = new GraphQLServer({
    typeDefs: "./src/schema/Schema.graphql",
    resolvers: {
        Query,
        Mutation,
        Post,
        Author,
    },
    context: {
        db,
    },
});

server
    .start(() => {
        console.log("The Server IS Up");
    })
    .then((r) => console.log("The Server IS Up"));
