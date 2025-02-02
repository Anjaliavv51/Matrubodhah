import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

const app = express();
// const PORT = process.env.PORT || 8080

// app.use(cors({ origin: '*', credentials: true }));
// uncomment the cors above when testing it locally and comment the one below. 
// make sure you reverse the changes being made when you about to make a PR
app.use(cors({ origin: '*', credentials: true }));

app.use(express.json({extend: false}));

// app.listen(PORT,()=>{
//     console.log(`server running on port ${PORT}`)
// })
    
//routes importing
import { userRouter } from './routes/user.routes.js';
import { profilerouter } from './routes/profile.routes.js';


app.get('/',async(req,res)=>{
    res.status(200).send("express and mongodb server is running")
})


//routes declare
app.use("/api/v1/auth", userRouter)
app.use("/api/v1/profile",profilerouter)

export {app}

