import { GraphQLServer } from 'graphql-yoga';

const authorsData =[{
    id:"1",
    name :"Author 1",
    org:"Org 1"
},{
    id:"2",
    name :"Author 2",
    org:"Org 2"
},{
    id:"3",
    name :"Author 3",
    org:"Org 3"
}]

const typeDefs = `
  type Query {
    author : Author!
    post : Post!
    authors :[Author!]!
  }
  
  type Author {
    id :ID!
    name : String!
    org : String!
  }
  type Post {
    id :ID!
    title : String!
    body : String!
    published: Boolean!
  }
`

const resolvers = {
    Query: {
        author(){
            return {
                id: "6146868",
                name :"Author Name",
                org:"Bonami"
            }
        },
        post(){
            return {
                id:"5261",
                title :"Title  1",
                body :"Body 1",
                published:true
            }
        },
        authors(parent, args, ctx, info){
            return authorsData;
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
