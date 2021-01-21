import { GraphQLServer } from "graphql-yoga";
const { v4: uuidv4 } = require("uuid");
import db from "./db";

const resolvers = {
  Query: {
    author() {
      return {
        id: "6146868",
        name: "Author Name",
        org: "Bonami",
      };
    },
    post(parent, args, {db}, info) {
      return db.postData;
    },
    authors(parent, args, {db}, info) {
      return db.authorsData;
    },
  },
  Mutation: {
    createAuthor(parent, args, {db}, info) {
      const isEmailExist = db.authorsData.some(
        (author) => author.name === args.data.name
      );
      if (isEmailExist) throw new Error("Name Already Exist");
      const author = {
        id: uuidv4(),
        ...args.data,
      };
      db.authorsData.push(author);
      return author;
    },
    createPost(parent, args, {db}, info) {
      const isEmailExist = db.authorsData.some(
        (author) => author.id === args.data.author
      );
      if (!isEmailExist) {
        throw new Error("Author Not Found");
      }
      const post = {
        id: uuidv4(),
        ...args.data,
      };
      postData.push(post);
      return post;
    },
    createComment(parent, args, {db}, info) {
      const isAuthorExist = db.authorsData.some(
        (author) => author.id === args.data.author
      );
      const isPostExist = postData.some((post) => post.id === args.data.post);
      if (!isAuthorExist) throw new Error("Author Does Not Exist");
      if (!isPostExist) throw new Error("Post Does Not Exist");
      const comment = {
        id: uuidv4(),
        ...args.data,
      };
      postData.push(comment);
      return comment;
    },
    deleteAuthor(parent, args, {db}, info) {
      const author = db.authorsData.findIndex((user) => {
        return author.id === args.id;
      });
      if (author === -1) {
        throw new Error("User Not Found");
      }
      const deletedUsers = db.authorsData.splice(author, 1);
      return deletedUsers[0];
    },
  },
  Post: {
    author(parent, args, {db}, info) {
      return db.authorsData.find((user) => {
        return user.id === parent.author;
      });
    },
  },
  Author: {
    post(parent, args, {db}, info) {
      return db.postData.filter((post) => {
        return (post.id = parent.author);
      });
    },
  },
};

const server = new GraphQLServer({
  typeDefs: "./src/schema/Schema.graphql",
  resolvers,
  context: {
    db,
  },
});

server
  .start(() => {
    console.log("The Server IS Up");
  })
  .then((r) => console.log("The Server IS Up"));
