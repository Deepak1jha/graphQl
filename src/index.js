import { GraphQLServer } from 'graphql-yoga';

const typeDefs = `
  type Query {
   myPost : Post!
  }
  type Post {
    id :ID!
    title : String!
    body : String!
    published: Int
  }
`

const resolvers = {
    Query: {
        myPost() {
            return {
                id: '6544446',
                title: 'Post Title',
                body: ' Body ',
                published: 458
            }
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
