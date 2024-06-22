const schedule = require('node-schedule');
const nodemailer = require('nodemailer');
const db = require('../models');


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

const scheduleNotiBookingMaintence = () => {
    console.log("ready check")
    const checkAndSendReminders = async () => {
        console.log("check schedule")
        // const today = new Date();
        // today.setHours(0, 0, 0, 0); 

        // const bookings = await db.Booking.findAll({
        //     where: {
        //         booking_date: today,
        //         status: 'schedule'
        //     }
        // });

        // bookings.forEach(booking => {
        //     
        // });
        const customerEmail = await getEmailFromCustomerId("84ea9950-f0de-4949-b00c-493e1c806067");
        
        sendEmail(customerEmail, 'Booking Reminder', `Your booking is scheduled for today. Details:`);
    };

    const getEmailFromCustomerId = async (customer_id) => {
        const customer = await db.User.findOne({
            where: { id: customer_id }
        })
        return customer.email;
    };

    schedule.scheduleJob('0 0 0 * * *', checkAndSendReminders);
};

module.exports = {
    scheduleNotiBookingMaintence
};
