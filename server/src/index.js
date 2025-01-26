import { DBconnect } from "./db/index.js";
import { app } from "./app.js";
import dotenv from 'dotenv'
dotenv.config({
    path: './.env'
})

DBconnect()
    .then(() => {
        app.listen(process.env.PORT || 8000, () => {
            console.log("SERVER IS RUNNing on port ", process.env.PORT || 8000)
        })
    }).catch((error) => {
        console.log("mongodb connection is failed")
    }) 
