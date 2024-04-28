import authRouter from "./auth";
import userRouter from './user';
import garageRouter from './garage';
import bookingRouter from './booking';
import carRouter from './car';

const initRoutes = (app) => {
    app.use('/api/v1/user', userRouter)
    app.use('/api/v1/auth', authRouter)
    app.use('/api/v1/garage', garageRouter)
    app.use('/api/v1/booking', bookingRouter)
    app.use('/api/v1/car', carRouter);

    return app.use('/', (req, res) => { 
        res.send("server on...")
    })
}

export default initRoutes;