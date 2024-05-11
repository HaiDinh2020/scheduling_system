import { Button, DatePicker, Form, Input, Modal, Select, Space, TimePicker, Upload, message } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import React, { memo, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { apiUploadImages } from '../../../services/Garage/garage';
import * as actions from '../../../store/actions'

const { Option } = Select;


const BookingModal = ({ isModalOpen, setIsModalOpen, garageBooking }) => {

    const dispatch = useDispatch();

    const { cars } = useSelector(state => state.cars);

    const [bookingImages, setBookingImage] = useState([]);
    const [carIndex, setCarIndex] = useState();

    useEffect(() => {
        console.log(bookingImages)
    }, [bookingImages])


    const uploadImage = async options => {
        const { onSuccess, onError, file, onProgress } = options;

        const fmData = new FormData();
        const config = {
            headers: { "content-type": "multipart/form-data" },
            onUploadProgress: event => {
                const percent = Math.floor((event.loaded / event.total) * 100);
                // setProgress(percent);
                if (percent === 100) {
                    //   setTimeout(() => setProgress(0), 1000);
                }
                onProgress({ percent: (event.loaded / event.total) * 100 });
            }
        };
        fmData.append("file", file);
        fmData.append('upload_preset', process.env.REACT_APP_UPLOAD_IMAGES_NAME)
        try {
            const res = await apiUploadImages(fmData)

            onSuccess("Ok");
            setBookingImage(prev => [...prev, { uid: file.uid, url: res.data?.secure_url }]);

        } catch (err) {
            console.log("Eroor: ", err);
            onError({ err });
        }
    };

    const handleOk = (value) => {
        const booking_images = bookingImages.map(pre => pre.url).join(", ");
        const booking_date = value.booking_day.format("YYYY-MM-DD") + " " +  value.booking_time.format("HH:mm:ss");
        const finalData = {
            garage_id: garageBooking.id,
            services: value.services,
            booking_date: booking_date,
            booking_images: booking_images,
            car_id: cars[carIndex]?.id,
            description: value.description
        }
        console.log(finalData)
        dispatch(actions.createBooking(finalData))
        setIsModalOpen(false)
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    return (
        <div>
            <Modal title={`Booking: ${garageBooking?.garage_name}`} centered open={isModalOpen} onCancel={handleCancel} footer >
                <Form
                    labelCol={{
                        span: 5,
                    }}
                    labelWrap
                    wrapperCol={{
                        span: 17,
                    }}
                    layout="horizontal"
                    style={{
                        maxWidth: 600,
                    }}
                    variant='filled'
                    onFinish={handleOk}
                >
                    <Form.Item
                        name="services"
                        label="Dịch vụ"
                        rules={[{ required: true, message: 'Please select services!' }]}
                    >
                        <Select placeholder="Please select a services">
                            <Option value="sua_chua">Sửa chữa</Option>
                            <Option value="bao_duong">Bảo dưỡng</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item className=' items-center flex justify-center text-center m-3' name={"car_id"} rules={[{ required: true, message: "Please choose your car" }]} >
                        <Select placeholder="Chọn xe" style={{ minWidth: "130px" }} onSelect={(value) => { setCarIndex(value) }}>
                            {cars.length > 0 && cars.map((item, index) => {
                                return (
                                    <Option key={index}>{item.number_plate}</Option>
                                )
                            })}
                        </Select>
                    </Form.Item>

                    <Space className='w-full mb-2'>
                        <div className='w-full  flex align-middle justify-between gap-4'>
                            <Input className='text-center' placeholder='Hãng xe' value={cars[carIndex]?.make} readOnly />
                            <span>-</span>
                            <Input className='text-center' placeholder='Dòng xe' value={cars[carIndex]?.model} readOnly />
                            <span>-</span>
                            <Input className='text-center' placeholder='Năm' value={cars[carIndex]?.year} readOnly />
                        </div>
                    </Space>

                    <Form.Item
                        label="Chọn lịch"
                        required
                    >
                        <Space className='flex gap-2' align='baseline' >
                            <Form.Item
                                name="booking_time"
                                rules={[
                                    {
                                        required: true,
                                        message: "Vui lòng chọn giờ đặt lịch"
                                    }
                                ]}
                            >
                                <TimePicker />
                            </Form.Item>
                            <Form.Item
                                name="booking_day"
                                rules={[
                                    {
                                        required: true,
                                        message: "Vui lòng chọn ngày đặt lịch"
                                    }
                                ]}
                            >
                                <DatePicker />
                            </Form.Item>
                        </Space>
                    </Form.Item>
                    <Form.Item
                        label="Mô tả tình trạng"
                        name={"description"}
                        rules={[
                            {
                                required: true,
                                message: 'Nhập mô tả tình trạng'
                            }
                        ]}
                    >
                        <TextArea rows={4} />
                    </Form.Item>
                    <Form.Item label="Thêm ảnh">
                        <Upload
                            accept="image/*"
                            customRequest={uploadImage}
                            name='images'
                            listType="picture-card"
                            beforeUpload={(file) => {
                                const isPNG = file.type.startsWith('image/')
                                if (!isPNG) {
                                    message.error(`${file.name} is not a image file`);
                                }
                                return isPNG || Upload.LIST_IGNORE;
                            }}
                            onRemove={(file) => {
                                setBookingImage(prev => prev?.filter(item => item.uid !== file.uid));
                            }}
                        >
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
                        </Upload>
                    </Form.Item>
                    <Form.Item
                        className=' flex justify-end'
                    >
                        <Space>
                            <Button type='default' onClick={handleCancel}>
                                Cancel
                            </Button>
                            <Button type="primary" htmlType="submit" >
                                Submit
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}

export default BookingModal