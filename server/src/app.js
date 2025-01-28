import express from "express"
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from "cookie-parser"

dotenv.config({
    path:'./.env'
})

const app = express()

app.use(cors({
    origin : process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit : '20kb'}))
app.use(express.urlencoded({ extended: true , limit : '20kb' }))
app.use(cookieParser())



// here coming routes 
import UserRouter from './routes/user.route.js'
import RecipationRouter from './routes/recipation.route.js'
import DepartmentRouter from './routes/department.route.js'


app.use("/api/v1/user" , UserRouter )
app.use("/api/v1/recipation" , RecipationRouter )
app.use("/api/v1/department" , DepartmentRouter )



export { app }