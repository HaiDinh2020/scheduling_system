import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import { path } from '../../../ultils/constants'
import { Header } from '../../Public/index'
import * as actions from '../../../store/actions'
import Sidebar from './Sidebar'

const Garage = () => {
    const { isLoggedIn, role } = useSelector(state => state.auth)
    // const role = useSelector(state => state.user.userCurentProfile.role)
    const dispatch = useDispatch()
    

    useEffect(() => {
        // if(isLoggedIn) {
        //     dispatch(actions.getCurrentProfile())
        //     dispatch(actions.getGarageInfor())
        // }
    }, [])

    if (!isLoggedIn) return <Navigate to={`/${path.LOGIN}`} replace={true} />
    if(role === "customer") return <Navigate to={`/`}/>
    return (
        <div className='w-full h-fit flex flex-col items-center'>
            <Header />
            <div className='flex w-full flex-auto pt-2'>
                <div className='w-1/6'>
                    <Sidebar />
                </div>
                <div className='w-5/6 '>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default Garage