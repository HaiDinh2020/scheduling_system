
import { Button, Card, Checkbox, DatePicker, Form, Input, List, Modal, Radio, Select, Space, Steps, TimePicker, Upload, message, notification } from 'antd';
import React, { memo, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { DayPicker } from 'react-day-picker';
import "react-day-picker/dist/style.css";
import { apiGetMechanicOfGarage, apiGetGarageHaveBeenRepaired } from '../../../services/Customer/booking';
import { apiGetAppointment } from '../../../services/Mechanic/appointment';
import icons from '../../../ultils/icons'
import * as actions from "../../../store/actions"
import { useNavigate } from 'react-router-dom';
import { apiGetAllGarage } from '../../../services/Customer/customer';

const { Option } = Select;
const { FaMapMarkerAlt } = icons
const { Step } = Steps;

const listDevicesMaintenance = [
    "BẢO DƯỠNG NHANH CẤP 1 (MỐC 5.000 KM)",
    "BẢO DƯỠNG NHANH CẤP 2 (MỐC 10.000 KM)",
    "BẢO DƯỠNG NHANH CẤP 3 (MỐC 15.000 KM)",
    "BẢO DƯỠNG NHANH CẤP 4 (MỐC 30.000 KM)",
    "BẢO DƯỠNG THEO LỊCH HẸN",
]

const generateTimeSlots = (start, end) => {
    const slots = [];
    let currentTime = new Date(start.getTime());
    while (currentTime < end) {
        slots.push(new Date(currentTime));
        currentTime.setMinutes(currentTime.getMinutes() + 30);
    }
    return slots;
};

const isTimeInRange = (time, startTime, endTime) => {
    return time >= new Date(startTime) && time < new Date(endTime);
};

const filterTimeSlots = (slots, events, selectedDate) => {
    return slots.filter((slot) => {
        const slotDateTime = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate(), slot.getHours(), slot.getMinutes());
        return !events.some(event =>
            isTimeInRange(slotDateTime, event.startTime, event.endTime)
        );
    });
};

const BookingMaintenance = ({ socket }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { cars } = useSelector(state => state.cars);

    const [listGarage, setListGarage] = useState([])
    const [listMechanic, setListMechanic] = useState([])
    const [mechanicEvents, setMechanicEvents] = useState([])

    const [currentStep, setCurrentStep] = useState(0);
    const [selectedDate, setSelectedDate] = useState();
    const [availableSlots, setAvailableSlots] = useState([]);
    const [selectedSlot, setSelectedSlot] = useState(null);

    const [selectedGarage, setSelectedGarage] = useState(null);
    const [selectedCar, setSelectedCar] = useState(null)
    const [selectedDevices, setSelectedDevices] = useState(null)
    const [selectedMechanic, setSelectedMechanic] = useState()
    const [selectedTime, setSelectedTime] = useState({ startTime: null, endTime: null })
    const [address, setAddress] = useState("")
    const [exactAddress, setExactAddress] = useState('');
    const [pickupOption, setPickupOption] = useState();

    useEffect(() => {
        const getAllGarages = async () => {
            const garages = await apiGetAllGarage()
            if (garages?.data?.err === 0) {
                setListGarage(garages?.data?.response)
            }
        }
        getAllGarages()
    }, [])

    useEffect(() => {
        const getAllMechanics = async (garageId) => {
            if (garageId) {
                const mechanics = await apiGetMechanicOfGarage(garageId)
                if (mechanics?.data?.err === 0) {
                    setListMechanic(mechanics?.data.response[0].mechanics)
                }
            }
        }
        getAllMechanics(selectedGarage?.id)
    }, [selectedGarage])

    useEffect(() => {
        setSelectedMechanic(null)
    }, [listMechanic])

    useEffect(() => {
        const getAppointmentOfMechanic = async (mechanicId) => {
            if (mechanicId) {
                const appointments = await apiGetAppointment(mechanicId)
                if (appointments?.data.err === 0) {
                    setMechanicEvents(appointments?.data?.response)
                } else {
                    message.error(appointments?.data?.msg, 2)
                }
            }
        }
        getAppointmentOfMechanic(selectedMechanic)
    }, [selectedMechanic])

    useEffect(() => {
        if (selectedDate) {
            const start = new Date(selectedDate);
            start.setHours(8, 0, 0, 0);
            const end = new Date(selectedDate);
            end.setHours(17, 0, 0, 0);
            const slots = generateTimeSlots(start, end);
            const available = filterTimeSlots(slots, mechanicEvents, selectedDate);
            setAvailableSlots(available);
        }
    }, [selectedDate]);

    const handlePickupOptionChange = (value) => {
        setPickupOption(value);
    };

    const getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                const newLocation = `${latitude}, ${longitude}`;
                setExactAddress(newLocation);
            }, () => {
                message.error('Không thể lấy vị trí của bạn.');
            });
        } else {
            message.error('Trình duyệt của bạn không hỗ trợ định vị.');
        }
    };

    const handleBookingMaintenance = async () => {
        const startTime = new Date(selectedDate);
        startTime.setHours(selectedSlot.getHours(), selectedSlot.getMinutes());
        const endTime = new Date(startTime);
        endTime.setMinutes(startTime.getMinutes() + 30);

        const finalDataBooking = {
            garage_id: selectedGarage?.id,
            car_id: selectedCar,
            address: address,
            exactAddress: exactAddress,
            pickupOption: pickupOption,
            mechanic_id: selectedMechanic,
            title: "bao duong ",
            description: selectedDevices,
            startTime: startTime,
            endTime: endTime
        }
        console.log(finalDataBooking)
        const booking = await dispatch(actions.createBookingMaintenance(finalDataBooking))
        if (booking) {
            navigate("/customer/booking-history")
        }
    }

    const next = () => {
        setCurrentStep(currentStep + 1);
    };

    const prev = () => {
        setCurrentStep(currentStep - 1);
    };

    const steps = [
        {
            title: 'Form',
            content: (
                <Form className='w-1/2'>
                    <Form.Item label="Chọn phương thức lấy xe">
                        <Select value={pickupOption} onChange={handlePickupOptionChange}>
                            <Option value="0">Garage tự đến lấy</Option>
                            <Option value="1">Khách hàng đưa đến</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="Địa chỉ"
                        name="address"
                        rules={[
                            {
                                required: true,
                                message: 'Nhập địa chỉ',
                            },
                        ]}
                    >
                        <Input value={address} onChange={(e) => setAddress(e.target.value)} />
                    </Form.Item>
                    <Form.Item
                        label="Tọa độ"
                        name="coordinates"
                        rules={[
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (exactAddress || value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject('Lấy tọa độ');
                                },
                                required: true
                            }),
                        ]}
                    >
                        <div className='flex border border-gray-300 rounded p-2 justify-between'>
                            {exactAddress && (
                                <a href={`https://maps.google.com/maps?`} target="_blank" rel="noopener noreferrer">
                                    {exactAddress}
                                </a>
                            )}
                            <Button onClick={getLocation}><FaMapMarkerAlt /></Button>
                        </div>
                    </Form.Item>
                </Form>
            ),
        },
        {
            title: 'Chọn Xe',
            content: (
                <Select placeholder="Chọn xe" style={{ minWidth: "130px" }} onSelect={(value) => { setSelectedCar(value) }}>
                    {cars.length > 0 && cars.map((item, index) => {
                        return (
                            <Option key={index} value={item.id}>{item.number_plate}</Option>
                        )
                    })}
                </Select>
            ),
        },

        {
            title: 'Chọn loại dịch vụ',
            content: (
                <Select placeholder="Chọn dịch vụ" style={{ minWidth: "300px" }} onSelect={(value) => { setSelectedDevices(value) }}>
                    {listDevicesMaintenance.map((device, index) => {
                        return (
                            <Option key={index} value={device} >{device}</Option>
                        )
                    })}
                </Select>
            ),
        },

        {
            title: 'Chọn Garage',
            content: (
                <Radio.Group onChange={e => setSelectedGarage(e.target.value)} value={selectedGarage}>
                    <List
                        header={<div>Garages</div>}
                        bordered
                        dataSource={listGarage}
                        renderItem={garage => (
                            <List.Item>
                                <Radio value={garage}>{garage.garage_name}</Radio>
                            </List.Item>
                        )}
                    />
                </Radio.Group>
            ),
        },
        {
            title: 'Chọn Mechanic',
            content: selectedGarage && (
                <Select value={selectedMechanic} onChange={value => setSelectedMechanic(value)} style={{ width: '100%' }} placeholder="Chọn thợ sửa chữa">
                    {listMechanic.map(mechanic => (
                        <Option key={mechanic.id} value={mechanic.id}>
                            {mechanic.user.name}
                        </Option>
                    ))}
                </Select>
            ),
        },
        {
            title: 'Chọn Day và Time',
            content: (
                <div className='flex justify-center flex-col sm:flex-row'>
                    <div className="w-2/3">
                        {selectedGarage && (
                            <DayPicker
                                mode="single"
                                selected={selectedDate}
                                onSelect={setSelectedDate}
                                disabled={[
                                    { before: new Date() },
                                    { dayOfWeek: [0, 6] }
                                ]}
                            />
                        )}
                    </div>
                    <div>
                        {selectedDate && (
                            <div className="bg-white p-4 rounded shadow-md">
                                <h2 className="text-lg font-semibold mb-2">Available Time Slots</h2>
                                <Radio.Group onChange={e => setSelectedSlot(e.target.value)} value={selectedSlot}>
                                    <div className="grid grid-cols-3 gap-2">
                                        {availableSlots.map((slot, index) => (
                                            <Radio.Button key={index} value={slot}>
                                                {slot.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </Radio.Button>
                                        ))}
                                    </div>
                                </Radio.Group>
                            </div>
                        )}
                    </div>
                </div>
            ),
        },
    ];

    return (
        <div className='w-full flex flex-col items-center'>
            <div className="w-[90%] bg-white rounded-md shadow-sm p-4 min-h-96  flex flex-col justify-between">
                <Steps current={currentStep}>
                    {steps.map(item => (
                        <Step key={item.title} title={item.title} />
                    ))}
                </Steps>
                <div className="steps-content">
                    <div className='justify-center flex my-3'>
                        {steps[currentStep].content}
                    </div>
                </div>
                <div className="steps-action ">
                    {currentStep < steps.length - 1 && (
                        <Button type="primary" onClick={() => next()}>
                            Next
                        </Button>
                    )}
                    {currentStep === steps.length - 1 && (
                        <Button type="primary" onClick={handleBookingMaintenance}>
                            Đặt lịch
                        </Button>
                    )}
                    {currentStep > 0 && (
                        <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
                            Previous
                        </Button>
                    )}
                </div>
            </div>
            <div className='w-[90%] my-3 p-4 bg-white flex flex-col items-center rounded-md shadow-sm'>
                <div className='font-bold text-black text-lg'>
                    LỊCH TRÌNH BẢO DƯỠNG NHANH DÀNH CHO XE Ô TÔ
                </div>
                <div className='flex flex-col gap-3'>
                    <div>
                        <div className='font-semibold'>BẢO DƯỠNG NHANH CẤP 1 (MỐC 5.000 KM)  </div>
                        <div className='ml-3'> Vệ sinh thổi bụi khoang máy, lọc gió động cơ và điều hòa, thay nhớt máy, khung gầm, hệ thống đèn, phanh. </div>
                    </div>

                    <div>
                        <div className='font-semibold'> BẢO DƯỠNG NHANH CẤP 2 (MỐC 10.000 KM)  </div>
                        <div className='ml-3'>
                            Vệ sinh thổi bụi khoang máy, lọc gió động cơ và điều hòa, thay nhớt máy,
                            khung gầm, hệ thống đèn, phanh, thay lọc nhớt, đảo lốp, kiểm tra góc bánh xe, hệ thống bôi trơn.
                        </div>
                    </div>
                    <div>
                        <div className='font-semibold'> BẢO DƯỠNG NHANH CẤP 3 (MỐC 15.000 KM)  </div>
                        <div className='ml-3'>
                            Vệ sinh thổi bụi khoang máy, lọc gió động cơ và điều hòa, thay nhớt máy, khung gầm,
                            hệ thống đèn, phanh, thay lọc nhớt, đảo lốp, kiểm tra góc bánh xe, hệ thống bôi trơn, vệ sinh họng hút bướm ga, can không tải.
                        </div>
                    </div>

                    <div >
                        <div className='font-semibold'> BẢO DƯỠNG NHANH CẤP 4 (MỐC 30.000 KM)  </div>
                        <div className='ml-3'>
                        Vệ sinh thổi bụi khoang máy, lọc gió động cơ và điều hòa, thay nhớt máy, khung gầm, hệ thống đèn, phanh, thay lọc nhớt, đảo lốp, kiểm tra góc bánh xe, 
                        hệ thống bôi trơn, vệ sinh họng hút bướm ga, can không tải, thay dầu hộp số, trợ lực, dầu phanh, lọc nhiên liệu, hệ thống động cơ, nước làm mát, kim phun buồng đốt, máy đề.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BookingMaintenance;
