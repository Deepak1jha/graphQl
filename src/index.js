import { GraphQLServer } from 'graphql-yoga';

const authorsData = [{
    id: "1",
    name: "Author 1",
    org: "Org 1",
    post: "1"
}, {
    id: "2",
    name: "Author 2",
    org: "Org 2",
    post: "2"
}, {
    id: "3",
    name: "Author 3",
    org: "Org 3",
    post: "1"
}]

const postData = [{
    id: "1",
    title: "title 1",
    body: "Post Body 1",
    published: true,
    author: "1"
}, {
    id: "2",
    title: "title 2",
    body: "Post Body 2",
    published: true,
    author: "2"
}, {
    id: "3",
    title: "title 3",
    body: "Post Body 3",
    published: false,
    author: "1"
}]

const typeDefs = `
  type Query {
    author : Author!
    post : [Post!]!
    authors :[Author!]!
  }
  type Mutation {
  createAuthor(name : String!,org : String!) : Author!
  }
  type Author {
    id : ID!
    name : String!
    org : String!
    post: Post
  }
  type Post {
    id :ID!
    title : String!
    body : String!
    published: Boolean!
    author : Author!
  }
`

const resolvers = {
    Query: {
        author() {
            return {
                id: "6146868",
                name: "Author Name",
                org: "Bonami"
            }
        },
        post(parent, args, ctx, info) {
            return postData;
        },
        authors(parent, args, ctx, info) {
            return authorsData;
        }
    },
    Mutation : {
        createAuthor(parent, args, ctx, info){
            console.log('args');
            console.log(args);
            console.log('args');
        }
    },
    Post: {
        author(parent, args, ctx, info) {
            return authorsData.find((user) => {
                return user.id === parent.author;
            })
        }
    },
    Author: {
        post(parent, args, ctx, info) {
            return postData.filter((post) => {
                return post.id = parent.author;
            })
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
