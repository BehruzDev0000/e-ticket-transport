import express from 'express'
import config from './config/main.js'
import {createSuperAdmin} from './db/create-superadmin.js'
import { connectDB } from './db/main.js'
import adminRouter from './routes/admin.route.js'
import transportRouter from './routes/transport.route.js'
import ticketRouter from './routes/ticket.route.js'
import customerRouter from './routes/customer.route.js'
import passportRouter from './routes/passport.route.js'
import cookieParser from 'cookie-parser'

const app=express()
await connectDB()
await createSuperAdmin()
app.use(express.json())
app.use(cookieParser())
app.use('/admin',adminRouter)
app.use('/transport',transportRouter)
app.use('/ticket',ticketRouter)
app.use('/customer',customerRouter)
app.use('/passport',passportRouter)
app.use((err,req,res,_)=>{
    if(err){
        const statusCode = err.status?err.status:500
        const message = err.message?err.message:'Internal server error'
        return res.status(statusCode).json({
            statusCode,
            message
        })
    }
})

app.listen(config.PORT,()=>console.log(`Server running on ${config.PORT} port`))