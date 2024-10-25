const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const app = express()
const port = 3000

// Serving static files (HTML ,CSS)
app.use(express.static("public"))

// the below is very important as it will store the data and will make it visible or accessible in MongoDB Interface
app.use(express.urlencoded({ extended:true}))

// Connect to mongoDb server...form is the name of the database
mongoose.connect("mongodb://0.0.0.0:27017/form")
const db = mongoose.connection
db.once("open", () =>{
    console.log("Connected to MongoDB")
})

// Defining a Schema
const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: Number,
    dob: String,
    country: String
})
// here data is the collection name
const Users = mongoose.model("data", userSchema)

// Sending get request at '/' endpoint to display the form through localhost:3000
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/form.html'))
})

// Sending a post request
app.post('/post', async(req, res) => {
    const { username, email, password, dob, country } = req.body
    const user = new Users({
        username,
        email,
        password,
        dob,
        country
    })
    await user.save()
    console.log(user)
    res.send("Form Submitted Successfully!")
})

// Starting the server
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})