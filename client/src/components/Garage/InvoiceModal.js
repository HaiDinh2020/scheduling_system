import React, { useEffect, useState } from 'react'
import { Button, Form, Input, InputNumber, Modal, Popconfirm, Space, Upload, message } from "antd";
import { toast } from 'react-toastify';
import { apiUploadImages } from '../../services/Garage/garage';
import { useDispatch, useSelector } from 'react-redux';
import { apiCreateInvoice, apiUpdateInvoice, apigetInvoiceDetail } from '../../services/Garage/invoice';
import * as actions from '../../store/actions';
import icons from '../../ultils/icons';
import InvoiceDetailModal from './InvoiceDetailModal';

const { AiOutlinePlusCircle, FaCar, RxAvatar } = icons

const InvoiceModal = ({ isModalOpen, setIsModalOpen, booking, socket }) => {

    const [form] = Form.useForm()

    const [initialValues, setInitialValues] = useState()
    const [invoiceDetailModalOpen, setInvoiceDetailMOdalOpen] = useState(false)
    const [invoiceDetails, setInvoiceDetails] = useState([])
    const [invoiceDetailSelect, setInvoiceDetailSelect] = useState(null)
    const [invoiceImages, setInvoiceImage] = useState([]);
    const [fileList, setFileList] = useState([])
    const [amount, setAmount] = useState(0)

    useEffect(() => {
        if (booking) {
            setInitialValues({
                customerName: booking?.customer?.name,
                phone: booking?.customer?.phone
            })
        }
    }, [booking])

    useEffect(() => {
        if (booking?.invoice?.id) {
            getInvoiceDetail(booking?.invoice?.id)
        }
        if (booking?.invoice?.invoice_image) {
            setFileList([
                {
                    uid: '-1',
                    name: 'image.png',
                    status: 'done',
                    url: booking?.invoice?.invoice_image,
                }
            ])
        }
    }, [booking])

    useEffect(() => {
        if (invoiceDetails.length > 0) {
            setAmount(invoiceDetails.reduce((total, invoice) => {
                return total + invoice.quantity * invoice.unit_price
            }, 0))
        } else {
            setAmount(0)
        }
    }, [invoiceDetails])

    const getInvoiceDetail = async (invoiceId) => {
        const invoiceDts = await apigetInvoiceDetail(invoiceId)
        if (invoiceDts?.data?.err === 0) {
            setInvoiceDetails(invoiceDts?.data?.response)
        } else {

        }
    }

    const uploadImage = async options => {
        const { onSuccess, onError, file } = options;

        const fmData = new FormData();

        fmData.append("file", file);
        fmData.append('upload_preset', process.env.REACT_APP_UPLOAD_IMAGES_NAME)
        try {
            const res = await apiUploadImages(fmData)

            onSuccess("Ok");
            setInvoiceImage(prev => [...prev, { uid: file.uid, url: res.data?.secure_url }]);

        } catch (err) {
            console.log("Eroor: ", err);
            onError({ err });
        }
    };



    const onFinish = async () => {
        try {
            const finalData = {}
            finalData["invoice_image"] = invoiceImages.map(pre => pre.url).join(", ") ||  booking?.invoice?.invoice_image;
            finalData["amount"] = amount

            const invoiceUpdate = await apiUpdateInvoice(booking?.invoice?.id, finalData)

            if (invoiceUpdate?.data?.err === 0) {
                message.success("Gửi hóa đơn thành công", 2)
                setIsModalOpen(false)
                // dispatch(actions.updateBookingStatus(booking.id, "complete"))
            } else {
                toast("Gủi hóa đơn thất bại", { type: 'error' })
            }
        } catch (error) {
            message.error("server error")
        }
    }

    const handleCreateInvoiceDetail = () => {
        setInvoiceDetailMOdalOpen(true)
        setInvoiceDetailSelect(null)
    }

    const handleViewInvoiceDetail = (invoiceDetail) => {
        setInvoiceDetailMOdalOpen(true)
        setInvoiceDetailSelect(invoiceDetail)
    }

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const onChangeFileList = ({ fileList: newFileList }) => {
        setFileList(newFileList);
    };

    return (
        <Modal title={`Hóa đơn`} centered open={isModalOpen} onCancel={handleCancel} footer >

            <div>
                <div className="container mx-auto mt-4 p-2 ">
                    <div className='flex items-center gap-2 text-lg font-semibold mb-3'>
                        <RxAvatar /> {booking?.customer?.name}
                    </div>
                    <div className='flex items-center gap-2 text-lg font-semibold mb-4'>
                        <FaCar /> {booking?.car?.make}-{booking?.car?.model} {booking?.car?.number_plate}
                    </div>
                    <div className='flex items-center gap-4 font-semibold'>Bảng giá: <AiOutlinePlusCircle onClick={() => handleCreateInvoiceDetail()} /></div>
                    <InvoiceDetailModal isModalOpen={invoiceDetailModalOpen} setIsModalOpen={setInvoiceDetailMOdalOpen} invoiceDetail={invoiceDetailSelect} invoiceId={booking?.invoice?.id} getInvoiceDetail={getInvoiceDetail} />
                    <div className='w-full mim-h-[80%] flex flex-col gap-2 items-center'>
                        {invoiceDetails.length > 0 && invoiceDetails.map((invoice, index) => {
                            return (
                                <div
                                    key={index}
                                    className='flex w-[80%] justify-between items-center p-4 cursor-pointer bg-white shadow-lg rounded-lg'
                                    onClick={() => handleViewInvoiceDetail(invoice)}
                                >
                                    <div className='text-black text-base m-2'>{invoice.item_description}</div>
                                    <div>{invoice.quantity * invoice.unit_price} đ</div>
                                </div>
                            )
                        })}
                    </div>

                    <div className='mt-4'>
                        <div className='w-[50%] h-0.5 flex items-end bg-gray-400'></div>
                        <div className='flex justify-between'>
                            <div>Tổng</div>
                            <div className='text-black text-lg'>
                                {amount} đ
                            </div>
                        </div>
                    </div>
                    <Form
                        form={form}
                        initialValues={initialValues}
                        layout="vertical"
                        onFinish={onFinish}
                    >
                        <Form.Item
                            label={<div className='font-semibold'><span className='text-red-400'>*</span> Ảnh hóa đơn: </div>}
                            rules={[{ required: true, message: 'Vui lòng thêm ảnh hóa đơn!' }]}
                        >
                            <Upload
                                customRequest={uploadImage}
                                name='image'
                                listType="picture-card"

                                fileList={fileList}
                                onChange={onChangeFileList}
                                beforeUpload={(file) => {
                                    const isPNG = file.type.startsWith('image/')
                                    if (!isPNG) {
                                        message.error(`${file.name} is not a image file`);
                                    }
                                    return isPNG || Upload.LIST_IGNORE;
                                }}
                                onRemove={(file) => {
                                    setInvoiceImage(prev => prev?.filter(item => item.uid !== file.uid));
                                }}
                            >
                                {
                                    // fileList.length < 1
                                    // &&
                                    <button
                                        style={{
                                            border: 0,
                                            background: 'none',
                                        }}
                                        type="button"
                                    >
                                        <div>+</div>
                                        <div
                                            style={{
                                                marginTop: 8,
                                            }}
                                        >
                                            Upload
                                        </div>
                                    </button>
                                }

                            </Upload>
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                Gửi Hóa Đơn
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </Modal>
    )
}

export default InvoiceModal