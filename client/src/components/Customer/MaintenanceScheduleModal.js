import React, { useEffect, useState } from 'react'
import { Modal } from "antd";


const MaintenanceScheduleModal = ({ isModalOpen, setIsModalOpen, booking }) => {

    console.log(booking)
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <Modal title={`Lịch bảo dưỡng`} centered open={isModalOpen} onCancel={handleCancel} onOk={handleCancel} >
            <div className='p-3'>
                <div className='flex gap-2 items-center'>
                    <div  className='font-semibold text-lg'>Thời gian: </div>
                    <div className='text-base text-black'>{booking?.maintenance?.maintenanceTime}</div>
                </div>
                <div className='flex gap-2 items-center'>
                    <div  className='font-semibold text-lg'>Chú thích: </div>
                    <div className='text-base text-black'>{booking?.maintenance?.note}</div>
                </div>                
            </div>
        </Modal>
    )
}

export default MaintenanceScheduleModal