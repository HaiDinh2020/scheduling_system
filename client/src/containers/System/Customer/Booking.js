import { Radio } from 'antd';
import React, { useState } from 'react'
import BookingMaintenance from './BookingMaintenance';
import BookingRepair from './BookingRepair';

const Booking = ({ socket }) => {

    const [serviceType, setServiceType] = useState('repair');
    const handleServiceChange = (e) => {
        setServiceType(e.target.value);
    };


    return (
        <div className="w-full p-2 ">
            <div className='text-xl font-bold'>Chọn dịch vụ</div>
            <Radio.Group defaultValue="repair" buttonStyle="solid" onChange={handleServiceChange}>
                <Radio.Button value="repair">Sửa chữa</Radio.Button>
                <Radio.Button value="maintenance">Bảo dưỡng</Radio.Button>
            </Radio.Group>

            <div>
                {serviceType === 'maintenance' ? <BookingMaintenance socket={socket} /> : <BookingRepair socket={socket} />}
            </div>
            
        </div>
    );

}

export default Booking