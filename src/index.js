import { GraphQLServer } from 'graphql-yoga';

const typeDefs = `
  type Query {
  greeting(username : String) : String!
  addition(x: Int, y:Int) :Int!
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
        },
        greeting(parent, args, ctx, info) {
            if (args.username) {
                return `Hello ${args.username}`
            } else {
                return "Good Afternoon"
            }
        },
        addition(parent, args, ctx, info) {
            return args.x + args.y;
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
