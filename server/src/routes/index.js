import authRouter from "./auth";
import userRouter from './user';
import garageRouter from './garage'

const initRoutes = (app) => {
    app.use('/api/v1/user', userRouter)
    app.use('/api/v1/auth', authRouter)
    app.use('/api/v1/garage', garageRouter)

    return app.use('/', (req, res) => { 
        res.send("server on...")
    })
}

export default initRoutes;