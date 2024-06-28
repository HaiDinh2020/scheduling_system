const schedule = require('node-schedule');
const nodemailer = require('nodemailer');
const db = require('../models');
const { Op } = require('sequelize');


const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'otocare2.2@gmail.com',
        pass: 'arul rtzi jhvu zsma'
    }
});

const sendEmail = (to, subject, text) => {

    const mailOptions = {
        from: 'otocare2.2@gmail.com',
        to,
        subject,
        text
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(`Error: ${error}`);
        } else {
            console.log(`Email sent: ${info.response}`);
        }
    });
};

const sendEmailMaintenance = (to, scheduleDate) => {
    const subject = "Your Scheduled Maintenance Appointment is Approaching";
    const content = `
        Hello,

        We're reminding you about your upcoming maintenance appointment scheduled for ${scheduleDate}. Please confirm or prepare for your appointment.

        Thank you for choosing our service.

        Best regards,
        Otocare.com
    `
    sendEmail(to, subject, content)
}

const scheduleNotiBookingMaintence = () => {
    console.log("ready check")
    const checkAndSendReminders = async () => {
        console.log("check schedule")
        const today = new Date();
        const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate()); 
        startOfDay.setHours(0,0,0,0);
        const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
        endOfDay.setHours(0,0,0,0);
        const bookings = await db.Booking.findAll({
            where: {
                booking_date: {
                    [Op.gte]: startOfDay,
                    [Op.lt]: endOfDay
                },
                status: 'schedule'
            }
        });

       for(const booking of bookings) {
            
            const customerEmail = await getEmailFromCustomerId(booking.customer_id);
            
            sendEmail(customerEmail, 'Booking Reminder', `Your booking is scheduled for today. Details:`);
        }

    };

    const getEmailFromCustomerId = async (customer_id) => {
        const customer = await db.User.findOne({
            where: { id: customer_id }
        })
        return customer?.email;
    };

    schedule.scheduleJob('0 0 0 * * *', checkAndSendReminders);
};

const reminder2WeeksInAdvance = () => {
    const checkAndSendReminders = async () => {

        const today = new Date();

        const twoWeeksLater = new Date(today.getTime());
        twoWeeksLater.setDate(today.getDate() + 14);

        const formattedDate = `${twoWeeksLater.getFullYear()}-${('0' + (twoWeeksLater.getMonth() + 1)).slice(-2)}-${('0' + twoWeeksLater.getDate()).slice(-2)}`;

        const bookingNeedNoti = await db.MaintenanceSchedule.findAll({
            where: {
                maintenanceTime: {
                    [Op.eq]: formattedDate
                }
            },
            include: [
                {model: db.Booking, as: 'booking', attributes: ['customer_id'] }
            ]
        })    
        
        for (const schedule of bookingNeedNoti) {
            const customer_id = schedule.booking.customer_id;

            const customerEmail = await getEmailFromCustomerId(customer_id);
            console.log(`Sending reminder to ${customerEmail}`);
            sendEmailMaintenance(customerEmail, formattedDate);
        }
    };

    const getEmailFromCustomerId = async (customer_id) => {
        const customer = await db.User.findOne({
            where: { id: customer_id }
        })
        return customer?.email;
    };

    schedule.scheduleJob('0 0 0 * * *', checkAndSendReminders);
}

module.exports = {
    scheduleNotiBookingMaintence, reminder2WeeksInAdvance
};
