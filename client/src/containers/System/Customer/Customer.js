import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, Outlet, useNavigate } from 'react-router-dom'
import { path } from '../../../ultils/constants'
import { Header, Navigation } from '../../Public/index'
import * as actions from '../../../store/actions'
import Sidebar from './Sidebar'

const Customer = () => {
    const { isLoggedIn, role } = useSelector(state => state.auth)
    const dispatch = useDispatch()

    useEffect(() => {
        if(isLoggedIn) {
            dispatch(actions.getCurrentProfile())
        }
    }, [])

    if (!isLoggedIn) return <Navigate to={`/${path.LOGIN}`} replace={true} />
    if(role != "customer") return  <Navigate to={`/`}/>
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