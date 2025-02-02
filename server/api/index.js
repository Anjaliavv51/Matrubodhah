import { app } from "../app.js";
import { connectDB } from "../db.js";

const port = process.env.PORT || 3000

try {
  connectDB()
  .then(()=>{
    console.log("mongodb initialized")
    app.listen(port,()=>`server running at ${port}`)
  })
} catch (error) {
  console.error("cannot connect to db, check app.js trycach block")
}