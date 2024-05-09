import React from 'react'
import avatardefault from '../../../asests/avatar_default.png';
import menuSidebarCustomer from '../../../ultils/menuSidebarCustomer';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

const acitiveStyle = 'flex items-center justify-start gap-2 hover:bg-gray-200 rounded-full p-2 bg-yellow-400 font-bold inline-block'
const noAcitiveStyle = 'flex items-center justify-start gap-2 hover:bg-gray-200 rounded-full p-2 '

const Sidebar = () => {
    const { userCurentProfile } = useSelector(state => state.user)

    return (
        <div className='flex justify-center'>
            <div className='w-[80%] justify-center rounded-xl border-2 shadow-md bg-white'>
                <div className='flex flex-col items-center justify-center p-16 border-b-2'>
                    <img src={userCurentProfile.avatar || avatardefault} alt='avatar' className='w-20 min-h-20 object-cover rounded-full border-2 shadow-md border-white bg-gray-500 cursor-pointer ' />
                    <div className='mt-2 w-90'>{userCurentProfile.name}</div>
                </div>
                <div className=' m-5 flex flex-col gap-9 '>
                    {
                        menuSidebarCustomer.map((item, _) => {
                            return (
                                <NavLink
                                    key={item.id}
                                    className={({ isActive }) => isActive ? acitiveStyle : noAcitiveStyle}
                                    to={item.path}
                                    >
                                    {item.icon}
                                    {item.text}
                                </NavLink>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Sidebar