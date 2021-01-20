import { GraphQLServer } from 'graphql-yoga';

const { v4: uuidv4 } = require('uuid');

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
  createPost(title : String! , body : String! , published : Boolean!, author :ID!) :Post!
  createComment(title :String!, desc : String !, author :ID!, post: ID!) : Comment!
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
    comment : Comment !
  }
  type Comment {
    id :ID!
    title : String!
    desc  :  String!
    postId : String!
    authorId : String!
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
    Mutation: {
        createAuthor(parent, args, ctx, info) {
            const isEmailExist = authorsData.some((author) => author.name === args.name);
            if (isEmailExist) throw new Error('Name Already Exist');
            const author = {
                id: uuidv4(),
                name: args.name,
                org: args.org
            }
            authorsData.push(author);
            return author;
        },
        createPost(parent, args, ctx, info) {
            const isEmailExist = authorsData.some((author) => author.id === args.author);
            if (!isEmailExist) {
                throw new Error('Author Not Found');
            }
            const post = {
                id: uuidv4(),
                title: args.title,
                body: args.body,
                published: args.published,
                author:args.author
            }
            postData.push(post);
            return post;
        },
        createComment(parent, args, ctx, info){
            const isAuthorExist = authorsData.some((author)=>author.id===args.authorId);
            const isPostExist = postData.some((post)=>post.id===args.postId);
            if (!isAuthorExist) throw new Error("Author Does Not Exist");
            if (!isPostExist) throw new Error("Post Does Not Exist");
            const comment = {
                id: uuidv4(),
                title: args.title,
                desc: args.desc,
                post: args.post,
                author:args.author
            }
            postData.push(comment);
            return comment;
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
