import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import { path } from '../../../ultils/constants'
import { Header } from '../../Public/index'
import Sidebar from './Sidebar'

const Mechanic = () => {
    const { isLoggedIn, role } = useSelector(state => state.auth)

   

    if (!isLoggedIn) return <Navigate to={`/${path.LOGIN}`} replace={true} />
    if(role === "customer") return <Navigate to={`/`}/>
    return (
        <div className='w-full h-fit flex flex-col items-center'>
            <Header />
            <div className='flex w-full flex-auto pt-2'>
                <div className='w-1/6 '>
                    <Sidebar />
                </div>
                <div className='w-5/6'>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default Mechanic