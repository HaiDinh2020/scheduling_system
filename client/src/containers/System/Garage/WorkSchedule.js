import React, { useEffect, useState } from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Button, Form, Input, Modal, notification } from 'antd';

const localizer = momentLocalizer(moment)

const WorkSchedule = () => {

    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();

    useEffect(() => {
        console.log(events)
    }, [events])

    const handleSelectSlot = ({ start, end }) => {
        const now = new Date();

        if (start <= now) {
            notification.error({
                message: 'Error',
                description: 'You cannot select a time in the past.',
            });
            return;
        }

        const isOverlap = events.some(event =>
            (start < event.end && end > event.start)
        );

        if (isOverlap) {
            notification.error({
                message: 'Error',
                description: 'Selected time slot overlaps with an existing event.',
            });
            return;
        }

        setSelectedEvent({ start, end });
        form.resetFields();
        setIsModalVisible(true);
    };

    const handleSelectEvent = event => {
        setSelectedEvent(event);
        form.setFieldsValue(event);
        setIsModalVisible(true);
    };

    const handleDeleteEvent = () => {
        setEvents(events.filter(event => event !== selectedEvent));
        setIsModalVisible(false);
    };

    const handleEditEvent = (values) => {
        const title = values.title;
        setEvents(events.map(event => event === selectedEvent ? { ...event, title } : event));
        setIsModalVisible(false);
    };

    const handleAddEvent = (values) => {
        setEvents([...events, { ...values, ...selectedEvent }]);
        setIsModalVisible(false);
    };

    return (
        <div className='container flex flex-col items-center'>
            <div className='bg-white rounded-xl border-2 shadow-md w-[95%] px-4 py-4'>
                <div className='text-base font-bold'>WorkSchedule</div>
                <div className=''>
                    <Calendar
                        localizer={localizer}
                        events={events}
                        startAccessor="start"
                        endAccessor="end"
                        style={{ height: 500 }}
                        selectable
                        onSelectSlot={handleSelectSlot}
                        onSelectEvent={handleSelectEvent}
                        className="bg-white shadow rounded-lg"
                    />
                    <Modal
                        title={selectedEvent && selectedEvent.title ? "Edit Event" : "Add Event"}
                        open={isModalVisible}
                        onCancel={() => setIsModalVisible(false)}
                        footer={[
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
                                rules={[{ required: true, message: 'Please input the description of the event!'}]}
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