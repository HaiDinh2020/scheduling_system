import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify';
import { Form, Input, Popconfirm, Tag, message, Button as ButtonAntd, Table } from "antd";
import menuScheduleStatus from '../../../ultils/menuScheduleStatus';
import icons from '../../../ultils/icons';
import avatarDefault from '../../../asests/avatar_default.png'
import Button from '../../../components/Button'
import * as actions from '../../../store/actions'
import InvoiceModal from '../../../components/Garage/InvoiceModal';
import MaintenanceScheduleModal from '../../../components/Garage/MaintenanceScheduleModal';
import { useNavigate } from 'react-router-dom';
import { apiCheckMaintenanceSchedule } from '../../../services/Garage/maintenanceSchedule';

const { LuFlagTriangleRight, FcOvertime, MdOutlinePhone, FaMapMarkerAlt } = icons
const Schedule = ({ socket }) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const garageId = useSelector((state) => state.garage.garageInfor.id);
    const { garageBookingData } = useSelector((state) => state.booking);

    const [displayStatus, setDisplayStatus] = useState(menuScheduleStatus[0].status);
    const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false)
    const [isMaintenanceScheduleModalOpen, setIsMaintenanceScheduleModalOpen] = useState(false)
    // const [isAssignModalOpen, setIsAssignModalOpen] = useState(false)

    // const [bookingRequest, setBookingRequest] = useState({})
    const [booking, setBooking] = useState({})                              // booking sẽ hiển thị trên hóa đơn
    const [listBooking, setListBooking] = useState([])
    const [maintenances, setMaintenances] = useState([])                    // danh sách lịch bảo dưỡng hiển thị chỗ kiểm tra




    useEffect(() => {
        if (displayStatus !== "request") {
            dispatch(actions.getBookingStatus(garageId, displayStatus))
        } else {
            dispatch(actions.getBookingRequest(garageId))
        }
    }, [displayStatus])

    useEffect(() => {
        setListBooking(garageBookingData)
    }, [displayStatus, garageBookingData])

    const handleChangeStatus = (bookingId, newStatus) => {
        console.log("change status")
        dispatch(actions.updateBookingStatus(bookingId, newStatus))
    }

    const handleAcceptRequest = (bookingId, bookingGarageId) => {
        // setBookingRequest(bookingId)
        // setIsAssignModalOpen(true)
        console.log(bookingGarageId)
        if (bookingGarageId) {
            dispatch(actions.respondToBooking(bookingId, bookingGarageId, "accepted"))
        } else {
            message.error("something error")
        }
    }

    const handleRejectRequest = (bookingId, bookingGarageId) => {
        if (bookingGarageId) {
            dispatch(actions.respondToBooking(bookingId, bookingGarageId, "rejected"))
        } else {
            message.error("something error")
        }
    }

    const handleDeleteBookingMaintenance = (bookingId) => {
        if (bookingId) {
            dispatch(actions.garageDeleteBookingMaintenance(bookingId))
        } else {
            message.info("Something eror, please reload page")
        }
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
        setBooking(booking)
        setIsMaintenanceScheduleModalOpen(true)
    }

    const handleChat = (customer) => {
        navigate('/system/message', { state: { id: customer?.id, name: customer?.name, avatar: customer?.avatar } })
    }

    const checkMaintenance = async (values) => {
        console.log(values.number_plate)
        try {
            const response = await apiCheckMaintenanceSchedule(garageId, values.number_plate)
            if (response?.data?.err === 0) {
                setMaintenances(response?.data?.response)
                console.log(response?.data?.response)
            } else {
                setMaintenances([])
                message.error(response.data.msg)
            }
        } catch (error) {
            setMaintenances([])
            if (error.response) {
                message.error(error.response.data.msg || "Server error");
            } else if (error.request) {
                message.error("Network error");
            } else {
                message.error("Unexpected error");
            }
        }
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
                    <Button text={"Chấp nhận"} bgcolor={"bg-green-400"} textcolor={'text-white'} onClick={(e) => handleAcceptRequest(bookingId, booking?.booking_garage_id)} />
                    <Button text={"Từ chối"} bgcolor={"bg-red-400"} textcolor={'text-white'} onClick={(e) => handleRejectRequest(bookingId, booking?.booking_garage_id)} />
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
                            } else {
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
                            handleDeleteBookingMaintenance(bookingId)
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
                    {/* <Button
                        text={"Hủy bỏ"}
                        bgcolor={"bg-red-400"}
                        textcolor={'text-white'}
                        onClick={(e) => {

                            handleChangeStatus(bookingId, "reject")
                        }} /> */}
                </div>
            )
        } else if (status === "complete") {
            return (
                <div className='flex justify-end gap-2'>
                    {
                        booking?.maintenance?.id === null
                            ?
                            <Button text={"Lên lịch bảo dưỡng"} bgcolor={"bg-gray-400"} textcolor={'text-white'} onClick={(e) => handleScheduleMaintenance(booking)} />
                            :
                            <Button text={"lịch bảo dưỡng"} bgcolor={"bg-green-400"} textcolor={'text-white'} onClick={(e) => handleScheduleMaintenance(booking)} />
                    }
                    {
                        booking?.invoice?.id !== null &&
                        (<>
                            <Button text={"Hóa đơn"} bgcolor={"bg-blue-400"} textcolor={'text-white'} onClick={(e) => handleViewInvoice(booking)} />
                        </>)
                    }
                    {/*<Popconfirm
                        placement="topLeft"
                        title={"Xác nhận xóa lịch hẹn"}
                        description={"Lý do xóa"}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button text={"Xóa"} bgcolor={"bg-red-400"} textcolor={'text-white'} onClick={(e) => handleChangeStatus(bookingId, "reject")} />
                    </Popconfirm>*/}

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
                <MaintenanceScheduleModal isModalOpen={isMaintenanceScheduleModalOpen} setIsModalOpen={setIsMaintenanceScheduleModalOpen} booking={booking} />
                {/* <AssignModal isModalOpen={isAssignModalOpen} setIsModalOpen={setIsAssignModalOpen} bookingId={bookingRequest} socket={socket} /> */}
            </div>

            {
                displayStatus === "schedule" &&
                <div className='bg-white flex flex-col rounded-xl border-2 shadow-md w-[95%] px-4 pt-2 mb-2'>

                    <div className='font-bold text-lg mr-3'>Kiểm tra lịch hẹn</div>
                    <div className='flex items-center h-fit  justify-center'>
                        <Form
                            name="basic"
                            onFinish={checkMaintenance}
                            style={{
                                display: 'flex',
                                justifyContent: "center",
                                alignItems: 'center',
                                gap: "10px"
                            }}
                        >
                            <Form.Item name={"make"}>
                                <Input placeholder="Nhập hãng xe" />
                            </Form.Item>
                            <Form.Item name={"model"}>
                                <Input placeholder="Nhập dòng xe" />
                            </Form.Item>

                            <Form.Item name={"number_plate"}>
                                <Input placeholder="Nhập biển số" />
                            </Form.Item>

                            <Form.Item>
                                <ButtonAntd type='primary' htmlType='submit' >Kiểm tra</ButtonAntd>
                            </Form.Item>

                        </Form>
                    </div>
                    {
                        maintenances.length > 0 &&
                        <div>
                            <Table dataSource={maintenances} className='p-4' pagination={false}>
                                <Table.Column title="STT" key="index" render={(text, record, index) => index + 1} />
                                <Table.Column title="Lần sửa chữa trước" key="booking_date" dataIndex={"booking_date"} render={(booking_date) => {
                                    const time = booking_date.split("T")[1].slice(0, 5)
                                    const day = booking_date.split("T")[0]
                                    return (
                                        <>{day} {time}</>
                                    )
                                }} />
                                <Table.Column title="Thời gian bảo dưỡng" dataIndex={"maintenance"} key={"maintenance"} render={(maintenance) => (
                                    <>{maintenance?.maintenanceTime}</>
                                )} />
                                <Table.Column title="Ghi chú" dataIndex={"maintenance"} key={"maintenance"} render={(maintenance) => (
                                    <>{maintenance?.note}</>
                                )} />
                            </Table>
                        </div>
                    }
                </div>
            }

            <div className='w-full h-fit flex flex-col items-center '>
                {
                    listBooking && listBooking.map((item, index) => {
                        return (
                            <div key={index} className='w-[95%] bg-white rounded-xl border-2 shadow-md px-4 py-2 mb-2'>
                                <div className='w-full flex gap-3 mb-1'>
                                    <div className='w-1/3'>
                                        <div className='flex items-center gap-2 mb-3'>
                                            <img src={item.customer.avatar || avatarDefault} alt='avatar' className='w-16 h-16 object-cover rounded-full bg-slate-200 p-1'></img>
                                            <div>
                                                <div className='text-xl font-bold cursor-pointer' onClick={() => handleChat(item.customer)}>
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
                                                <LuFlagTriangleRight size={20} />
                                                <div className='text-lg font-normal'>{item.services}</div>
                                            </div>
                                            
                                            <div className='flex items-center gap-2'>
                                                <FaMapMarkerAlt size={20} />
                                                <div className='text-lg font-normal'>{item?.address}</div>
                                            </div>

                                            <div className='flex items-center gap-2'>
                                                <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
                                                    width="15.000000pt" height="15.000000pt" viewBox="0 0 200.000000 200.000000"
                                                    preserveAspectRatio="xMidYMid meet">

                                                    <g transform="translate(0.000000,200.000000) scale(0.100000,-0.100000)"
                                                        fill="#000000" stroke="none">
                                                        <path d="M1297 1582 c-26 -26 -47 -52 -47 -57 0 -5 26 -35 57 -67 l57 -58
                                                        -132 0 -132 0 0 -80 0 -80 132 0 132 0 -57 -58 c-31 -32 -57 -62 -57 -68 0
                                                        -13 93 -104 106 -104 5 0 72 62 147 138 121 123 137 142 137 172 0 30 -16 49
                                                        -137 172 -75 76 -142 138 -148 138 -6 0 -32 -22 -58 -48z"/>
                                                        <path d="M680 1544 c-63 -27 -91 -66 -190 -266 -129 -257 -132 -272 -128 -580
                                                        3 -221 4 -238 24 -264 45 -61 66 -69 192 -72 67 -2 132 1 153 7 46 14 96 69
                                                        105 116 l6 35 158 0 158 0 6 -35 c9 -47 59 -102 105 -116 21 -6 86 -9 153 -7
                                                        126 3 147 11 192 72 20 26 21 43 24 267 l3 239 -80 0 -81 0 0 -210 0 -210 -80
                                                        0 -80 0 0 80 0 80 -320 0 -320 0 0 -80 0 -80 -81 0 -81 0 4 234 3 234 102 206
                                                        103 206 125 0 125 0 0 80 0 80 -132 0 c-96 -1 -143 -5 -168 -16z"/>
                                                        <path d="M709 951 c-20 -20 -29 -39 -29 -61 0 -43 47 -90 90 -90 43 0 90 47
                                                        90 90 0 22 -9 41 -29 61 -40 39 -82 39 -122 0z"/>
                                                        <path d="M1169 951 c-20 -20 -29 -39 -29 -61 0 -43 47 -90 90 -90 43 0 90 47
                                                        90 90 0 22 -9 41 -29 61 -40 39 -82 39 -122 0z"/>
                                                    </g>
                                                </svg>
                                                <div className='text-sm font-normal'>{item?.pickupOption === "0" ? "Garage đến lấy xe" : "Khách hàng đưa xe đến"}</div>
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
                                            item.booking_images && <img src={item.booking_images} alt="booking_image" className=' max-h-36 w-[250] object-contain' />
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