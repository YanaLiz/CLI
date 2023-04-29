const app = require('./app')
const mongoose = require("mongoose")
// const {DB_HOST} = process.env;
const DB_HOST = "mongodb+srv://Yana:YH3ipxD7pi.WZYq@cluster0.lo7i8zv.mongodb.net/db-contacts?retryWrites=true&w=majority"
mongoose.set("strictQuery", false)

console.log(DB_HOST)

mongoose.connect(DB_HOST)
  .then(() => {
    app.listen(3000)
  })
  .catch(error => {
    console.log(error.message)
    process.exit(1);
  })


