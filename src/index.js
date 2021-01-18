import { GraphQLServer } from 'graphql-yoga';

const typeDefs = `
  type Query {
    hello: String!
  }
`

const resolvers = {
    Query: {
        hello() {
            return 'Hello world'
        }
    }
}

const server = new GraphQLServer({
    typeDefs,
    resolvers
});

server.start(() => {
    console.log('The Server IS Up')
}).then(r => console.log('The Server IS Up'))
