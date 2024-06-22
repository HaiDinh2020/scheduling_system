import React, { useEffect, useState } from 'react'
import { Button, DatePicker, Form, Image, Input, InputNumber, Modal, Radio, Select, Space, TimePicker, message } from "antd";
import icons from '../../ultils/icons';
import { Option } from 'antd/es/mentions';
import { useSelector } from 'react-redux';
import { apiGetAllEngineer } from '../../services/Engineer/engineer';
import { apiCreateTask } from '../../services/Garage/task';
import moment from 'moment/moment';
import { apiGetAllBooking } from '../../services/Garage/booking';

const AddTaskModal = ({ isModalOpen, setIsModalOpen, socket, setTasks }) => {

    const [form] = Form.useForm();

    const garageId = useSelector((state) => state.garage.garageInfor.id);
    const { engineers } = useSelector((state) => state.engineers);
    const [taskStatus, setTaskStatus] = useState("");
    const [allBooking, setAllBooking] = useState([])

    useEffect(() => {
        getAllBooking(garageId)
    }, [])

    const getAllBooking = async (garageId) => {
        try {
            const response = await apiGetAllBooking(garageId)

            if (response?.data?.err === 0) {
                setAllBooking(response?.data?.response)
            } else {
                console.log(response?.data?.msg)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const onFinish = async (values) => {
        try {

            const taskData = {
                task_name: values.task_name,
                garage_id: garageId,
                booking_id: values.booking_id,
                level: values.level,
                task_status: values.task_status,
                estimated_time: values.estimated_time,
                assign_to: values.assign_to ? values.assign_to : null,
                allocation_date: values.allocation_date ? values.allocation_date.format('YYYY-MM-DD') : null,
                start_date: values.start_date ? values.start_date.format('YYYY-MM-DD') : null,
                start_time: values.start_time ? values.start_time.format('HH:mm:ss') : null,
                end_date: values.end_date ? values.end_date.format('YYYY-MM-DD') : null,
                end_time: values.end_time ? values.end_time.format('HH:mm:ss') : null,
            };

            const response = await apiCreateTask(taskData)
            console.log(response)
            if (response.status === 200) {
                message.success(response?.data.msg)
                setTasks(response?.data?.tasks)
            } else {
                message.error('Failed to create task');
            }
        } catch (error) {
            message.error('Failed to create task');
            console.error('Error:', error);
        }
        setIsModalOpen(false)
    }

    const onFinishFailed = async (value) => {

    }

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleStatusChange = (value) => {
        setTaskStatus(value);
    };

    const handleBookingIdChange = (value) => {

    }

    return (
        <Modal title={``} centered open={isModalOpen} width={400} onCancel={handleCancel} footer>
            <div className='flex flex-col justify-center items-center '>
                <h2 className="text-2xl font-medium mb-6">Thêm công việc</h2>
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >

                    <Form.Item
                        label="Tên công việc"
                        name="task_name"
                        rules={[{ required: true, message: 'Vui lòng nhập tên công việc!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Áp dụng cho"
                        name="booking_id"
                        rules={[{ required: true, message: 'Vui lòng chọn nhiệm vụ cho xe!' }]}
                    >
                        <Select  onChange={handleBookingIdChange}>
                            {allBooking.length > 0 && allBooking.filter((booking) => booking.status === "in-progress").map((booking, index) => {
                                const value=booking?.car.make + " " + booking?.car.model + " " + booking?.car.number_plate
                                return (
                                    <Select.Option key={index} value={booking.id} >{value}</Select.Option>
                                )
                            })}
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="Độ khó"
                        name={"level"}
                    >
                        <Radio.Group defaultValue={"easy"} >
                            <Radio value={"easy"}>easy</Radio>
                            <Radio value={"medium"}>medium</Radio>
                            <Radio value={"hard"}>hard</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item
                        label="Trạng thái"
                        name="task_status"
                        rules={[{ required: true, message: 'Vui lòng nhập tên công việc!' }]}
                    >
                        <Select defaultValue={"select"} onChange={handleStatusChange}>
                            <Option value='pending'>Pending</Option>
                            <Option value='assigned'>Assigned</Option>
                            <Option value='in_progress'>In progress</Option>
                            <Option value='completed'>Completed</Option>
                        </Select>
                    </Form.Item>
                    <div className='flex justify-between gap-2'>
                        <Form.Item
                            label="Thời gian dự kiến"
                            name="estimated_time"
                            rules={[{ required: true, message: 'Vui lòng nhập thời gian dự kiến hoàn thành!' }]}
                        >
                            <Input type="number" addonAfter="phút" />
                        </Form.Item>

                    </div>
                    {(taskStatus === "assigned" || taskStatus === "in_progress" || taskStatus === "completed") && (
                        <div>

                            <div className='flex justify-between gap-2'>
                                <Form.Item
                                    label="Giao cho"
                                    name="assign_to"
                                    rules={[{ required: true, message: 'Vui lòng chọn thợ sửa chữa!' }]}
                                >
                                    <Select placeholder="Chọn thợ">
                                        {engineers.map(engineer => (
                                            <Option key={engineer.id} value={engineer.id}>{engineer.user.name}</Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                                <Form.Item
                                    name={"allocation_date"}
                                    label="Ngày giao việc"
                                    initialValue={moment()}
                                    rules={[
                                        ({ getFieldValue }) => ({
                                            validator(_, value) {
                                                if (!value) {
                                                    return Promise.reject('Vui lòng chọn ngày giao việc');
                                                } else {
                                                    return Promise.resolve();
                                                }
                                            },
                                        }),
                                    ]}
                                    style={{
                                        display: 'inline-block',
                                        width: 'calc(50% - 8px)',
                                    }}
                                >
                                    <DatePicker />
                                </Form.Item>
                            </div>
                            {
                                (taskStatus === "in_progress" || taskStatus === "completed") && (
                                    <div>
                                        <Form.Item
                                            label="Ngày bắt đầu"
                                            style={{
                                                marginBottom: 0,
                                            }}
                                        >
                                            <Form.Item
                                                name={"start_date"}
                                                initialValue={moment()}
                                                rules={[
                                                    ({ getFieldValue }) => ({
                                                        validator(_, value) {
                                                            if (!value) {
                                                                return Promise.reject('Vui lòng chọn ngày bắt đầu');
                                                            } else {
                                                                return Promise.resolve();
                                                            }
                                                        },
                                                    }),
                                                ]}
                                                style={{
                                                    display: 'inline-block',
                                                    width: 'calc(50% - 8px)',
                                                }}
                                            >
                                                <DatePicker />
                                            </Form.Item>

                                            <Form.Item
                                                name={"start_time"}
                                                rules={[
                                                    {
                                                        required: true,
                                                    },
                                                ]}
                                                style={{
                                                    display: 'inline-block',
                                                    width: 'calc(50% - 8px)',
                                                    margin: '0 8px',
                                                }}
                                            >
                                                <TimePicker />
                                            </Form.Item>
                                        </Form.Item>

                                        {
                                            taskStatus === "completed" && (
                                                <Form.Item
                                                    label="Ngày hoàn thành"
                                                    style={{
                                                        marginBottom: 0,
                                                    }}
                                                >
                                                    <Form.Item
                                                        name={"end_date"}
                                                        initialValue={moment()}
                                                        rules={[
                                                            ({ getFieldValue }) => ({
                                                                validator(_, value) {
                                                                    if (!value) {
                                                                        return Promise.reject('Vui lòng chọn ngày bắt đầu');
                                                                    } else {
                                                                        return Promise.resolve();
                                                                    }
                                                                },
                                                            }),
                                                        ]}
                                                        style={{
                                                            display: 'inline-block',
                                                            width: 'calc(50% - 8px)',
                                                        }}
                                                    >
                                                        <DatePicker />
                                                    </Form.Item>

                                                    <Form.Item
                                                        name={"end_time"}
                                                        rules={[
                                                            {
                                                                required: true,
                                                            },
                                                        ]}
                                                        style={{
                                                            display: 'inline-block',
                                                            width: 'calc(50% - 8px)',
                                                            margin: '0 8px',
                                                        }}
                                                    >
                                                        <TimePicker />
                                                    </Form.Item>
                                                </Form.Item>
                                            )
                                        }
                                    </div>
                                )
                            }
                        </div>
                    )}
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Gửi
                        </Button>

                    </Form.Item>
                </Form>
            </div>
        </Modal>
    )
}

export default AddTaskModal