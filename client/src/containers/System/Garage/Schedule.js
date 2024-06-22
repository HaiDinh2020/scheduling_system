import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify';
import { Popconfirm, Tag, message } from "antd";
import menuScheduleStatus from '../../../ultils/menuScheduleStatus';
import icons from '../../../ultils/icons';
import avatarDefault from '../../../asests/avatar_default.png'
import Button from '../../../components/Button'
import * as actions from '../../../store/actions'
import InvoiceModal from '../../../components/Garage/InvoiceModal';
import AssignModal from './assignModal';

const { LuFlagTriangleRight, FcOvertime, MdOutlinePhone } = icons
const Schedule = ({ socket }) => {

    const dispatch = useDispatch();

    const garageId = useSelector((state) => state.garage.garageInfor.id);
    const { garageBookingData } = useSelector((state) => state.booking);

    const [displayStatus, setDisplayStatus] = useState(menuScheduleStatus[0].status);
    const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false)
    const [isAssignModalOpen, setIsAssignModalOpen] = useState(false)

    const [bookingRequest, setBookingRequest] = useState({})
    const [booking, setBooking] = useState({})                              // booking sẽ hiển thị trên hóa đơn
    const [listBooking, setListBooking] = useState([])

    useEffect(() => {
        if (socket) {
            socket.on("booking_request", (bookingDetail) => {
                console.log(111111);
                console.log(bookingDetail);
            });

            return () => {
                socket.off("booking_request"); // Ngừng lắng nghe sự kiện khi component unmount
            };
        }
        else {
            console.log("no")
        }
    }, [socket]);


    useEffect(() => {
        dispatch(actions.getAllBooking(garageId))
    }, [])

    useEffect(() => {
        dispatch(actions.getBookingStatus(garageId, displayStatus))
    }, [displayStatus])

    useEffect(() => {
        if (displayStatus !== "all") {
            const updateList = garageBookingData.filter((item) => item.status === displayStatus)
            setListBooking(updateList)
        } else {
            setListBooking(garageBookingData)
        }
    }, [displayStatus, garageBookingData])

    const handleChangeStatus = (bookingId, newStatus) => {
        dispatch(actions.updateBookingStatus(bookingId, newStatus))
    }

    const handleAcceptRequest = (bookingId) => {
        setBookingRequest(bookingId)
        setIsAssignModalOpen(true)
        // dispatch(actions.updateBookingGarage(garageId, bookingId))
    }

    const handleRejectRequest = (bookingId) => {
        dispatch(actions.updateBookingGarage(garageId, bookingId))
    }

    const showConfirm = () => {

    }

    const handleCreateInvoice = async (booking) => {
        const invoiceCreate = await dispatch(actions.createInvoice({ garage_id: garageId, booking_id: booking.id, amount: 0, invoice_image: null }))

        if (invoiceCreate) {
            setBooking({
                ...booking,
                invoice: {
                    id: invoiceCreate?.id,
                    amount: invoiceCreate?.amount,
                    status: invoiceCreate?.status,
                    invoice_image: invoiceCreate?.invoice_image
                }
            })
            setIsInvoiceModalOpen(true)
        }
    };

    const handleViewInvoice = (booking) => {    // maybe here is invoiceId
        setBooking(booking)
        setIsInvoiceModalOpen(true)
    }

    const handleComplete = (bookingDetail) => {
        setBooking(bookingDetail)
        setIsInvoiceModalOpen(true)
    }

    const handleScheduleMaintenance = (booking) => {

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

    const renderButton = (status, bookingId, booking) => {
        if (status === 'request') {
            return (
                <div className='flex justify-end gap-2'>
                    <Button text={"Chấp nhận"} bgcolor={"bg-green-400"} textcolor={'text-white'} onClick={(e) => handleAcceptRequest(bookingId)} />
                    <Button text={"Từ chối"} bgcolor={"bg-red-400"} textcolor={'text-white'} onClick={(e) => handleChangeStatus(bookingId, "reject")} />
                </div>
            )
        } else if (status === "schedule") {
            return (
                <div className='flex justify-end gap-2'>
                    <Button
                        text={"Sửa chữa"}
                        bgcolor={"bg-green-400"}
                        textcolor={'text-white'}
                        onClick={(e) => {
                            const today = new Date();
                            const year = today.getFullYear();
                            const month = String(today.getMonth() + 1).padStart(2, '0'); 
                            const day = String(today.getDate()).padStart(2, '0');
                            if ((new Date(booking.booking_date.split("T")[0])).getTime() === (new Date(`${year}-${month}-${day}`)).getTime()) {
                                handleChangeStatus(bookingId, "in-progress")
                            }else {
                                message.error("Hôm nay không phải lịch hẹn")
                            }
                        }
                        }
                    />
                    <Button
                        text={"Hủy bỏ"}
                        bgcolor={"bg-red-400"}
                        textcolor={'text-white'}
                        onClick={(e) => {
                            handleChangeStatus(bookingId, "reject")
                        }} />
                </div>
            )
        } else if (status === "in-progress") {
            return (
                <div className='flex justify-end gap-2'>
                    {
                        booking?.invoice?.id === null
                            ?
                            (<>
                                <Button text={"Tạo hóa đơn"} bgcolor={"bg-gray-400"} textcolor={'text-white'} onClick={(e) => handleCreateInvoice(booking)} />
                            </>)
                            :
                            (<>
                                <Button text={"Hóa đơn"} bgcolor={"bg-blue-400"} textcolor={'text-white'} onClick={(e) => handleViewInvoice(booking)} />
                            </>)
                    }
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
                    {
                        booking?.invoice?.id !== null &&
                        (<>
                            <Button text={"Hóa đơn"} bgcolor={"bg-blue-400"} textcolor={'text-white'} onClick={(e) => handleViewInvoice(booking)} />
                        </>)
                    }
                    <Button text={"Lên lịch bảo dưỡng"} bgcolor={"bg-green-400"} textcolor={'text-white'} onClick={(e) => handleScheduleMaintenance(booking)} />
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
                    <Button text={"Xóa"} bgcolor={"bg-red-400"} textcolor={'text-white'} onClick={showConfirm} />
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
                <InvoiceModal isModalOpen={isInvoiceModalOpen} setIsModalOpen={setIsInvoiceModalOpen} booking={booking} socket={socket} />
                <AssignModal isModalOpen={isAssignModalOpen} setIsModalOpen={setIsAssignModalOpen} bookingId={bookingRequest} socket={socket} />
            </div>

            <div className='w-full h-fit flex flex-col items-center '>
                {
                    listBooking && listBooking.map((item, index) => {
                        return (
                            <div key={index} className='w-[95%] bg-white rounded-xl border-2 shadow-md px-4 py-2 mb-2'>
                                <div className='w-full flex gap-3 mb-1'>
                                    <div className='w-1/3'>
                                        <div className='flex items-center gap-2 mb-3'>
                                            <img src={item.customer.avatar || avatarDefault} alt='avatar' className='w-16 rounded-full bg-slate-200 p-1'></img>
                                            <div>
                                                <div className='text-xl font-bold'>
                                                    {item.customer.name}
                                                </div>
                                                <div className='flex gap-1 items-center'>
                                                    <MdOutlinePhone /> {item.customer?.phone}
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

                                <div className='w-full flex align-middle pt-2 border-t-2 border-gray-200'>
                                    {
                                        (item?.status === "complete" || (item?.status === "in-progress" && booking?.invoice?.id !== null)) && (
                                            <div className='flex'>
                                                <div className='font-bold mb-1 mr-1'>Số tiền:  </div>
                                                <div className='mr-2'>{item?.invoice?.amount} vnđ</div>
                                                <Tag color={item?.invoice?.status === "paid" ? "success" : "error"} className='h-fit' >{item?.invoice?.status}</Tag>
                                            </div>
                                        )
                                    }

                                    <div className='flex-1'>
                                        {renderButton(item.status, item.id, item)}
                                    </div>
                                </div>
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