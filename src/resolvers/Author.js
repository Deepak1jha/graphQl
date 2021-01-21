const Author = {
    post(parent, args, { db }, info) {
        return db.postData.filter((post) => {
            return (post.id = parent.author);
        });
    },
}
export default Author;
