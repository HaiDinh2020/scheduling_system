
import React from 'react'
import { NavLink } from 'react-router-dom';

const nav = [
  { name: "Dịch vụ", path: '/services' },
  { name: "Lịch đặt", path: '/customer/booking-history' },
]
const Navigation = () => {
  return (
    <div className='w-full bg-secondary1 text-white items-center  pl-1 flex'>
      {nav?.length > 0 && nav.map((item, index) => {
        return (
          <div key={index} className='h-full text-sm font-medium flex items-center justify-center'>
            <NavLink
              to={item.path}
              className={({isActive}) => isActive ? "bg-secondary2 p-3": "p-3"}
            >
              {item.name}
            </NavLink>
          </div>
        )
      })}

    </div>
  )
}

export default Navigation