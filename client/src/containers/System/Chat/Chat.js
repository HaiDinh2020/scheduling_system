import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom'
import { path } from '../../../ultils/constants'
import { Header } from '../../Public'
import Sidebar from './Sidebar'
import Message from './Message'
import { apigetChatPartners } from '../../../services/message'
import { ToastContainer, toast } from 'react-toastify'


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