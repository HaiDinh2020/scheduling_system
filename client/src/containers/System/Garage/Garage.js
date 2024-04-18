import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import { path } from '../../../ultils/constants'
import { Header } from '../../Public/index'
import * as actions from '../../../store/actions'
import Sidebar from './Sidebar'

const Garage = () => {
    const { isLoggedIn } = useSelector(state => state.auth)
    const dispatch = useDispatch()

    useEffect(() => {
        if(isLoggedIn) {
            dispatch(actions.getCurrentProfile())
            console.log("get current")
        }
    }, [])

    if (!isLoggedIn) return <Navigate to={`/${path.LOGIN}`} replace={true} />
    return (
        <div className='w-full h-screen flex flex-col items-center'>
            <Header />
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

export default Garage