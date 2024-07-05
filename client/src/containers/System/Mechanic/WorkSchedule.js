import React, { useEffect, useState } from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import { format } from 'date-fns'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Button, Form, Input, Modal, message, notification } from 'antd';
import { useSelector } from 'react-redux';
import { apiChangeStatusAppointment, apiCreateAppointment, apiDeleteAppointment, apiGetAppointment, apiUpdateAppointment } from '../../../services/Mechanic/appointment';

const localizer = momentLocalizer(moment)

const WorkSchedule = () => {

    const { userCurentProfile } = useSelector(state => state.user)

    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();

    useEffect(() => {
        const getAppointment = async (mechanic_id) => {
            if (mechanic_id) {
                try {
                    const response = await apiGetAppointment(mechanic_id);
                    console.log(response)
                    if (response?.data.err === 0) {
                        setEvents(response.data?.response)
                    }
                } catch (error) {
                    console.log(error)
                }

            }
        }
        getAppointment(userCurentProfile.mechanic?.id)
    }, [])

    const handleSelectSlot = ({ start, end }) => {
        const now = new Date();

        if (start <= now) {
            notification.error({
                message: 'Error',
                description: 'You cannot select a time in the past.',
            });
            return;
        }

        setSelectedEvent({ start, end });
        form.resetFields();
        setIsModalVisible(true);
    };

    const handleSelectEvent = event => {
        console.log(event)
        setSelectedEvent(event);
        form.setFieldsValue(event);
        setIsModalVisible(true);
    };

    const handleDeleteEvent = async () => {
        setEvents(events.filter(event => event.id !== selectedEvent.id));
        setIsModalVisible(false);
        try {
            const response = await apiDeleteAppointment(selectedEvent.id)
            if(response?.data?.err === 0) {
                message.success("Delete success")
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
            console.log(error)
        }
    };

    const handleEditEvent = async (values) => {
        
        try {
            const title = values.title
            const description = values.description
            console.log(values)
            const response = await apiUpdateAppointment(selectedEvent.id, {title, description} )
            if(response?.data?.err === 0) {
                message.success("update success")
                setEvents(events.map(event => event.id === selectedEvent.id ? { ...event, title, description } : event));
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
            console.log(error)
        }

        setIsModalVisible(false);
    };

    const handleAddEvent = async (values) => {
        const dataAppointment = { ...values, startTime: new Date(selectedEvent.start), endTime: new Date(selectedEvent.end), mechanic_id: userCurentProfile.mechanic.id }
        console.log(dataAppointment)
        const response = await apiCreateAppointment(dataAppointment)
        console.log(response)
        if (response.data.err === 0) {
            setEvents([...events, response?.data?.response]);
        } else {
            message.error(response.data.msg, 2)
        }
        setIsModalVisible(false);
    };

    const handleChangeStatus = async (appointmentId, status) => {
        try {
            setEvents(events.map(event => event.id === selectedEvent.id ? { ...event, status } : event));
            const response = await apiChangeStatusAppointment(appointmentId, status)
            if(response?.data?.err === 0) {
                message.success("Change status success")
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

        setIsModalVisible(false);
    }

    const eventStyleGetter = (event) => {
        let backgroundColor = '';

        switch (event.status) {
            case 'todo':
                backgroundColor = 'orage';
                break;
            case 'in-progress':
                backgroundColor = 'aqua';
                break;
            case 'done':
                backgroundColor = 'green';
                break;
            default:
                backgroundColor = 'gray';
        }
        return {
            style: {
                backgroundColor,
                color: 'white',
            },
        };
    }


    return (
        <div className='container flex flex-col items-center'>
            <div className='bg-white rounded-xl border-2 shadow-md w-[95%] px-4 py-4'>
                <div className='text-base font-bold'>WorkSchedule</div>
                <div className=''>
                    <Calendar
                        localizer={localizer}
                        events={events}
                        startAccessor={(event) => { return new Date(event.startTime) }}
                        endAccessor={(event) => { return new Date(event.endTime) }}
                        style={{ height: 500 }}
                        selectable
                        onSelectSlot={handleSelectSlot}
                        onSelectEvent={handleSelectEvent}
                        className="bg-white shadow rounded-lg"
                        eventPropGetter={eventStyleGetter}
                    />
                    <div className='flex gap-3 flex-row-reverse mx-2 mt-1'>
                        <div className='flex gap-1 items-center'>
                            <div className='w-2 h-2 bg-orange-500'></div>
                            <div className='text-sm'>todo</div>
                        </div>
                        <div className='flex gap-1 items-center'>
                            <div className='w-2 h-2 bg-blue-300'></div>
                            <div className='text-sm'>in-progress</div>
                        </div>
                        <div className='flex gap-1 items-center'>
                            <div className='w-2 h-2 bg-green-500'></div>
                            <div className='text-sm'>done</div>
                        </div>
                        <div className='flex gap-1 items-center'>
                            <div className='w-2 h-2 bg-gray-500'></div>
                            <div className='text-sm'>other</div>
                        </div>
                    </div>
                    <Modal
                        title={selectedEvent && selectedEvent.title ? "Edit Event" : "Add Event"}
                        open={isModalVisible}
                        onCancel={() => setIsModalVisible(false)}
                        footer={[
                            selectedEvent && selectedEvent.task_id === null && selectedEvent.status === 'todo' && (
                                <Button key="done" type="primary" className='bg-green-400' color='green' onClick={() => handleChangeStatus(selectedEvent.id, "done")}>
                                    Đánh dấu hoàn thành
                                </Button>
                            ),
                            selectedEvent && selectedEvent.title && (
                                <Button key="delete" type="danger" onClick={handleDeleteEvent}>
                                    Delete
                                </Button>
                            ),
                            <Button key="cancel" onClick={() => setIsModalVisible(false)}>
                                Cancel
                            </Button>,
                            <Button
                                key="save"
                                type="primary"
                                onClick={() => {
                                    form.validateFields()
                                        .then(values => {
                                            form.resetFields();
                                            selectedEvent && selectedEvent.title ? handleEditEvent(values) : handleAddEvent(values);
                                        })
                                        .catch(info => {
                                            console.log('Validate Failed:', info);
                                        });
                                }}
                            >
                                {selectedEvent && selectedEvent.title ? "Save" : "Add"}
                            </Button>,
                        ]}
                    >
                        <Form form={form} layout="vertical" name="form_in_modal">
                            <div>Thời gian: {selectedEvent?.startTime && format(new Date(selectedEvent?.startTime), 'HH:mm dd-MM-yyyy')} - {selectedEvent?.endTime && format(new Date(selectedEvent?.endTime), 'HH:mm dd-MM-yyyy')}</div>
                            <Form.Item
                                name="title"
                                label="Event Title"
                                rules={[{ required: true, message: 'Please input the title of the event!' }]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                name="description"
                                label="Description"
                                rules={[{ required: true, message: 'Please input the description of the event!' }]}
                            >
                                <Input.TextArea />
                            </Form.Item>
                        </Form>
                    </Modal>
                </div>
            </div>
        </div>
    )
}

export default WorkSchedule