import React from 'react'
import { Space, Table, Button, message, Popconfirm, Tag } from 'antd';
import { useSelector } from 'react-redux';
import icons from '../../../ultils/icons'

const { Column } = Table;
const { FiTrash2 } = icons
const BookingHistory = () => {

    const { customerBookingData } = useSelector(state => state.booking)
    

    const formateDate = (date) => {
        
    }

    const columns = [
        { title: "Garage", dataIndex: 'garage', key: 'garage',
            render: (garage) => {
                return (
                    <>{garage.garage_name}</>
                )
            }
        },
        { title: "Dịch vụ", dataIndex: "services", key: "services" },
        { title: "Mô tả", dataIndex: "description", key: "description" },
        { title: "Ngày đặt lịch", dataIndex: "booking_date", key: "booking_date" },
        { title: "Ô tô", dataIndex: "car", key: "car",
            render: (car) => {
                return (
                    <>{car.number_plate}</>
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
                        description="Are you sure to delete this car?"
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

    const confirmDelete = () => {

    }

    return (
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
    )
}
export default BookingHistory