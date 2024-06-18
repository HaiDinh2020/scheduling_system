import React, { memo, useEffect, useState } from 'react'
import { Button, Form, Image, Input, InputNumber, Modal, Radio, Space, message } from "antd";
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { apiGetPaymentUrl } from '../../services/Customer/vnpay';
import icons from '../../ultils/icons';

const { FiDownload, FiZoomOut, FiZoomIn } = icons


const PaymentModal = ({ isModalOpen, setIsModalOpen, invoice, socket }) => {

    const [form] = Form.useForm();
  
    const [initialValues, setInitialValues] = useState({})

    useEffect(() => {
        if (invoice) {
            setInitialValues({
                amount: invoice.amount
            })
            form.setFieldValue("amount", invoice.amount)
        }
    }, [form, invoice]);

    const onFinish = async (value) => {
        try {

            const paymentData = {
                invoice_id: invoice.id,
                amount: invoice.amount,
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

    const onDownload = () => {
        fetch(invoice.invoice_image)
            .then((response) => response.blob())
            .then((blob) => {
                const url = URL.createObjectURL(new Blob([blob]));
                const link = document.createElement('a');
                link.href = url;
                link.download = 'image.png';
                document.body.appendChild(link);
                link.click();
                URL.revokeObjectURL(url);
                link.remove();
            });
    };

    return (
        <Modal title={``} centered open={isModalOpen} width={800} onCancel={handleCancel} footer >

            <div>
                <div className="container mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
                    <h2 className="text-2xl font-bold mb-6">Thanh toán hóa đơn</h2>
                    <div className='flex w-full gap-2'>
                        <div className='w-1/2'>
                            <Image

                                src={invoice.invoice_image}
                                preview={{
                                    toolbarRender: (
                                        _,
                                        {
                                            transform: { scale },
                                            actions: { onZoomOut, onZoomIn },
                                        },
                                    ) => (
                                        <Space size={12} className="toolbar-wrapper">
                                            <FiDownload onClick={onDownload} />
                                            <FiZoomOut disabled={scale === 1} onClick={onZoomOut} />
                                            <FiZoomIn disabled={scale === 25} onClick={onZoomIn} />
                                        </Space>
                                    ),
                                }}
                            />
                        </div>

                        <div className='w-1/2'>
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
                                        defaultValue={invoice?.amount}
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
                                    <Button type="default" htmlType="submit">
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

export default memo(PaymentModal)