const Query={
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
}
export default Query;
