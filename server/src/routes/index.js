import authRouter from "./auth";
import userRouter from './user';
import garageRouter from './garage';
import bookingRouter from './booking';
import carRouter from './car';
import messageRouter from "./message";
import notiRouter from "./notification";
import fcmTokenRouter from "./firebaseToken"
import invoiceRouter from "./invoice"
import vnpayRouter from "./vnpay"
import appointmentRouter from "./appointment"
import mechanicRouter from "./mechanic"
import taskRouter from "./task"
import statRouter from "./statistics"
import invoiceDetailRouter from "./invoiceDetail"
import maintenanceRouter from "./maintenanceSchedule"

const initRoutes = (app) => {
    app.use('/api/v1/user', userRouter)
    app.use('/api/v1/auth', authRouter)
    app.use('/api/v1/garage', garageRouter)
    app.use('/api/v1/booking', bookingRouter)
    app.use('/api/v1/car', carRouter);
    app.use('/api/v1/message', messageRouter);
    app.use('/api/v1/noti', notiRouter)
    app.use('/api/v1/fcmtoken', fcmTokenRouter)
    app.use('/api/v1/invoice', invoiceRouter)
    app.use('/api/v1/vnpay', vnpayRouter)
    app.use('/api/v1/appointment', appointmentRouter )
    app.use('/api/v1/mechanic', mechanicRouter )
    app.use('/api/v1/task', taskRouter)
    app.use('/api/v1/stat', statRouter)
    app.use('/api/v1/invoice-detail', invoiceDetailRouter)
    app.use('/api/v1/maintenance', maintenanceRouter)
    
    return app.use('/', (req, res) => { 
        
        res.send("server on...")
    })
}

export default initRoutes;