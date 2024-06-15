import React, { useEffect, useState } from 'react';
import { Button, DatePicker, Form, Image, Input, InputNumber, Modal, Radio, Select, Space, TimePicker, message } from "antd";
import icons from '../../ultils/icons';
import { Option } from 'antd/es/mentions';
import { useSelector } from 'react-redux';
import { apiUpdateTask } from '../../services/Garage/task';
import moment from 'moment/moment';
import { apiEngineerUpdateTask } from '../../services/Engineer/task';

const UpdateTaskModal = ({ isModalOpen, setIsModalOpen, socket, taskData, setTasks }) => {

    const [form] = Form.useForm();

    const [taskStatus, setTaskStatus] = useState("");
    const [initialValues, setInitialValues] = useState({})
  

    useEffect(() => {
        if (taskData) {
            setTaskStatus(taskData.task_status);
            setInitialValues({
                task_name: taskData.task_name,
                allocation_date: moment(taskData.allocation_date),
                estimated_time: taskData.estimated_time,
                task_status: taskData.task_status,
                start_date: taskData.start_date ? moment(taskData.start_date) : null,
                start_time: taskData.start_time ? moment(taskData.start_time, 'HH:mm:ss') : null,
                end_date: taskData.end_date ? moment(taskData.end_date) : null,
                end_time: taskData.end_time ? moment(taskData.end_time, 'HH:mm:ss') : null,
            })
        }
    }, [taskData]);

    const onFinish = async (values) => {
        try {
            const taskDataUpdate = {
                task_status: values.task_status,
                start_date: values.start_date ? values.start_date.format('YYYY-MM-DD') : null,
                start_time: values.start_time ? values.start_time.format('HH:mm:ss') : null,
                end_date: values.end_date ? values.end_date.format('YYYY-MM-DD') : null,
                end_time: values.end_time ? values.end_time.format('HH:mm:ss') : null,
            };

            if (taskData?.id) {
                const response = await apiEngineerUpdateTask(taskData.id, taskDataUpdate);
                console.log(response);
                if (response.status === 200) {
                    message.success(response?.data.msg);
                    
                    setTasks(prevTasks => {
                        
                        const updatedTasks = prevTasks.map(task => {
                            if (task.id === taskData.id) {
                                return response?.data?.response;
                            }
                            return task;
                        });
                        return updatedTasks; // Trả về mảng tasks đã được cập nhật
                    });
                } else {
                    message.error('Failed to update task');
                }
            }
        } catch (error) {
            message.error('Failed to update task');
            console.error('Error:', error);
        }
        setIsModalOpen(false);
    };

    const onFinishFailed = async (value) => {

    };

    const handleCancel = () => {
        form.resetFields();
        setIsModalOpen(false);
    };

    const handleStatusChange = (value) => {
        setTaskStatus(value);
    };

    return (
        <Modal title={``} centered open={isModalOpen} width={400} onCancel={handleCancel} footer>
            <div className='flex flex-col justify-center items-center '>
                <h2 className="text-2xl font-medium mb-6">Cập nhật công việc</h2>
                <Form
                    form={form}
                    layout="vertical"
                    initialValues={initialValues}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >

                    <Form.Item
                        label="Tên công việc"
                        name="task_name"
                        rules={[{ required: true, message: 'Vui lòng nhập tên công việc!' }]}
                    >
                        <Input readOnly />
                    </Form.Item>

                    <div className='flex justify-between gap-2'>

                        <Form.Item
                            name={"allocation_date"}
                            label="Ngày giao việc"
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
                            <DatePicker value={moment(taskData?.allocation_date)} readOnly />
                        </Form.Item>
                        <Form.Item
                            label="Thời gian dự kiến "
                            name="estimated_time"
                            rules={[{ required: true, message: 'Vui lòng nhập thời gian dự kiến hoàn thành!' }]}
                        >
                            <Input type="number" addonAfter="phút" readOnly />
                        </Form.Item>
                    </div>

                    <Form.Item
                        label="Trạng thái"
                        name="task_status"
                        rules={[{ required: true, message: 'Vui lòng đặt trạng thái!' }]}
                    >
                        <Select defaultValue={"select"} onChange={handleStatusChange}>
                            <Select.Option value='pending'>Pending</Select.Option>
                            <Select.Option value='in_progress'>In progress</Select.Option>
                            <Select.Option value='completed'>Completed</Select.Option>
                        </Select>
                    </Form.Item>
                    {(taskStatus === "in_progress" || taskStatus === "completed") && (
                        <div>


                            <Form.Item
                                label="Ngày bắt đầu"
                                style={{
                                    marginBottom: 0,
                                }}
                            >
                                <Form.Item
                                    name={"start_date"}
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
                                    <DatePicker defaultValue={moment(taskData.start_date, 'YYYY-MM-DD')} />
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
                                    <TimePicker defaultValue={moment(taskData.start_time, 'HH:mm:ss')} />
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
                    )}
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Cập nhật
                        </Button>

                    </Form.Item>
                </Form>
            </div>
        </Modal>
    )
}

export default UpdateTaskModal;
