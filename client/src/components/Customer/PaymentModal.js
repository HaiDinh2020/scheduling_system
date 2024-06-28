import React, { useEffect, useState } from 'react'
import { Button, Form, InputNumber, Modal, Radio, message } from "antd";
import { apiGetPaymentUrl } from '../../services/Customer/vnpay';
import ViewInvoice from './ViewInvoice';



const PaymentModal = ({ isModalOpen, setIsModalOpen, booking }) => {

    const [form] = Form.useForm();

    const [initialValues, setInitialValues] = useState({})

    useEffect(() => {
        if (booking?.invoice) {
            setInitialValues({
                amount: booking?.invoice.amount
            })
            form.setFieldValue("amount", booking?.invoice.amount)
        }
    }, [form, booking?.invoice]);

    

    const onFinish = async (value) => {
        try {

            const paymentData = {
                invoice_id: booking?.invoice.id,
                amount: booking?.invoice.amount,
                bankCode: value.bankCode,
                language: value.language
            }

            const response = await apiGetPaymentUrl(paymentData)
            console.log(response)
            if (response.status === 200) {
                // Chuyển hướng tới URL thanh toán từ VNPAY
                window.location.href = response?.data?.vnpUrl;
            } else {
                message.error('Failed to create payment URL');
            }
        } catch (error) {
            message.error('Server error');
        }
    }

    const onFinishFailed = async (value) => {
        console.log('Error:');
    }

    const handleCancel = () => {
        setIsModalOpen(false);
    };


    return (
        <Modal title={``} centered open={isModalOpen} width={800} onCancel={handleCancel} footer >

            <div>
                <div className="container mx-auto mt-10 p-4  bg-slate-200">
                    <h2 className="text-2xl font-bold mb-6">Thanh toán hóa đơn</h2>
                    <div className='flex w-full gap-2'>
                        <div className='w-1/2 p-2 bg-white shadow-lg rounded-lg'>
                            <ViewInvoice booking={booking} />
                        </div>

                        <div className='w-1/2 p-2 bg-white shadow-lg rounded-lg'>
                            <Form
                                form={form}
                                layout="vertical"
                                initialValues={initialValues}
                                onFinish={onFinish}
                                onFinishFailed={onFinishFailed}
                            >

                                <Form.Item
                                    label="Số tiền"
                                    name="amount"
                                    rules={[{ required: true, message: 'Vui lòng nhập số tiền!' }]}
                                >
                                    <InputNumber
                                        min={10000}
                                        className="w-full"
                                        defaultValue={booking?.invoice?.amount}
                                        formatter={(value) => `${value} vnđ`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                        parser={(value) => value.replace(/\D/g, '')}
                                    />
                                </Form.Item>

                                <Form.Item name={"bankCode"} initialValue={""} label="Cổng thanh toán">
                                    <Radio.Group defaultValue="" name="bankCode">
                                        <Radio value="">Cổng thanh toán VNPAYQR</Radio>
                                        <Radio value="VNPAYQR">Thanh toán qua ứng dụng hỗ trợ VNPAYQR</Radio>
                                        <Radio value="VNBANK">Thanh toán qua ATM-Tài khoản ngân hàng nội địa</Radio>
                                        <Radio value="INTCARD">Thanh toán qua thẻ quốc tế</Radio>
                                    </Radio.Group>
                                </Form.Item>

                                <Form.Item name={"language"} initialValue={"vn"} label="Ngôn ngữ">
                                    <Radio.Group defaultValue="vn" name="language">
                                        <Radio value="vn">Tiếng việt</Radio>
                                        <Radio value="en">Tiếng anh</Radio>
                                    </Radio.Group>
                                </Form.Item>

                                <Form.Item>
                                    <Button type="primary" htmlType="submit">
                                        Thanh toán
                                    </Button>
                                </Form.Item>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default (PaymentModal)