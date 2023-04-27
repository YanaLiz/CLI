const app = require('./app')
const mongoose = require("mongoose")
// YH3ipxD7pi.WZYq



// app.listen(3000, () => {
//   console.log("Server running. Use our API on port: 3000")
// })



mongoose.set("strictQuery", true)

const DB_HOST = "mongodb+srv://Yana:YH3ipxD7pi.WZYq@cluster0.lo7i8zv.mongodb.net/db-contacts?retryWrites=true&w=majority"

mongoose.connect(DB_HOST)
  .then(() => {
    app.listen(3000)
  })
  .catch(error => {
    console.log(error.message)
    process.exit(1);
  })
