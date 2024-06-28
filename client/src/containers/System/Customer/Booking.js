import { Image, Radio } from 'antd';
import React, { useState } from 'react'
import BookingMaintenance from './BookingMaintenance';
import BookingRepair from './BookingRepair';
import { useNavigate } from 'react-router-dom';

const Booking = ({ socket }) => {

    const navigate = useNavigate()


    return (
        <div className="w-full p-2 ">

            <div className='flex flex-col justify-center items-center gap-4' >
                <div
                    onClick={() => { navigate("/services/repair") }}
                    className='w-fit min-w-[40%] p-4 cursor-pointer flex items-center gap-3 bg-white rounded-xl border-2 shadow-md'
                >
                    <img src='https://p.kindpng.com/picc/s/280-2806438_car-repair-png-transparent-png.png' alt='image_repair' className='rounded-full w-20 h-20' />
                    <div>
                        <div className='text-lg font-bold'>Sửa chữa</div>
                        <div>Dịch vụ dành cho xe đang cần sửa chữa ngay</div>
                    </div>

                </div>

                <div
                    onClick={() => { navigate("/services/maintenance") }}
                    className='w-fit min-w-[40%] p-4 cursor-pointer flex items-center gap-3 bg-white rounded-xl border-2 shadow-md'
                >
                    <img color='red' src='https://png.pngtree.com/png-clipart/20210307/ourmid/pngtree-car-repair-service-vignette-png-image_3014260.jpg' alt='image_maintain' className='rounded-full w-20 h-20 bg-yellow-400' />
                    <div>
                        <div className='text-lg font-bold'>Bảo dưỡng</div>
                        <div>Dịch vụ dành cho xe đã sửa chữa trên hệ thống</div>
                    </div>

                </div>
            </div>

        </div>
    );

}

export default Booking