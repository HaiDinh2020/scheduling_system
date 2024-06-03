import { Button, Card, Checkbox, DatePicker, Form, Input, List, Modal, Select, Space, TimePicker, Upload, message, notification } from 'antd';
import React, { memo, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css';


const localizer = momentLocalizer(moment)
const { Option } = Select;

const garages = [
    {
        name: "Garage A",
        parts: [
            { id: 1, name: "Oil Filter" },
            { id: 2, name: "Brake Pads" },
        ],
        events: [
            {
                id: 1,
                title: "Maintenance",
                start: new Date(2024, 4, 20, 10, 0),
                end: new Date(2024, 4, 20, 12, 0),
            },
        ],
    },
    {
        name: "Garage B",
        parts: [
            { id: 3, name: "Air Filter" },
            { id: 4, name: "Spark Plugs" },
        ],
        events: [
            {
                id: 2,
                title: "Maintenance",
                start: new Date(2024, 4, 21, 14, 0),
                end: new Date(2024, 4, 21, 16, 0),
            },
        ],
    },
];

const BookingMaintenance = ({ socket }) => {

    const [selectedGarage, setSelectedGarage] = useState(null);
    const [selectedParts, setSelectedParts] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);


    const [form] = Form.useForm();

    const handleSelectSlot = ({ start, end }) => {
        if (!selectedParts?.length) {
            notification.error({
                message: 'Error',
                description: 'Please select parts before booking a time slot.',
            });
            return;
        }

        const newEvent = {
            title: "Maintenance",
            start,
            end,
            parts: selectedParts,
        };

        const updatedEvents = [...selectedGarage.events, newEvent];
        const updatedGarage = { ...selectedGarage, events: updatedEvents };
        const updatedGarages = garages?.map(garage => garage.name === selectedGarage.name ? updatedGarage : garage);

        // Update state
        setSelectedGarage(updatedGarage);
        notification.success({
            message: 'Success',
            description: 'Maintenance time slot booked successfully.',
        });
    };



    return (
        <div className="w-full px-2 flex">
            <div className="w-1/4 pr-4">
                <List
                    header={<div>Garages</div>}
                    bordered
                    dataSource={garages}
                    renderItem={garage => (
                        <List.Item onClick={() => setSelectedGarage(garage)}>
                            {garage.name}
                        </List.Item>
                    )}
                />
            </div>
            <div className="w-1/4 pr-4">
                {selectedGarage && (
                    <Card title={`Parts at ${selectedGarage.name}`}>
                        <Checkbox.Group
                            options={selectedGarage.parts?.map(part => ({ label: part.name, value: part.id }))}
                            onChange={setSelectedParts}
                        />
                    </Card>
                )}
            </div>
            <div className="w-1/2">
                {selectedGarage && (
                    <Calendar
                        localizer={localizer}
                        events={selectedGarage.events}
                        startAccessor="start"
                        endAccessor="end"
                        style={{ height: 500 }}
                        selectable
                        onSelectSlot={handleSelectSlot}
                        onSelectEvent={event => {
                            setSelectedParts(event.parts);
                            setIsModalVisible(true);
                        }}
                        className="bg-white shadow rounded-lg"
                    />
                )}
            </div>
            <Modal
                title="Maintenance Details"
                visible={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                footer={null}
            >
                {selectedParts?.map(partId => {
                    const part = selectedGarage.parts.find(p => p.id === partId);
                    return <p key={partId}>{part.name}</p>;
                })}
            </Modal>
        </div>
    );

}

export default BookingMaintenance