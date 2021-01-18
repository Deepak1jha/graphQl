import { GraphQLServer } from 'graphql-yoga';

const typeDefs = `
  type Query {
    id : ID!
    name : String!
    age : Int!
    employed : Boolean!
    gpa : Float
    
    
  }
`

const resolvers = {
    Query: {
        id() {
            return '65';
        },
        name() {
            return 'Deepak';
        },
        age() {
            return 24;
        },
        employed() {
            return true;
        },
        gpa() {
            return null
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
