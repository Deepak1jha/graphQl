const Post = {
    author(parent, args, { db }, info) {
        return db.authorsData.find((user) => {
            return user.id === parent.author;
        });
    },
}
export default Post;
