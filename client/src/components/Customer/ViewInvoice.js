import React, { useEffect, useState } from "react";
import { Image, Space } from "antd";
import icons from '../../ultils/icons';
import { apigetInvoiceDetail } from "../../services/Garage/invoice";

const { FiDownload, FiZoomOut, FiZoomIn, FaCar, RxAvatar, FaCalendarAlt } = icons

const ViewInvoice = ({ booking }) => {

    const [invoiceDetails, setInvoiceDetails] = useState([])

    useEffect(() => {
        if (booking?.invoice?.id) {
            getInvoiceDetail(booking?.invoice?.id)
        }
    }, [booking])

    const getInvoiceDetail = async (invoiceId) => {
        const invoiceDts = await apigetInvoiceDetail(invoiceId)
        if (invoiceDts?.data?.err === 0) {
            setInvoiceDetails(invoiceDts?.data?.response)
        }
    }

    const renderBookingTime = (booking_date) => {
        const time = booking_date.split("T")[1].slice(0, 5)
        const day = booking_date.split("T")[0]
        return (
            <div className='flex gap-2 items-end'>
                <div>{day}</div>
                <div>{time}</div>
            </div>
        )
    }

    const onDownload = () => {
        fetch(booking?.invoice.invoice_image)
            .then((response) => response.blob())
            .then((blob) => {
                const url = URL.createObjectURL(new Blob([blob]));
                const link = document.createElement('a');
                link.href = url;
                link.download = 'image.png';
                document.body.appendChild(link);
                link.click();
                URL.revokeObjectURL(url);
                link.remove();
            });
    };

    return (
        <div >
            <div className='flex items-center gap-2 text-lg font-semibold mb-4'>
                <FaCar /> {booking?.car?.make}-{booking?.car?.model} {booking?.car?.number_plate}
            </div>
            <div className='flex items-center gap-2 text-lg font-semibold mb-3'>
                <FaCalendarAlt /> {renderBookingTime(booking?.booking_date  )}
            </div>
            <div className='flex items-center gap-4 font-semibold'>Bảng giá: </div>
            <div className='w-full mim-h-[80%] flex flex-col gap-2 items-center'>
                {invoiceDetails.length > 0 && invoiceDetails.map((invoice, index) => {
                    return (
                        <div
                            key={index}
                            className=' w-[80%]  px-4 pt-4 pb-1 bg-white shadow-lg rounded-lg'
                        >
                            <div className="w-full flex justify-between items-center">

                            <div className='text-black text-base m-2'>{invoice.item_description}</div>
                            <div>{invoice.quantity * invoice.unit_price} đ</div>
                            </div>
                            <div className="w-full flex justify-end text-sm font-light">{invoice.quantity} {invoice.unit}</div>
                        </div>
                    )
                })}
            </div>
            <div className='mt-4'>
                <div className='w-[50%] h-0.5 flex items-end bg-gray-400'></div>
                <div className='flex justify-between'>
                    <div>Tổng</div>
                    <div className='text-black text-lg'>
                        {booking?.invoice?.amount} đ
                    </div>
                </div>
            </div>
            <div className='w-[90%] h-0.5 flex items-end bg-gray-400 my-4'></div>
            <Image
                src={booking?.invoice.invoice_image}
                preview={{
                    toolbarRender: (
                        _,
                        {
                            transform: { scale },
                            actions: { onZoomOut, onZoomIn },
                        },
                    ) => (
                        <Space size={12} className="toolbar-wrapper">
                            <FiDownload onClick={onDownload} />
                            <FiZoomOut disabled={scale === 1} onClick={onZoomOut} />
                            <FiZoomIn disabled={scale === 25} onClick={onZoomIn} />
                        </Space>
                    ),
                }}
            />
        </div>
    )
}

export default ViewInvoice;