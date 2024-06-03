import React, { useEffect, useState } from 'react'
import { Space, Table, Button, message, Popconfirm, Tag } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../../store/actions'
import icons from '../../../ultils/icons'
import { apiGetPaymentUrl } from '../../../services/Customer/vnpay';
import PaymentModal from '../../../components/CustomerComponents/PaymentModal';

const { FiTrash2, FaMinus } = icons
const BookingHistory = () => {

    const dispatch = useDispatch();
    const { customerBookingData } = useSelector(state => state.booking)

    const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false)
    const [invoiceSelect, setInvoiceSelect] = useState({})

    const recentBooking = [{
        "id": "7b15c2a4-b64c-4175-b34c-f05fedf33227",
        "status": "request",
        "services": "sua_chua",
        "description": "thay kinh",
        "booking_images": "",
        "booking_date": "2024-06-01T15:19:04.000Z",
        "car": {
            "make": "Toyota",
            "model": "Camry Solara",
            "number_plate": "37D2 - 32221"
        },
        "garage": {
            "garage_name": null,
            "garageAddress": "Thanh Nhan - HBT",
            "exactAddress": "21.063275, 105.788383"
        },
        "customer": {
            "name": "Jack Jack",
            "phone": "0347654312",
            "avatar": "https://res.cloudinary.com/dmrsdkvzl/image/upload/v1716103993/datn/avatar/awflaxgf1zp2bxmtmfjq.png"
        }
    }]

    useEffect(() => {
        console.log(customerBookingData[0])
        dispatch(actions.getAllBookingCustomer())
    }, [])


    const formateDate = (date) => {

    }
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
            title: "ĐƯờng Đi", dataIndex: 'garage', key: 'way',
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
                let color = '#FFD700';
                if (status === "complete") {
                    color = '#32CD32';
                } else if (status === "in-progress") {
                    color = '#6495ED';
                } else if (status === 'reject') {
                    color = '#FF6347';
                }
                return (
                    <span>
                        <Tag color={color} key={status}>{status}</Tag>
                    </span>
                );
            }
        },
        {
            title: "Action",
            key: "action",
            align: 'center',
            render: (_, record) => (
                <Space className='items-center' size="large">
                    <Popconfirm
                        title="Delete"
                        description="Are you sure to delete this schedule?"
                        onConfirm={() => confirmDelete(record)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <div className='cursor-pointer'  ><FiTrash2 color='red' /></div>
                    </Popconfirm>
                </Space>
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
                let color = '#FFD700';
                if (status === "complete") {
                    color = '#32CD32';
                } else if (status === "in-progress") {
                    color = '#6495ED';
                } else if (status === 'reject') {
                    color = '#FF6347';
                }
                return (
                    <span>
                        <Tag color={color} key={status}>{status}</Tag>
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
                } else if (invoice.status === "pending") {
                    color = '#6495ED';
                } else if (invoice.status === 'failed') {
                    color = '#FF6347';
                }
                return (

                    <Space className='items-center' size="large">

                        {
                            record.status === "complete" ?
                                invoice?.status === "pending"
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

    const confirmDelete = () => {

    }

    const handlePayment = async (invoiceSelect) => {
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
                            dataSource={recentBooking}
                        />
                    </div>
                </div>
                <PaymentModal isModalOpen={isPaymentModalOpen} setIsModalOpen={setIsPaymentModalOpen} invoice={invoiceSelect} />
            </div>
            <div className='container flex flex-col items-center'>
                <div className='bg-white  rounded-xl border-2 shadow-md w-[95%] px-4 mb-2'>
                    <div className=' w-full pt-2'>
                        <Table
                            className='w-full'
                            columns={columns}
                            dataSource={customerBookingData}
                            pagination={{ pageSize: 7 }}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
export default BookingHistory