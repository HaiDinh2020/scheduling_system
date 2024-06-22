import React, { useEffect, useState } from 'react'
import { Space, Table, Button, message, Popconfirm, Tag } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../../store/actions'
import icons from '../../../ultils/icons'
import { apiGetPaymentUrl } from '../../../services/Customer/vnpay';
import PaymentModal from '../../../components/CustomerComponents/PaymentModal';
import { bookingStatusColors } from '../../../ultils/constants';

const { FiTrash2, FaMinus } = icons
const BookingHistory = () => {

    const dispatch = useDispatch();
    const { customerBookingData } = useSelector(state => state.booking)

    const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false)
    const [invoiceSelect, setInvoiceSelect] = useState({})
    const [currentBooking, setCurrentBooking] = useState([])
    const [historyBooking, setHistoryBooking] = useState([])

    useEffect(() => {
        dispatch(actions.getAllBookingCustomer())
    }, [])

    useEffect(() => {
        if (customerBookingData?.length > 0) {
            setCurrentBooking(customerBookingData.filter((booking) => booking.status === "request" || booking.status === "in-progress"))
            setHistoryBooking(customerBookingData.filter((booking) => booking.status !== "request" && booking.status !== "in-progress"))
        }
    }, [customerBookingData])

    const columns2 = [
        {
            title: "Garage", dataIndex: 'garage', key: 'garage',
            render: (garage) => {
                return (
                    <>{garage?.garage_name}</>
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
            render: (status) => {
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
                        record.status === "request"
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
                            record?.invoice?.amount !== 0 ?
                                record?.invoice?.status === "unpaid"
                                    ?

                                    <Button type="primary" size='small' className='bg-red-600' onClick={() => handlePayment(record?.invoice)}>
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
                    <>{garage?.garage_name}</>
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
            title: "Action",
            dataIndex: 'invoice',
            key: "invoice",
            align: 'center',
            render: (invoice, record) => {

                let color = '#FFD700';
                if (invoice.status === "paid") {
                    color = '#32CD32';
                } else if (invoice.status === "unpaid") {
                    color = '#6495ED';
                } else if (invoice.status === 'failed') {
                    color = '#FF6347';
                }
                return (

                    <Space className='items-center' size="large">

                        {
                            record.status === "complete" ?
                                invoice?.status === "unpaid"
                                    ?

                                    <Button type="primary" size='small' className='bg-red-600' onClick={() => handlePayment(invoice)}>
                                        Thanh toán ngay!
                                    </Button>


                                    :
                                    <Tag color={color} key={invoice.status}>{invoice.status}</Tag>
                                :
                                <><FaMinus color={color} /></>
                        }

                    </Space>
                )
            }
        },
    ]

    const confirmDelete = (booking) => {
        dispatch(actions.cancelBooking(booking.id))
    }

    const handlePayment = async (invoiceSelect) => {
        console.log(invoiceSelect)
        setInvoiceSelect(invoiceSelect)
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
            <PaymentModal isModalOpen={isPaymentModalOpen} setIsModalOpen={setIsPaymentModalOpen} invoice={invoiceSelect} />
            <div className='container flex flex-col items-center'>
                <div className='bg-white  rounded-xl border-2 shadow-md w-[95%] px-4 mb-2'>
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