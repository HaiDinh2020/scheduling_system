import React, { useEffect, useState } from 'react'
import { Space, Table, Button, message, Popconfirm, Tag, Modal } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../../store/actions'
import icons from '../../../ultils/icons'
import { apiGetPaymentUrl } from '../../../services/Customer/vnpay';
import PaymentModal from '../../../components/Customer/PaymentModal';
import { bookingStatusColors } from '../../../ultils/constants';
import InvoiceModal from '../../../components/Customer/InvoiceModal';
import { useNavigate } from 'react-router-dom';
import MaintenanceScheduleModal from '../../../components/Customer/MaintenanceScheduleModal';

const { FiTrash2, FaMinus, FaFileInvoiceDollar, IoChatboxEllipsesOutline } = icons
const BookingHistory = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate()
    const { customerBookingData } = useSelector(state => state.booking)

    const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false)
    const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false)
    const [isModalMaintenanceScheOpen, setIsMaintenanceScheduleModalOpen] = useState(false)
    const [bookingSelect, setBookingSelect] = useState({})
    const [currentBooking, setCurrentBooking] = useState([])
    const [historyBooking, setHistoryBooking] = useState([])

    useEffect(() => {
        dispatch(actions.getAllBookingCustomer())
    }, [])

    useEffect(() => {
        if (customerBookingData?.length > 0) {
            setCurrentBooking(customerBookingData.filter((booking) => booking.status === "request" || booking.status === "in-progress" || booking.status === "schedule"))
            setHistoryBooking(customerBookingData.filter((booking) => booking.status !== "request" && booking.status !== "in-progress" && booking.status !== "schedule"))
        }
    }, [customerBookingData])

    const handleChat = (garage) => {
        navigate('/system/message', { state: { id: garage?.owner_id, name: garage?.user.name, avatar: garage?.user.avatar } })
    }

    const columns2 = [
        {
            title: "Garage", dataIndex: 'garage', key: 'garage',
            render: (garage) => {
                return (
                    <div >
                        {
                            garage?.garage_name &&
                            <div>
                                {garage?.garage_name} <IoChatboxEllipsesOutline className='cursor-pointer' onClick={() => handleChat(garage)} size={20} />
                            </div>
                        }

                    </div>
                )
            }
        },
        {
            title: "Địa chỉ", dataIndex: 'garage', key: 'way',
            render: (garage) => {
                const lat = garage?.exactAddress?.split(", ")[0]
                const long = garage?.exactAddress?.split(", ")[1]
                return (
                    <a href={`https://www.google.com/maps?q=${lat},${long}`}>{garage?.garageAddress}</a>
                )
            }
        },
        { title: "Dịch vụ", dataIndex: "services", key: "services" },
        { title: "Mô tả", dataIndex: "description", key: "description" },
        {
            title: "Ngày đặt lịch",
            dataIndex: "booking_date",
            key: "booking_date",
            sortDirections: 'ascend',
            sorter: (a, b) => new Date(a.booking_date).getTime() - new Date(b.booking_date).getTime(),
            render: (booking_date) => {
                return (
                    <>{new Date(booking_date).toLocaleDateString()}</>
                );
            }
        },
        {
            title: "Ô tô", dataIndex: "car", key: "car",
            render: (car) => {
                return (
                    <>{car?.number_plate}</>
                )
            }
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            render: (status, record) => {
                return (
                    <span>
                        <Tag color={bookingStatusColors[status]} key={status}>{status}</Tag>
                    </span>
                );
            }
        },
        {
            title: "Action",
            key: "action",
            align: 'center',
            render: (_, record) => (
                <div>
                    {
                        record.status === "request" || record.status === "schedule"
                            ?
                            <Space className='items-center' size="large">
                                <Popconfirm
                                    title="Delete"
                                    description="Xác nhận hủy lịch đặt?"
                                    onConfirm={() => confirmDelete(record)}
                                    okText="Yes"
                                    cancelText="No"
                                >
                                    <div className='cursor-pointer'  ><FiTrash2 color='red' /></div>
                                </Popconfirm>
                            </Space>
                            :
                            record?.invoice?.amount !== "0.00" ?
                                record?.invoice?.status === "unpaid"
                                    ?

                                    <Button type="primary" size='small' className='bg-red-600' onClick={() => handlePayment(record)}>
                                        Thanh toán ngay!
                                    </Button>


                                    :
                                    <Tag color={"#32CD32"} key={record?.invoice?.status}>{record?.invoice?.status}</Tag>
                                : <><FaMinus color={"yellow"} /></>
                    }
                </div>
            )
        },
    ]

    const columns = [
        {
            title: "Garage", dataIndex: 'garage', key: 'garage',
            render: (garage) => {
                return (
                    <div >
                        {
                            garage?.garage_name &&
                            <div>
                                {garage?.garage_name} <IoChatboxEllipsesOutline className='cursor-pointer' onClick={() => handleChat(garage)} size={20} />
                            </div>
                        }

                    </div>
                )
            }
        },
        { title: "Dịch vụ", dataIndex: "services", key: "services" },
        { title: "Mô tả", dataIndex: "description", key: "description", width: 200 },
        {
            title: "Ngày đặt lịch",
            dataIndex: "booking_date",
            key: "booking_date",
            sortDirections: 'ascend',
            sorter: (a, b) => new Date(a.booking_date).getTime() - new Date(b.booking_date).getTime(),
            render: (booking_date) => {
                return (
                    <>{new Date(booking_date).toLocaleDateString()}</>
                );
            }
        },
        {
            title: "Ô tô", dataIndex: "car", key: "car",
            render: (car) => {
                return (
                    <>{car?.number_plate}</>
                )
            }
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            render: (status) => {
                return (
                    <span>
                        <Tag color={bookingStatusColors[status]} key={status}>{status}</Tag>
                    </span>
                );
            }
        },
        {
            title: "Hóa đơn",
            dataIndex: 'invoice',
            key: 'invoice',
            render: (invoice, booking) => {
                return (
                    <div className=' flex justify-center items-center cursor-pointer' >

                        {
                            invoice?.status === "paid" &&
                            <><FaFileInvoiceDollar color={"green"} size={20} onClick={() => handleViewInvoice(booking)} /></>
                        }
                    </div>
                )
            }
        },
        {
            title: "Lịch bảo dưỡng",
            dataIndex: 'maintenance',
            key: 'maintenance',
            render: (maintenance, booking) => {
                return (
                    <div>
                        {
                            maintenance?.id !== null &&
                            <Button
                                type="primary"
                                size='small'
                                onClick={() => {
                                    setBookingSelect(booking)
                                    setIsMaintenanceScheduleModalOpen(true)
                                }}
                            >
                                Xem
                            </Button>

                        }
                    </div>
                )
            }
        }
    ]

    const confirmDelete = (booking) => {
        dispatch(actions.cancelBooking(booking.id))
    }

    const handleViewInvoice = (booking) => {
        setBookingSelect(booking)
        setIsInvoiceModalOpen(true)
    }

    const handlePayment = (booking) => {
        setBookingSelect(booking)
        setIsPaymentModalOpen(true)
    }


    return (
        <div>
            <div className='container flex flex-col items-center'>
                <div className='bg-white  rounded-xl border-2 shadow-md w-[95%] px-4 mb-2'>
                    <div className='font-bold text-lg'>Lịch đặt hiện tại</div>
                    <div className=' w-full pt-2'>
                        <Table
                            className='w-full'
                            columns={columns2}
                            dataSource={currentBooking}
                            pagination={{ pageSize: 5 }}
                        />
                    </div>
                </div>
            </div>
            <InvoiceModal isModalOpen={isInvoiceModalOpen} setIsModalOpen={setIsInvoiceModalOpen} booking={bookingSelect} />
            <PaymentModal isModalOpen={isPaymentModalOpen} setIsModalOpen={setIsPaymentModalOpen} booking={bookingSelect} />
            <MaintenanceScheduleModal isModalOpen={isModalMaintenanceScheOpen} setIsModalOpen={setIsMaintenanceScheduleModalOpen} booking={bookingSelect} />
            <div className='container flex flex-col items-center'>
                <div className='bg-white  rounded-xl border-2 shadow-md w-[95%] px-4 mb-2'>
                    <div className='font-bold text-lg'>Lịch sử đặt lịch</div>
                    <div className=' w-full pt-2'>
                        <Table
                            className='w-full'
                            columns={columns}
                            dataSource={historyBooking}
                            pagination={{ pageSize: 10 }}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
export default BookingHistory