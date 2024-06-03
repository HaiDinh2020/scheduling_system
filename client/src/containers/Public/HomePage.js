import React, { useEffect, useState } from 'react'
import { Button } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import BookingModal from '../System/Customer/BookingModal'
import { ToastContainer } from 'react-toastify'
import icons from '../../ultils/icons'

const { GrStar } = icons

const HomePage = ({socket}) => {

  const navigate = useNavigate()
  const { isLoggedIn } = useSelector(state => state.auth)
  const { post } = useSelector(state => state.post)

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [garageBooking, setGarageBooking] = useState({})

  const handleBooking = (garage) => {
    if (isLoggedIn) {
      setGarageBooking(garage)
      setIsModalOpen(true);
    } else {
      navigate("/login")
    }
  }

  const handleChat = (garage) => {
    if(isLoggedIn) {
      navigate('/system/message', {state: {id: garage?.owner_id, name: garage?.user.name, avatar: garage?.user.avatar}})
    } else {
      navigate("/login")
    }
  }

  const handleStar = (star) => {
    let stars = []
    for (let i = 1; i <= +star; i++) stars.push(<GrStar className='star-item' size={18} color='yellow' />)
    return stars

  }

  return (
    <div className=' w-full h-screen px-12 items-center flex flex-col'>
      <div>

      </div>
      <div className='w-full flex gap-3 mt-4'>
        <div className='w-2/3 min-w-[500px] bg-white rounded-xl border-2 shadow-md'>

          <BookingModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} garageBooking={garageBooking} socket={socket} />
          {
            post?.length > 0 && post?.map((item, index) => {
              const numImage = item.images?.split(", ").length
              
              return (
                <div key={index} className='border-y-2 flex px-2 py-2 '>
                  <div className='w-2/5 items-center flex flex-wrap cursor-pointer justify-center pr-2 py-2 '>
                    <Link
                      to={`garage-detail/${item.id}`}
                      className='w-full h-full relative min-h-[220px]'
                    >
                      <img
                        src={item.images?.split(", ")[0] || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKpdWy0joRrjpn4LFO56X7JfZFcrqk5d-wRA&usqp=CAU'}
                        alt='image_garage'
                        className='object-cover w-full h-full '

                      />
                      <span className=' bg-gray-600 bg-opacity-50 text-white px-2 rounded-md absolute left-1 bottom-2'>{numImage || 0} ảnh</span>
                    </Link>
                  </div>
                  <div className='w-3/5'>
                    <div className='flex flex-col h-full pt-1'>
                      <Link
                        to={`garage-detail/${item.id}`}
                      >
                        <div className=' text-red-600 font-bold line-clamp-2 mb-1'>
                          <div className='flex'>
                            {handleStar(5).length > 0 && handleStar(+5).map((star, number) => {
                              return (
                                <span key={number}>{star}</span>
                              )
                            })}
                          </div>
                          {item.garage_name}
                        </div>
                      </Link>
                      <div className='mb-1 text-sm w-full flex justify-end'>
                        {item.address}
                      </div>
                      <div className='line-clamp-4 text-gray-500 w-full min-h-[50px] text-ellipsis overflow-hidden'>
                        {item.introduce}
                      </div>

                      <div className='flex items-center my-5 justify-between'>
                        <div className=' flex items-center gap-2'>
                          <img src={item.user?.avatar || "https://buffer.com/library/content/images/2023/10/free-images.jpg"} alt="avatar" className='w-[30px] h-[30px] object-cover rounded-full' />
                          <p>{item.user?.name}</p>
                        </div>
                        <div className='flex items-center gap-1'>

                          <Button size='small' type="default" onClick={() => handleChat(item)} >nhắn tin</Button>
                          <Button size='small' type="primary" onClick={() => handleBooking(item)} >Đặt lịch</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })
          }

          {/* <div className='border-y-2 flex px-2 py-2 '>
            <div className='w-2/5 items-center flex flex-wrap cursor-pointer justify-center pr-2 py-2 '>
              <Link
                to={"#"}
                className='w-full h-full relative'
              >
                <img
                  src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKpdWy0joRrjpn4LFO56X7JfZFcrqk5d-wRA&usqp=CAU'
                  alt='image_garage'
                  className='object-cover w-full h-full '

                />
                <span className=' bg-gray-600 bg-opacity-50 text-white px-2 rounded-md absolute left-1 bottom-2'>11 ảnh</span>
              </Link>
            </div>
            <div className='w-3/5'>
              <div className=''>
                <div className='text-red-600 font-bold line-clamp-2 mb-1'>
                  <span className='text-yellow-500 flex items-center'>
                    <span className='inline'><GrStar /></span>
                    <span>star</span>
                    <span>star</span>
                  </span>
                  <span>Garage Vua Hai Tac PHÒNG TRỌ MỚI RẤT ĐẸP SỐ 373/1/2A ĐƯỜNG LÝ THƯỜNG KIỆT, QUẬN TÂN BÌNH…</span>
                </div>
                <div className='mb-1 text-sm w-full flex justify-end'>
                  Quận Tân Bình, Hồ Chí Minh
                </div>
                <div className='line-clamp-4 text-gray-500 w-full min-h-[50px] text-ellipsis overflow-hidden'>
                  Garage & Co. Workshop is not open to the public so drop in’s are not possible.
                  We do this to ensure maximum security over any vehicles on site.
                  Access to our workshop is via a successful membership application process.
                  Before we get to that we would love to hear from you ,so please contact us by phone, email or through any of our social media channels.
                </div>

                <div className='flex items-center my-5 justify-between'>
                  <div className=' flex items-center gap-2'>
                    <img src="https://buffer.com/library/content/images/2023/10/free-images.jpg" alt="avatar" className='w-[30px] h-[30px] object-cover rounded-full' />
                    <p>Dai Huu Hinh</p>
                  </div>
                  <div className='flex items-center gap-1'>
                    <Button size='small' type="default" onClick={() => console.log("nhắn tin")} >nhắn tin</Button>
                    <Button size='small' type="primary" onClick={({ item }) => handleBooking({ item })} >Đặt lịch</Button>
                  </div>
                </div>
              </div>
            </div>
          </div> */}


        </div>
        <div className='w-1/3 bg-white rounded-xl border-2 shadow-md'>
          <div></div>
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}

export default HomePage