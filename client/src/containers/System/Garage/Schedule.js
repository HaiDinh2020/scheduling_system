import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify';
import { Popconfirm } from "antd";
import menuScheduleStatus from '../../../ultils/menuScheduleStatus';
import icons from '../../../ultils/icons';
import avatarDefault from '../../../asests/avatar_default.png'
import logo from '../../../asests/logo.jpg'
import Button from '../../../components/Button'
import * as actions from '../../../store/actions'

const { LuFlagTriangleRight, FcOvertime } = icons
const Schedule = () => {

    const dispatch = useDispatch();

    const garageId = useSelector((state) => state.garage.garageInfor.id);
    const { garageBookingData } = useSelector((state) => state.booking);

    const [displayStatus, setDisplayStatus] = useState(menuScheduleStatus[0].status);

    useEffect(() => {
        dispatch(actions.getAllBooking(garageId))
    }, [])

    useEffect(() => {
        dispatch(actions.getBookingStatus(garageId, displayStatus))
    }, [displayStatus])



    const handleChangeStatus = (bookingId, newStatus) => {
        dispatch(actions.updateBookingStatus(bookingId, newStatus))
    }

    const showConfirm = () => {
        
    }

    const renderBookingTime = (booking_date) => {
        const time = booking_date.split("T")[1].slice(0, 5)
        const day = booking_date.split("T")[0]
        return (
            <div className='flex gap-2 items-end'>
                <div className='text-2xl font-semibold'>{time}</div>
                <div>{day}</div>
            </div>
        )
    }

    const renderButton = (status, bookingId) => {
        if (status === 'request') {
            return (
                <div className='flex justify-end gap-2'>
                    <Button text={"Chấp nhận"} bgcolor={"bg-green-400"} textcolor={'text-white'} onClick={(e) => handleChangeStatus(bookingId, "in-progress")} />
                    <Button text={"Từ chối"} bgcolor={"bg-red-400"} textcolor={'text-white'} onClick={(e) => handleChangeStatus(bookingId, "reject")} />
                </div>
            )
        } else if (status === "in-progress") {
            return (
                <div className='flex justify-end gap-2'>
                    <Button text={"Hoàn thành"} bgcolor={"bg-green-400"} textcolor={'text-white'} onClick={(e) => handleChangeStatus(bookingId, "complete")} />
                    <Button
                        text={"Hủy bỏ"}
                        bgcolor={"bg-red-400"}
                        textcolor={'text-white'}
                        onClick={(e) => {

                            handleChangeStatus(bookingId, "reject")
                        }} />
                </div>
            )
        } else if (status === "complete") {
            return (
                <div className='flex justify-end gap-2'>
                    <Popconfirm
                        placement="topLeft"
                        title={"Xác nhận hủy bỏ lịch hẹn"}
                        description={"Lý do hủy bỏ"}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button text={"Hủy bỏ"} bgcolor={"bg-red-400"} textcolor={'text-white'} onClick={(e) => handleChangeStatus(bookingId, "reject")} />
                    </Popconfirm>

                </div>
            )
        } else {
            return (
                <div className='flex justify-end gap-2'>
                    <Button text={"Xóa"} bgcolor={"bg-red-400"} textcolor={'text-white'} onClick={showConfirm}/>
                </div>
            )
        }
    }

    return (
        <div className='container flex flex-col items-center'>
            <div className='bg-white h-full min-h-12 flex items-center rounded-xl border-2 shadow-md w-[95%] px-4 mb-2'>
                <div className='flex w-full justify-around'>
                    {
                        menuScheduleStatus.map((item, index) => {
                            return (
                                <div
                                    key={index}
                                    className={item.status === displayStatus ? "cursor-pointer font-bold" : "cursor-pointer"}
                                    onClick={() => setDisplayStatus(item.status)}
                                >
                                    {item.text}
                                </div>
                            )
                        })
                    }
                </div>

            </div>

            <div className='bg-white h-full min-h-screen rounded-xl border-2 shadow-md w-[95%] p-4'>
                {
                    garageBookingData && garageBookingData.map((item, index) => {
                        return (
                            <div key={index} className='w-full border-b-8 border-b-slate-550 p-2 mb-5'>
                                <div className='w-full flex gap-3 mb-1'>
                                    <div className='w-1/3'>
                                        <div className='flex items-center gap-2 mb-3'>
                                            <img src={item.customer.avatar || avatarDefault} alt='avatar' className='w-16 rounded-full bg-slate-200 p-1'></img>
                                            <div>
                                                <div className='text-xl font-bold'>
                                                    {item.customer.name}
                                                </div>
                                                <div>
                                                    +84{item.phone}
                                                </div>
                                            </div>
                                        </div>
                                        <div className=''>
                                            <div className='flex items-center gap-1 mb-2'>
                                                <FcOvertime size={25} />
                                                {renderBookingTime(item.booking_date)}
                                            </div>
                                            <div className='flex items-center gap-2'>
                                                <LuFlagTriangleRight size={15} />
                                                <div className='text-lg font-normal'>{item.services}</div>

                                            </div>
                                        </div>
                                    </div>
                                    <div className='w-1/3 flex flex-col justify-between'>
                                        <div className='mb-2'>
                                            <div className='font-bold mb-1'>Mô tả</div>
                                            <div  >{item.description}</div>
                                        </div>

                                        <div>
                                            <div className='font-bold mb-1'>Loại xe</div>
                                            <div  >{item.car.make}-{item.car.model} {item.car.number_plate}</div>
                                        </div>

                                    </div>
                                    <div className='w-1/3'>
                                        <div className='font-bold mb-1'>Hình ảnh</div>
                                        {
                                            item.booking_images && <img src={item.booking_images} alt="booking_image" className='w-[300px]' />
                                        }

                                    </div>
                                </div>


                                {renderButton(item.status, item.id)}
                            </div>
                        )
                    })
                }
            </div>
            <ToastContainer />
        </div>
    )
}

export default Schedule