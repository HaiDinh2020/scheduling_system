import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom'
import { path } from '../../../ultils/constants'
import { Header } from '../../Public'
import Sidebar from './Sidebar'
import Message from './Message'
import { apigetChatPartners } from '../../../services/message'
import { ToastContainer, toast } from 'react-toastify'

const chatUsers = [
  { name: "nguyen van a", avatar: "https://res.cloudinary.com/dmrsdkvzl/image/upload/v1713670240/datn/avatar/twa7biidowz8syuimo3s.jpg", recent_mes: { isYou: true, content: "Hello my mane is hello too   " } },
  { name: "nguyen van b", avatar: "https://res.cloudinary.com/dmrsdkvzl/image/upload/v1714177518/datn/avatar/ruy9m3bssyfckkimfhps.jpg", recent_mes: { isYou: false, content: "Hi there" } },
  { name: "nguyen van c", avatar: "https://res.cloudinary.com/dmrsdkvzl/image/upload/v1715608910/datn/avatar/jc7pys8dbhlmu0loyesy.png", recent_mes: { isYou: true, content: "How are you?" } },
  { name: "nguyen van d", avatar: "https://example.com/avatar4.jpg", recent_mes: { isYou: false, content: "I'm doing well, thanks!" } },
  { name: "nguyen van e", avatar: "https://example.com/avatar5.jpg", recent_mes: { isYou: true, content: "Nice to meet you! ice to meet you!    " } },
  { name: "nguyen van a", avatar: "https://res.cloudinary.com/dmrsdkvzl/image/upload/v1713670240/datn/avatar/twa7biidowz8syuimo3s.jpg", recent_mes: { isYou: true, content: "Hello my mane is hello too   " } },
  { name: "nguyen van b", avatar: "https://res.cloudinary.com/dmrsdkvzl/image/upload/v1714177518/datn/avatar/ruy9m3bssyfckkimfhps.jpg", recent_mes: { isYou: false, content: "Hi there" } },
  { name: "nguyen van c", avatar: "https://res.cloudinary.com/dmrsdkvzl/image/upload/v1715608910/datn/avatar/jc7pys8dbhlmu0loyesy.png", recent_mes: { isYou: true, content: "How are you?" } },
  { name: "nguyen van d", avatar: "https://example.com/avatar4.jpg", recent_mes: { isYou: false, content: "I'm doing well, thanks!" } },
  { name: "nguyen van e", avatar: "https://example.com/avatar5.jpg", recent_mes: { isYou: true, content: "Nice to meet you! ice to meet you!    " } },
  { name: "nguyen van a", avatar: "https://res.cloudinary.com/dmrsdkvzl/image/upload/v1713670240/datn/avatar/twa7biidowz8syuimo3s.jpg", recent_mes: { isYou: true, content: "Hello my mane is hello too   " } },
  { name: "nguyen van b", avatar: "https://res.cloudinary.com/dmrsdkvzl/image/upload/v1714177518/datn/avatar/ruy9m3bssyfckkimfhps.jpg", recent_mes: { isYou: false, content: "Hi there" } },
  { name: "nguyen van c", avatar: "https://res.cloudinary.com/dmrsdkvzl/image/upload/v1715608910/datn/avatar/jc7pys8dbhlmu0loyesy.png", recent_mes: { isYou: true, content: "How are you?" } },
  { name: "nguyen van d", avatar: "https://example.com/avatar4.jpg", recent_mes: { isYou: false, content: "I'm doing well, thanks!" } },
  { name: "nguyen van e", avatar: "https://example.com/avatar5.jpg", recent_mes: { isYou: true, content: "Nice to meet you! ice to meet you!    " } },
  { name: "nguyen van a", avatar: "https://res.cloudinary.com/dmrsdkvzl/image/upload/v1713670240/datn/avatar/twa7biidowz8syuimo3s.jpg", recent_mes: { isYou: true, content: "Hello my mane is hello too   " } },
  { name: "nguyen van b", avatar: "https://res.cloudinary.com/dmrsdkvzl/image/upload/v1714177518/datn/avatar/ruy9m3bssyfckkimfhps.jpg", recent_mes: { isYou: false, content: "Hi there" } },
  { name: "nguyen van c", avatar: "https://res.cloudinary.com/dmrsdkvzl/image/upload/v1715608910/datn/avatar/jc7pys8dbhlmu0loyesy.png", recent_mes: { isYou: true, content: "How are you?" } },
  { name: "nguyen van d", avatar: "https://example.com/avatar4.jpg", recent_mes: { isYou: false, content: "I'm doing well, thanks!" } },
  { name: "nguyen van e", avatar: "https://example.com/avatar5.jpg", recent_mes: { isYou: true, content: "Nice to meet you! ice to meet you!    " } }
]

const Chat = () => {

  const {state} = useLocation()
  const chatUser = state;


  const { isLoggedIn } = useSelector(state => state.auth)

  const [chatPartners, setChatPartners] = useState([])
  const [currentContent, setCurrentContent] = useState({});
  const [indexActive, setIndexActive] = useState(0)

  const handleMenuItemClick = (e) => {
    const key = e.key;
    setIndexActive(key)
    setCurrentContent(chatPartners[key]);
  };

  useEffect(() => {
    const getChatPartners = async () => {
      const response = await apigetChatPartners();
      if (response.data?.err === 0) {
        setChatPartners(response.data?.response)
      } else {
        toast(response.data?.msg)
      }
    }
    if (isLoggedIn) {
      getChatPartners()
    }
  }, [isLoggedIn]);

  useEffect(() => {
    // nếu có chat user (từ homepage click vào)
    if(chatUser) {
      // check xem có phải là người mới không
      const isNewChat =  chatPartners.find((user, index) => {
        if (user.id === chatUser?.id) {
          setIndexActive(index)
          return true;
        }
        return false;
      })
  
      // nếu là người mới
      if (!isNewChat) {
        setIndexActive(0)
        setChatPartners(pre => [chatUser, ...pre])
        setCurrentContent(chatUser)
      }
    } else {
      setCurrentContent(chatPartners[0])
    }
  }, [chatPartners, chatUser])

  useEffect(() => {
    setCurrentContent(chatPartners[indexActive])
  }, [chatPartners, indexActive])

  if (!isLoggedIn) return <Navigate to={`/${path.LOGIN}`} replace={true} />
  return (
    <div className='w-full h-screen flex flex-col items-center'>
      <ToastContainer />
      <div className='w-full' >
        <Header />
      </div>
      <div className='flex-1'>
        <div className='flex w-screen h-full border-t-2 gap-1 pt-2'  >
          <Sidebar onMenuItemClick={handleMenuItemClick} chatUsers={chatPartners} indexActive={indexActive} />
          <Message currentContent={currentContent} />
        </div>
      </div>
    </div>
  )
}

export default Chat