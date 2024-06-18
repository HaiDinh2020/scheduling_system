import { Button, Form, Input, InputNumber, Modal, Popconfirm, message } from 'antd'
import React, { useEffect, useState } from 'react'
import { apiCreateInvoiceDetail, apiDeleteInvoiceDetail, apiUpdateInvoiceDetail } from '../../services/Garage/invoice'

const InvoiceDetailModal = ({ isModalOpen, setIsModalOpen, invoiceDetail, invoiceId, getInvoiceDetail }) => {

    const [form] = Form.useForm()

    const [initialValues, setInitialValues] = useState({})
    const [quantity, setQuantity] = useState(0)
    const [unitPrice, setUnitPrice] = useState(0)

    useEffect(() => {
        if (invoiceDetail !== null) {
            setInitialValues({
                item_description: invoiceDetail.item_description,
                unit: invoiceDetail.unit,
                quantity: invoiceDetail.quantity,
                unit_price: invoiceDetail.unit_price,
            })
            form.setFieldsValue({
                item_description: invoiceDetail.item_description,
                unit: invoiceDetail.unit,
                quantity: invoiceDetail.quantity,
                unit_price: invoiceDetail.unit_price,
            })
            setQuantity(invoiceDetail.quantity)
            setUnitPrice(invoiceDetail.unit_price)
        } else {
            setInitialValues({
                item_description: "",
                unit: "",
                quantity: null,
                unit_price: null,
            })
            form.setFieldsValue({
                item_description: "",
                unit: "",
                quantity: null,
                unit_price: null,
            })
            setQuantity(0)
            setUnitPrice(0)
        }
    }, [invoiceDetail])

    const handleNewCost = async () => {
        try {
            const invoiceDetailValue = {
                quantity: quantity,
                unit_price: unitPrice,
                item_description: form.getFieldValue("item_description"),
                unit: form.getFieldValue("unit")
            }

            const response = await apiCreateInvoiceDetail(invoiceId, invoiceDetailValue)
            if (response?.data?.err === 0) {
                getInvoiceDetail(invoiceId)
                setIsModalOpen(false);
            }
        } catch (error) {
            if (error.response) {
                message.error(error.response.data.msg || "Server error");
            } else if (error.request) {
                message.error("Network error");
            } else {
                message.error("Unexpected error");
            }
        }

    }

    const handleUpdateInvoiceDetail = async (invoiceDetailId) => {
        try {
            const invoiceDetailValue = {
                quantity: quantity,
                unit_price: unitPrice,
                item_description: form.getFieldValue("item_description"),
                unit: form.getFieldValue("unit")
            }

            const response = await apiUpdateInvoiceDetail(invoiceDetailId, invoiceDetailValue)
            if (response?.data?.err === 0) {
                getInvoiceDetail(invoiceId)
                setIsModalOpen(false);
            } else {
                message.error(response?.data?.msg)
            }
        } catch (error) {
            if (error.response) {
                message.error(error.response.data.msg || "Server error");
            } else if (error.request) {
                message.error("Network error");
            } else {
                message.error("Unexpected error");
            }
        }

    }

    const handleDeleteInvoiceDetail = async(invoiceDetailId) => {
        try {
            const response = await apiDeleteInvoiceDetail(invoiceDetailId)
            if (response?.data?.err === 0) {
                getInvoiceDetail(invoiceId)
                setIsModalOpen(false);
            }
        } catch (error) {
            if (error.response) {
                message.error(error.response.data.msg || "Server error");
            } else if (error.request) {
                message.error("Network error");
            } else {
                message.error("Unexpected error");
            }
        }
    }

    const handleCancel = () => {
        form.resetFields()
        setQuantity(0)
        setUnitPrice(0)
        setIsModalOpen(false);
    };

    return (
        <div>
            <Modal title={invoiceDetail === null ? "New cost" : "Cost"} open={isModalOpen} onCancel={handleCancel} footer >
                <Form
                    form={form}
                    initialValues={initialValues}
                    layout="vertical"
                    onFinish={handleNewCost}
                >
                    <Form.Item
                        label="Tên hàng hóa, dịch vụ"
                        name={"item_description"}
                        rules={[{ required: true, message: 'Vui lòng nhập tên hàng hóa, dịch vụ!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Đơn vị tính"
                        name={"unit"}
                        rules={[{ required: true, message: 'Vui lòng nhập đơn vị tính!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Số lượng"
                        name="quantity"
                        rules={[{ required: true, message: 'Vui lòng nhập số tiền!' }]}
                    >
                        <InputNumber
                            min={1}
                            value={quantity}
                            onChange={(value) => { setQuantity(value) }}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Đơn giá"
                        name="unit_price"
                        rules={[{ required: true, message: 'Vui lòng nhập số tiền!' }]}
                    >
                        <InputNumber
                            min={1000}
                            className="w-full"
                            formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            parser={(value) => value.replace(/\D/g, '')}
                            addonAfter="vnđ"
                            value={unitPrice}
                            onChange={(value) => { setUnitPrice(value) }}
                        />
                    </Form.Item>
                    <div>Thành tiền: {quantity !== 0 && unitPrice !== 0 && (<>{quantity} * {unitPrice} = {quantity * unitPrice} đ</>)} </div>
                    <div className='flex justify-end'>
                        {invoiceDetail === null ?

                            <Button type="primary" htmlType="submit">
                                Add cost
                            </Button>
                            :
                            <div className=''>
                                <Popconfirm
                                    title="Delete"
                                    description="Bạn chắc chắn muốn xóa?"
                                    onConfirm={() => handleDeleteInvoiceDetail(invoiceDetail.id)}
                                    okText="Yes"
                                    cancelText="No"
                                >
                                    <Button type="default" >
                                        Delete
                                    </Button>
                                </Popconfirm>

                                <Button className='ml-4' type="primary" onClick={() => handleUpdateInvoiceDetail(invoiceDetail.id)}>
                                    Save
                                </Button>
                            </div>


                        }
                    </div>
                </Form>
            </Modal>
        </div>
    )
}

export default InvoiceDetailModal