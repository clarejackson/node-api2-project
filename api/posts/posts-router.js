// implement your posts router here
const express = require("express")
const posts = require("./posts-model")

const router = express.Router()

router.get("/", (req, res) => {
  res.json({ message: "Hello, World" })
})

// 1 [GET] /api/posts
// If there's an error in retrieving the posts from the database:
// respond with HTTP status code 500.
// return the following JSON: { message: "The posts information could not be retrieved" }.
router.get("/api/posts", (req, res) => {
  // console.log(req.query)

  posts.find()
  .then((posts) => {
    res.status(200).json(posts)
  })
  .catch((error) => {
    console.log(error)
    res.status(500).json({
      message: "The posts information could not be retrieved"
    })
  })
})

// 2 [GET] /api/posts/:id
// If the post with the specified id is not found:

// return HTTP status code 404 (Not Found).
// return the following JSON: { message: "The post with the specified ID does not exist" }.
// If there's an error in retrieving the post from the database:

// respond with HTTP status code 500.
// return the following JSON: { message: "The post information could not be retrieved" }.
router.get("/api/posts/:id", (req, res) => {
  posts.findById(req.params.id)
  .then((post) => {
    if (post) {
      res.status(200).json(post)
    } else {
      res.status(404).json({
        message: "The post with the specified ID does not exist"
      })
      .catch((error) => {
        console.log(error)
        res.status(500).json({
          message: "The post information could not be retrieved"
        })
      })
    }
  })
})


// 3 [POST] /api/posts
// If the request body is missing the title or contents property:

// respond with HTTP status code 400 (Bad Request).
// return the following JSON: { message: "Please provide title and contents for the post" }.
// If the information about the post is valid:

// save the new post the the database.
// return HTTP status code 201 (Created).
// return the newly created post.
// If there's an error while saving the post:

// respond with HTTP status code 500 (Server Error).
// return the following JSON: { message: "There was an error while saving the post to the database" }.
router.post("/api/posts", (req, res) => {
  if (!req.body.title || !req.body.contents){
    return res.status(400).json({
      message: "Please provide title and contents for the post"
    })
  }
  posts.insert(req.body)
  .then((post) => {
    res.status(201).json(post)
  })
  .catch((error) => {
    console.log(error)
    res.status(500).json({
      message: "There was an error while saving the post to the database"
    })
  })
})


// 4 [PUT] /api/posts/:id
// If the post with the specified id is not found:

// return HTTP status code 404 (Not Found).
// return the following JSON: { message: "The post with the specified ID does not exist" }.
// If the request body is missing the title or contents property:

// respond with HTTP status code 400 (Bad Request).
// return the following JSON: { message: "Please provide title and contents for the post" }.
// If there's an error when updating the post:

// respond with HTTP status code 500.
// return the following JSON: { message: "The post information could not be modified" }.
// If the post is found and the new information is valid:

// update the post document in the database using the new information sent in the request body.
// return HTTP status code 200 (OK).
// return the newly updated post.




// 5 [DELETE] /api/posts/:id
// If the post with the specified id is not found:

// return HTTP status code 404 (Not Found).
// return the following JSON: { message: "The post with the specified ID does not exist" }.
// If there's an error in removing the post from the database:

// respond with HTTP status code 500.
// return the following JSON: { message: "The post could not be removed" }.



// 6 [GET] /api/posts/:id/comments
// If the post with the specified id is not found:

// return HTTP status code 404 (Not Found).
// return the following JSON: { message: "The post with the specified ID does not exist" }.
// If there's an error in retrieving the comments from the database:

// respond with HTTP status code 500.
// return the following JSON: { message: "The comments information could not be retrieved" }.



module.exports = router