import React, { useEffect, useState } from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Button, Form, Input, Modal, message, notification } from 'antd';
import { useSelector } from 'react-redux';
import { apiCreateAppointment, apiGetAppointment } from '../../../services/Engineer/appointment';

const localizer = momentLocalizer(moment)

const ViewTask = () => {

    

    return (
        <div className='container flex flex-col items-center'>
            <div className='bg-white rounded-xl border-2 shadow-md w-[95%] px-4 py-4'>
            View task
            </div>
        </div>
    )
}

export default ViewTask