import React, { useEffect, useState } from 'react'
import { Button, DatePicker, Form, Input, Modal, Popconfirm, Space, Upload, message } from "antd";
import moment from 'moment';
import { apiCreateMaintenanceSchedule, apiDeleteMaintenanceSchedule, apiUpdateMaintenanceSchedule } from '../../services/Garage/maintenanceSchedule';
const { TextArea } = Input;

const MaintenanceScheduleModal = ({ isModalOpen, setIsModalOpen, booking }) => {

    const [form] = Form.useForm()

    const [initialValues, setInitialValues] = useState()

    const [isCreateMaintenance, setIsCreateMaintenance] = useState(true)


    useEffect(() => {
        if (booking?.maintenance) {
            setInitialValues({
                note: booking?.maintenance?.note
            })
            form.setFieldsValue({
                maintenanceTime: booking?.maintenance?.maintenanceTime ? moment(booking?.maintenance?.maintenanceTime) : null,
                note: booking?.maintenance?.note
            })
            if (booking?.maintenance?.id === null) {
                setIsCreateMaintenance(true)
            } else {
                setIsCreateMaintenance(false)
            }
        }

    }, [booking])


    const onFinish = async (value) => {
        try {
            const finalData = {
                booking_id: booking?.id,
                maintenanceTime: value?.maintenanceTime,
                note: value?.note
            }

            const response = await apiCreateMaintenanceSchedule(finalData)

            if (response?.data?.err === 0) {
                message.success("Lên lịch thành công", 2)
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
        setIsModalOpen(false);
    }

    const onUpdate = async () => {
        try {
            const finalData = {
                maintenanceTime: form.getFieldValue("maintenanceTime"),
                note: form.getFieldValue("note")
            }
            const response = await apiUpdateMaintenanceSchedule(booking?.maintenance?.id, finalData)

            if (response?.data?.err === 0) {
                message.success("Cập nhật thành công", 2)
            } else {
                message.error("Cập nhật thất bại", 2)
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
        setIsModalOpen(false);
    }

    const onDelete = async () => {
        try {

            const response = await apiDeleteMaintenanceSchedule(booking?.maintenance?.id)

            if (response?.data?.err === 0) {
                message.success("Xóa lịch bảo dưỡng thành công", 2)
            } else {
                message.error("Xóa thất bại", 2)
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
        setIsModalOpen(false);
    }

    const handleCancel = () => {
        setIsModalOpen(false);
    };


    return (
        <Modal title={isCreateMaintenance ? `Lên lịch bảo dưỡng` : "Lịch bảo dưỡng"} centered open={isModalOpen} onCancel={handleCancel} footer >

            <Form
                form={form}
                initialValues={initialValues}
                layout="vertical"
                onFinish={onFinish}
            >

                <Form.Item
                    label={"Ngày bảo dưỡng"}
                    name={"maintenanceTime"}
                    rules={[{ required: true, message: "Vui lòng chọn ngày bảo dưỡng" }]}
                >
                    <DatePicker />
                </Form.Item>

                <Form.Item
                    label={"Ghi chú"}
                    name={"note"}
                    rules={[{ required: true, message: 'Vui lòng thêm ghi chú!' }]}
                >
                    <TextArea placeholder='ghi chú' />
                </Form.Item>

                <Form.Item
                    className='flex justify-end'
                >
                    {
                        isCreateMaintenance ?
                            <>
                                <Button type="default" className='mr-3' onClick={() => setIsModalOpen(false)}>
                                    Hủy
                                </Button>
                                <Button type="primary" htmlType="submit">
                                    Lên lịch
                                </Button>
                            </>
                            :
                            <>
                                <Button type="default" className='mr-3' onClick={() => setIsModalOpen(false)}>
                                    Hủy
                                </Button>
                                <Popconfirm
                                    title="Delete"
                                    description="Bạn chắc chắn muốn xóa?"
                                    onConfirm={() => onDelete()}
                                    okText="Yes"
                                    cancelText="No"
                                >
                                    <Button type="default" className='mr-3'>
                                        Xóa
                                    </Button>
                                </Popconfirm>

                                <Button type="primary" onClick={() => onUpdate()}>
                                    Cập nhật
                                </Button>
                            </>
                    }

                </Form.Item>
            </Form>
        </Modal>
    )
}

export default MaintenanceScheduleModal