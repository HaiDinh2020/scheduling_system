import React, { useState } from 'react'
import { Button, Form, Input, InputNumber, Modal, Popconfirm, Upload, message } from "antd";
import { toast } from 'react-toastify';
import { apiUploadImages } from '../../../services/Garage/garage';
import { useDispatch, useSelector } from 'react-redux';
import { apiCreateInvoice } from '../../../services/Garage/invoice';
import * as actions from '../../../store/actions'

const InvoiceModal = ({ isModalOpen, setIsModalOpen, booking, socket }) => {

    const dispatch = useDispatch();
    const garage_id = useSelector(state => state.garage?.garageInfor?.id)

    const [invoiceImages, setInvoiceImage] = useState([]);

    const uploadImage = async options => {
        const { onSuccess, onError, file } = options;

        const fmData = new FormData();

        fmData.append("file", file);
        fmData.append('upload_preset', process.env.REACT_APP_UPLOAD_IMAGES_NAME)
        try {
            const res = await apiUploadImages(fmData)

            onSuccess("Ok");
            setInvoiceImage(prev => [...prev, { uid: file.uid, url: res.data?.secure_url }]);

        } catch (err) {
            console.log("Eroor: ", err);
            onError({ err });
        }
    };

    const onFinish = async (value) => {
        const finalData = {}
        finalData["invoice_image"] = invoiceImages.map(pre => pre.url).join(", ");
        finalData["garage_id"] = garage_id;
        finalData['booking_id'] = booking.id
        finalData["amount"] = value.amount
        
        const invoiceCreate = await apiCreateInvoice(finalData)
        console.log(invoiceCreate)
        if(invoiceCreate?.data?.err === 0) {
            toast(invoiceCreate?.data?.msg, {type: 'success'})
            setIsModalOpen(false)
            dispatch(actions.updateBookingStatus(booking.id, "complete"))
        } else {
            toast("Gủi hóa đơn thất bại", {type: 'error'})
        }
    }

    const onFinishFailed = async (value) => {
    }

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    return (
        <Modal title={``} centered open={isModalOpen} onCancel={handleCancel} footer >

            <div>
                <div className="container mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
                    <h2 className="text-2xl font-bold mb-6">Gửi hóa đơn</h2>
                    <Form

                        layout="vertical"
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                    >
                        <Form.Item
                            label="Tên khách hàng"
                            name="customerName"
                            rules={[{ required: true, message: 'Vui lòng nhập số tiền!' }]}
                        >
                            <Input value={`${booking?.customer?.name}`} />
                        </Form.Item>

                        <Form.Item
                            label="Số điện thoại"
                            name="phone"
                            rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Số tiền"
                            name="amount"
                            rules={[{ required: true, message: 'Vui lòng nhập số tiền!' }]}
                        >
                            <InputNumber
                                min={1000}
                                className="w-full"
                                formatter={(value) => `${value} vnđ`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                parser={(value) => value.replace(/\D/g, '')}
                            />
                        </Form.Item>
                        <Form.Item label="Thêm ảnh">
                            <Upload
                                accept="image/*"
                                customRequest={uploadImage}
                                name='images'
                                listType="picture-card"
                                beforeUpload={(file) => {
                                    const isPNG = file.type.startsWith('image/')
                                    if (!isPNG) {
                                        message.error(`${file.name} is not a image file`);
                                    }
                                    return isPNG || Upload.LIST_IGNORE;
                                }}
                                onRemove={(file) => {
                                    setInvoiceImage(prev => prev?.filter(item => item.uid !== file.uid));
                                }}
                            >
                                <button
                                    style={{
                                        border: 0,
                                        background: 'none',
                                    }}
                                    type="button"
                                >
                                    <div>+</div>
                                    <div
                                        style={{
                                            marginTop: 8,
                                        }}
                                    >
                                        Upload
                                    </div>
                                </button>
                            </Upload>
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                Gửi Hóa Đơn
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </Modal>
    )
}

export default InvoiceModal