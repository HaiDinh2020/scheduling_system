import React, { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation } from 'swiper/modules';
import { Avatar, Button } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import BookingModal from '../System/Customer/BookingModal';
import { ToastContainer } from 'react-toastify';

const DetailGarage = ({socket}) => {
    const navigate = useNavigate()
    const { garageId } = useParams();
    const { isLoggedIn } = useSelector(state => state.auth)
    const postData = useSelector(state => state.post.post.find(item => item.id === garageId));

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [garageBooking, setGarageBooking] = useState({})

    const imageList = postData?.images?.split(", ") || []

    const services = ["Sửa chữa", "Bảo dưỡng", "Phụ tùng", "Cứu hộ", "Dạy lái xe"]

    const renderListImage = (imageList) => {
        return (
            <div className='w-[600px] h-[300px]  '>
                <Swiper
                    loop={true}
                    slidesPerView={1}
                    pagination={true}
                    navigation={{
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                    }}
                    modules={[Navigation, Pagination]}
                >
                    {
                        imageList.length > 0 && imageList.map((item, index) => {
                            return (
                                <SwiperSlide key={index} className="flex justify-center items-center">
                                    <img src={item} alt='garage_img' className='w-[600px] h-[300px] object-cover'></img>
                                </SwiperSlide>
                            )
                        })
                    }
                    <div className="swiper-button-prev" style={{ color: 'white', backgroundColor: 'grey', fontSize: '10px', top: '50%' }}></div>
                    <div className="swiper-button-next" style={{ color: 'white', backgroundColor: 'grey', fontSize: '10px', top: '50%' }}></div>
                </Swiper>
            </div>
        )
    }

    const renderServices = (services) => {
        return (
            <div className='w-[600px] h-[300px]  '>
                <Swiper
                    loop={true}
                    slidesPerView={1}
                    pagination={{ type: 'fraction', }}
                    navigation={{
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                    }}
                    modules={[Navigation, Pagination]}
                >
                    {
                        imageList.length > 0 && imageList.map((item, index) => {
                            return (
                                <SwiperSlide key={index} className="flex justify-center items-center">
                                    <img src={item} alt='garage_img' className='w-[600px] h-[300px] object-cover'></img>
                                </SwiperSlide>
                            )
                        })
                    }
                    <div className="swiper-button-prev" style={{ color: 'white', backgroundColor: 'grey', fontSize: '10px', top: '50%' }}></div>
                    <div className="swiper-button-next" style={{ color: 'white', backgroundColor: 'grey', fontSize: '10px', top: '50%' }}></div>
                </Swiper>
            </div>
        )
    }

    const handleBooking = (garage) => {
        if (isLoggedIn) {
            setGarageBooking(garage)
            setIsModalOpen(true);
        } else {
            navigate("/login")
        }
    }

    const handleChat = (garage) => {
        if (isLoggedIn) {
            navigate('/system/message', { state: { id: garage?.owner_id, name: garage?.user.name, avatar: garage?.user.avatar } })
        }
    }

    return (
        <div className='h-auto w-full mt-2'>
            <div className='w-full flex gap-2'>
                <div className='w-2/3 min-w-[500px] h-fit bg-white rounded-xl border-1 shadow-md p-2 ml-6'>
                    <div className='flex items-center justify-center gap-2'>
                        {renderListImage(imageList)}
                    </div>
                    <div className='mt-4 text-2xl font-bold text-red-500'>{postData.garage_name}</div>
                    <div className='text-sm font-thin mt-1'>
                        Link website: <a href={`https://${postData.website}.com`} className="text-blue-500 underline">https://{postData.website}.com</a>
                    </div>

                </div>
                <div className='w-1/3 bg-white rounded-xl border-2 shadow-md mr-6 flex flex-col items-center justify-center'>
                    <div className='flex flex-col items-center justify-center'>
                        <Avatar src={postData.user?.avatar} shape='circle' size={80} />
                        <div className='mt-2 font-bold text-xl'>{postData.user.name}</div>
                    </div>
                    <BookingModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} garageBooking={garageBooking} socket={socket} />
                    <div className='flex items-center gap-1 mt-3'>
                        <Button size='large' type="default" onClick={() => handleChat(postData)} >nhắn tin</Button>
                        <Button size='large' type="primary" onClick={() => handleBooking(postData)} >Đặt lịch</Button>
                    </div>
                </div>
            </div>
            <div className=' mt-4 bg-white rounded-xl border-1 shadow-md mx-6 p-2'>
                <div>
                    <div className='text-xl font-bold'>
                        Danh mục dịch vụ
                    </div>
                    <div >

                    </div>
                </div>
            </div>
            <div className=' mt-4 bg-white rounded-xl border-1 shadow-md mx-6 p-2'>
                <div>
                    <div className='text-xl font-bold'>
                        Giới thiệu
                    </div>
                    <div>
                        {postData.introduce}
                    </div>
                </div>
                <div>
                    <div className='text-xl font-bold'>
                        Giờ làm việc
                    </div>
                    <div>
                        {postData.business_hours}
                    </div>
                </div>
                <div>
                    <div className='text-xl font-bold'>
                        Địa chỉ
                    </div>
                    <div>{postData.address}</div>
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}

export default DetailGarage