import express from 'express'
import verifyToken from '../middlewares/verifyToken'
import db from '../models';
import moment from 'moment';
import { v4 } from 'uuid';
const qs = require('qs');
const crypto = require('crypto');


const router = express.Router()

router.use(verifyToken)

router.post('/create_payment_url', async (req, res) => {
    try {

        const { invoice_id } = req.body;

        const invoice = await db.Invoice.findOne({
            where: { id: invoice_id },
            include: [{ model: db.GaragePaymentConfig, as: 'paymentConfig' }]
        });

        if (!invoice) {
            return res.status(404).json({ error: 'Invoice not found' });
        }

        const config = invoice.paymentConfig;

        process.env.TZ = 'Asia/Ho_Chi_Minh';

        let date = new Date();
        let createDate = moment(date).format('YYYYMMDDHHmmss');

        let ipAddr = req.headers['x-forwarded-for'] ||
            req.connection.remoteAddress ||
            req.socket.remoteAddress ||
            req.connection.socket.remoteAddress;


        let tmnCode = config.vnp_TmnCode;
        let secretKey = config.vnp_HashSecret;
        let vnpUrl = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";
        let returnUrl = config.vnp_ReturnUrl;
        let orderId = invoice.id;
        let amount = req.body.amount;
        let bankCode = req.body.bankCode;

        let locale = req.body.language;
        if (locale === null || locale === '') {
            locale = 'vn';
        }
        let currCode = 'VND';
        let vnp_Params = {};
        vnp_Params['vnp_Version'] = '2.1.0';
        vnp_Params['vnp_Command'] = 'pay';
        vnp_Params['vnp_TmnCode'] = tmnCode;
        vnp_Params['vnp_Locale'] = locale;
        vnp_Params['vnp_CurrCode'] = currCode;
        vnp_Params['vnp_TxnRef'] = orderId;
        vnp_Params['vnp_OrderInfo'] = 'Thanh toan cho ma GD:' + orderId;
        vnp_Params['vnp_OrderType'] = 'other';
        vnp_Params['vnp_Amount'] = amount * 100;
        vnp_Params['vnp_ReturnUrl'] = returnUrl;
        vnp_Params['vnp_IpAddr'] = ipAddr;
        vnp_Params['vnp_CreateDate'] = createDate;
        if (bankCode !== null && bankCode !== '') {
            vnp_Params['vnp_BankCode'] = bankCode;
        }

        vnp_Params = sortObject(vnp_Params);

        let querystring = require('qs');
        let signData = querystring.stringify(vnp_Params, { encode: false });
        let crypto = require("crypto");
        let hmac = crypto.createHmac("sha512", secretKey);
        let signed = hmac.update(new Buffer(signData, 'utf-8')).digest("hex");
        vnp_Params['vnp_SecureHash'] = signed;
        vnpUrl += '?' + querystring.stringify(vnp_Params, { encode: false });

        return res.status(200).json({ vnpUrl });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            error: 'Internal Server Error ' + error
        });
    }
});

function sortObject(obj) {
    let sorted = {};
    let str = [];
    let key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) {
            str.push(encodeURIComponent(key));
        }
    }
    str.sort();
    for (key = 0; key < str.length; key++) {
        sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
    }
    return sorted;
}

router.get('/vnpay_return', async (req, res) => {
    try {
        let vnp_Params = req.query;
        let secureHash = vnp_Params['vnp_SecureHash'];

        delete vnp_Params['vnp_SecureHash'];
        delete vnp_Params['vnp_SecureHashType'];

        vnp_Params = sortObject(vnp_Params);
        let signData = qs.stringify(vnp_Params, { encode: false });


        // Lấy thông tin hóa đơn từ vnp_TxnRef
        const invoiceId = vnp_Params['vnp_TxnRef'];
        const invoice = await db.Invoice.findOne({
            where: { id: invoiceId },
            include: [{ model: db.GaragePaymentConfig, as: 'paymentConfig' }]
        });

        if (!invoice) {
            return res.status(404).json({ code: '01', message: 'Invoice not found' });
        }

        const config = invoice.paymentConfig;
        const secretKey = config.vnp_HashSecret;
        let hmac = crypto.createHmac('sha512', secretKey);
        let signed = hmac.update(Buffer.from(signData, 'utf-8')).digest('hex');

        if (secureHash === signed) {
            // tạo transaction và cập nhật status invoice
            const transaction = await db.Transaction.create({
                id: v4(),
                invoice_id: invoice.id,
                transaction_id: vnp_Params['vnp_TransactionNo'],
                amount: vnp_Params['vnp_Amount'] / 100,
                status: vnp_Params['vnp_ResponseCode'] === '00' ? 'success' : 'failed'
            });

            if (vnp_Params['vnp_ResponseCode'] === '00') {
                invoice.status = 'paid';
                await invoice.save();
                res.status(200).json({ code: '00', message: 'Payment Successful' });
            } else {
                invoice.status = 'failed';
                await invoice.save();
                res.status(200).json({ code: vnp_Params['vnp_ResponseCode'], message: 'Payment Failed' });
            }
        } else {
            res.status(200).json({ code: '97', message: 'Checksum failed' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ code: '99', message: 'Internal Server Error' });
    }
});




export default router;