import { Avatar } from 'antd'
import React from 'react'
import { Layout, Menu } from 'antd';


const { Sider } = Layout;

const Sidebar = ({ onMenuItemClick, chatUsers, indexActive }) => {



    return (
        <div className='h-full flex flex-col'>
            <div className='ml-2 mb-2 text-2xl font-bold '>Đoạn chat</div>
            <div className='flex-1 overflow-hidden min-w-40'>
                <Sider width={300} className="max-h-[540px] bg-white overflow-y-auto">
                    <Menu
                        mode="inline"
                        defaultSelectedKeys={["0"]}
                        style={{ borderRight: 0 }}
                        onClick={onMenuItemClick}
                        selectedKeys={[`${indexActive}`]}
                    >

                        {
                            chatUsers.length > 0 && chatUsers.map((item, index) => {
                                return (
                                    <Menu.Item style={{ height: "80px" }} key={index}>
                                        <div className='flex items-center gap-2 my-2 p-1 '>
                                            <Avatar src={item?.avatar} size={64} className='min-w-16 min-h-16' />
                                            <div>
                                                <div className='leading-tight font-bold line-clamp-1'>{item?.name}</div>
                                                {/* <div className='leading-tight line-clamp-1'>{item.recent_mes.isYou && <span>Bạn: </span>}{item.recent_mes.content}</div> */}
                                            </div>
                                        </div>
                                    </Menu.Item>
                                )
                            })
                        }
                    </Menu>
                </Sider>
            </div>
            
        </div>
    )
}

export default Sidebar