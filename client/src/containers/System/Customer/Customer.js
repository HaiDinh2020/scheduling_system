import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import { path } from '../../../ultils/constants'
import { Header, Navigation } from '../../Public/index'
import Sidebar from './Sidebar'

const Customer = () => {
    const { isLoggedIn } = useSelector(state => state.auth)

    if (!isLoggedIn) return <Navigate to={`/${path.LOGIN}`} replace={true} />
    return (
        <div className='w-full h-screen flex flex-col items-center'>
            <Header />
            <Navigation />
            <div className='flex w-full flex-auto pt-2'>
                <div className='w-1/4 '>
                    <Sidebar />
                </div>
                <div className='w-3/4'>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default Customer