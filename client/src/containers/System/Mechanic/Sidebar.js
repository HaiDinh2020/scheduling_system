import React from 'react'
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import avatardefault from '../../../asests/avatar_default.png';
import menuSidebarMechanic from '../../../ultils/menuSidebarMechanic';

const acitiveStyle = 'flex items-center justify-start gap-2 hover:bg-gray-200 rounded-full p-2 bg-yellow-400 font-bold inline-block'
const noAcitiveStyle = 'flex items-center justify-start gap-2 hover:bg-gray-200 rounded-full p-2 '

const Sidebar = () => {
    const { userCurentProfile } = useSelector(state => state.user)

    return (
        <div className='w-full min-w-60 flex justify-center pl-2'>
            <div className='w-full justify-center rounded-xl border-2 shadow-md bg-white'>
                <div className='flex flex-col relative items-center justify-center p-16 border-b-2'>
                <div className=' bg-green-400 absolute left-0 top-0 p-2 rounded-xl text-white text-xs uppercase font-semibold'>Mechanic</div>
                    <img src={userCurentProfile.avatar || avatardefault} alt='avatar' className='w-20 aspect-square object-cover rounded-full border-2 shadow-md border-white bg-gray-500 cursor-pointer ' />
                    <div className='mt-2 w-90'>{userCurentProfile.name}</div>
                </div>
                <div className=' m-5 flex flex-col gap-9 '>
                    {
                        menuSidebarMechanic.map((item, _) => {
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