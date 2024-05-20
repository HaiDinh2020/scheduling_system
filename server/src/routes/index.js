import authRouter from "./auth";
import userRouter from './user';
import garageRouter from './garage';
import bookingRouter from './booking';
import carRouter from './car';
import messageRouter from "./message";

const initRoutes = (app) => {
    app.use('/api/v1/user', userRouter)
    app.use('/api/v1/auth', authRouter)
    app.use('/api/v1/garage', garageRouter)
    app.use('/api/v1/booking', bookingRouter)
    app.use('/api/v1/car', carRouter);
    app.use('/api/v1/message', messageRouter);

    return app.use('/', (req, res) => { 
        
        res.send("server on...")
    })
}

export default initRoutes;