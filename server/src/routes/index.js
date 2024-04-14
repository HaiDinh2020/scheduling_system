import authRouter from "./auth";
import userRouter from './user';

const initRoutes = (app) => {
    app.use('/api/v1/user', userRouter)
    app.use('/api/v1/auth', authRouter)

    return app.use('/', (req, res) => { 
        res.send("server on...")
    })
}

export default initRoutes;