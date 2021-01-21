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

const db = {
    authorsData,
    postData
}
export {db as default};