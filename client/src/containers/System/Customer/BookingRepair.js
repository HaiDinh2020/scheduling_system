import { Button, Form, Input, Select, Space, Upload, message } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { apiUploadImages } from '../../../services/Garage/garage';
import * as actions from '../../../store/actions'
import icons from '../../../ultils/icons'
import { useLocation, useNavigate } from 'react-router-dom';

const { Option } = Select;
const { FaMapMarkerAlt } = icons

const BookingRepair = ({socket}) => {

    const dispatch = useDispatch();
    const navigate = useNavigate()
    const { cars } = useSelector(state => state.cars);
    const userId = useSelector(state => state.user?.userCurentProfile?.id)
    const [form] = Form.useForm();

    const [bookingImages, setBookingImage] = useState([]);
    const [carIndex, setCarIndex] = useState();
    const [exactAddress, setExactAddress] = useState('');
    const [pickupOption, setPickupOption] = useState();


    const uploadImage = async options => {
        const { onSuccess, onError, file } = options;

        const fmData = new FormData();

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

    const handleOk = async (value) => {
        const booking_images = bookingImages.map(pre => pre.url).join(", ");
        const finalData = {
            services: "sua_chua",
            booking_date: new Date(),
            booking_images: booking_images,
            car_id: cars[carIndex]?.id,
            description: value.description,
            address: value.address,
            exactAddress,
            pickupOption
        }
        console.log(finalData)

        const booking = await dispatch(actions.createBooking(finalData))
        // console.log(value)

        // gửi socket vs senderId, receiverId
        if (booking) {
            const socketBookingData = booking;
            socketBookingData.senderId = userId;
            socket?.emit("booking", socketBookingData)

            navigate("/customer/booking-history")
            
        }
    };

    const getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                console.log(position.coords)
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                const newLocation = `${latitude}, ${longitude}`;
                setExactAddress(newLocation);
            }, () => {
                message.error('Không thể lấy vị trí của bạn.');
            });
        } else {
            message.error('Trình duyệt của bạn không hỗ trợ định vị.');
        }
    };


    const handlePickupOptionChange = (value) => {
        setPickupOption(value);
    };


    return (
        <div className="bg-white rounded-md shadow-md p-6 max-w-lg mx-auto">

            <Form
                form={form}
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

                <Form.Item className=' items-center flex justify-center text-center m-3' name={"car_id"} rules={[{ required: true, message: "Please choose your car" }]} >
                    <Select placeholder="Chọn xe" style={{ minWidth: "130px" }} onSelect={(value) => { setCarIndex(value) }}>
                        {cars.length > 0 && cars.map((item, index) => {
                            return (
                                <Option key={index}>{item.number_plate}</Option>
                            )
                        })}
                    </Select>
                </Form.Item>

                <Space className='w-full mb-4'>
                    <div className='w-full  flex align-middle justify-between gap-4'>
                        <Input className='text-center' placeholder='Hãng xe' value={cars[carIndex]?.make} readOnly />
                        <span>-</span>
                        <Input className='text-center' placeholder='Dòng xe' value={cars[carIndex]?.model} readOnly />
                        <span>-</span>
                        <Input className='text-center' placeholder='Năm' value={cars[carIndex]?.year} readOnly />
                    </div>
                </Space>

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

                <Form.Item label="Chọn phương thức lấy xe">
                    <Select value={pickupOption} onChange={handlePickupOptionChange}>
                        <Option value="0">Garage tự đến lấy</Option>
                        <Option value="1">Khách hàng đưa đến</Option>
                    </Select>
                </Form.Item>

                <div>
                    <Form.Item
                        label="Địa chỉ"
                        name="address"
                        rules={[
                            {
                                required: true,
                                message: 'Nhập địa chỉ',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                </div>


                <Form.Item
                    label="Tọa độ"
                    name="coordinates"
                    rules={[
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (exactAddress || value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject('Lấy tọa độ');
                            },
                        }),
                    ]}
                >
                    <div className='flex border border-gray-300 rounded p-2 justify-between'>
                        {exactAddress && (
                            <a href={`https://maps.google.com/maps?`} target="_blank" rel="noopener noreferrer">
                                {exactAddress}
                            </a>
                        )}
                        <Button onClick={getLocation}><FaMapMarkerAlt /></Button>
                    </div>
                </Form.Item>

                <Form.Item
                    className=' flex justify-end mt-1'
                >
                    <Space>
                        <Button type="primary" htmlType="submit" >
                            Submit
                        </Button>
                    </Space>
                </Form.Item>
            </Form>
        </div>
    )
}

export default BookingRepair