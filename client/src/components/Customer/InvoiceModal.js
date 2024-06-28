import React, { useEffect, useState } from 'react'
import {  Modal } from "antd";
import { apigetInvoiceDetail } from '../../services/Garage/invoice';
import ViewInvoice from './ViewInvoice';


const InvoiceModal = ({ isModalOpen, setIsModalOpen, booking, socket }) => {

   
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <Modal title={`Hóa đơn`} centered open={isModalOpen} onCancel={handleCancel} footer >

            <div>
                <ViewInvoice booking={booking} />
            </div>
        </Modal>
    )
}

export default InvoiceModal