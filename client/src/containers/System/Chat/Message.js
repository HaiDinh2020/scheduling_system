import React, { useEffect, useRef, useState } from 'react'
import { Avatar, Button, Form, Input, Layout, List } from 'antd';
import icons from '../../../ultils/icons';
import { apiCreateMessage, apiGetMessagesBetweenUsers } from '../../../services/message';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import socketIOClient from "socket.io-client";

const URL = process.env.NODE_ENV === 'production' ? undefined : 'http://localhost:5000/';

const { Content } = Layout

const { FiSend, PiInfoDuotone } = icons


// currentContent là name, avatar của người đang chat
const Message = ({ currentContent }) => {

  const [form] = Form.useForm();
  const userId = useSelector(state => state.user?.userCurentProfile?.id)
  const messagesEnd = useRef();
  const socketRef = useRef();

  const [contentChat, setContentChat] = useState([])              // nội dung chat giữa 2 user
  const [currentChat, setCurrrentChat] = useState(currentContent)
  const [messageReceive, setMessageReceive] = useState()
  const [socketId, setSocketId] = useState();

  const scrollToBottom = () => {
    messagesEnd.current.scrollIntoView({ behavior: "smooth" })
  }


  const renderMess = contentChat.map((m, index) =>
    <div key={index} className='w-fit' style={{ alignSelf: userId === m.sender_id ? 'end' : '' }}>
      <div className="bg-green-300 p-2 rounded-lg">
        {m.content}
      </div>
    </div >
  )


  const handleSend = async (values) => {

    const dataSend = {
      receiver_id: currentContent.id,
      content: values.content
    }

    const dataChatSocket = {
      socketId,
      receiver_id: currentContent.id,
      content: values.content,
      timeStamp: new Date(),
      sender_id: userId,
    }

    socketRef.current.emit("chat", dataChatSocket)

    const response = await apiCreateMessage(dataSend)
    if (response?.data.err !== 0) {
      toast(response?.data.msg)
    }
    form.setFieldsValue({ content: '' });
  }

  // call api to get data of convesation
  useEffect(() => {
    const getMessagesBetweenUsers = async () => {
      const response = await apiGetMessagesBetweenUsers(currentContent?.id)
      if (response.data?.err === 0) {
        setContentChat(response.data?.response)
      } else {
        toast(response.data?.msg)
      }
    }
    console.log(currentContent)
    setCurrrentChat(currentContent)
    getMessagesBetweenUsers()
  }, [currentContent])

  useEffect(() => {
    socketRef.current = socketIOClient.connect(URL)

    socketRef.current.on("socketId", data => setSocketId(data))

    socketRef.current.emit("addNewUser", userId)

    socketRef.current.on("chat", data => {
      setMessageReceive(data)
    })
    return () => {
      socketRef.current.disconnect()
    }
  }, [userId])

  useEffect(() => {
    scrollToBottom()
  }, [contentChat]);


  useEffect(() => {
    if (messageReceive) {
      if (messageReceive.sender_id === currentChat.id || messageReceive.receiver_id === currentChat.id) {
        setContentChat(contentChat => [...contentChat, messageReceive])
      }
    }
    return () => {
      setMessageReceive()
    }

  }, [currentChat?.id, messageReceive])

  return (
    <Content className='h-full bg-white border-gray-200 border-2'>
      <div className="min-h-full max-h-[500px] flex flex-col">

        <div className='flex items-center justify-between gap-2 p-2 border-b-2 border-gray-200  '>
          <div className='flex items-center gap-2'>
            <Avatar src={currentContent?.avatar} size={64} className='min-w-16 min-h-16' />
            <div>
              <div className='leading-tight font-bold line-clamp-1'>{currentContent?.name}</div>
            </div>
          </div>
          <PiInfoDuotone size={32} className='mr-2 cursor-pointer' />
        </div>

        <div className="flex-1 p-4  bg-green-400 flex items-end" >
          <div
            className='w-full min-h-full flex flex-col gap-1 max-h-[400px] overflow-y-scroll'
            style={{
              scrollbarWidth: "none",
              'msOverflowStyle': 'none',
              '&::WebkitScrollbar': {
                display: 'none',
              },
            }}
          >
            {renderMess}
            <div style={{ float: "left", clear: "both" }}
              ref={messagesEnd}>
            </div>
          </div>
        </div>

        <div className="bg-gray-200 p-2">
          <Form form={form} onFinish={handleSend} className='flex items-center align-middle gap-2 pl-1'>
            <Form.Item
              name={"content"}
              className='w-full p-0 m-0'
            >
              <Input
                className="resize-none border rounded-md w-full p-2 "
                placeholder="Nhập tin nhắn ..."
              />
            </Form.Item>

            <Button
              type="primary"
              htmlType="submit"
              size='large'
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              <FiSend />
            </Button>
          </Form>
        </div>
      </div>
    </Content >
  )
}

export default Message