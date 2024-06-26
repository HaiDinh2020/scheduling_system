import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../../../store/actions'
import { InputForm } from '../../../components/Customer'
import avatardefault from '../../../asests/avatar_default.png'
import { Button } from '../../../components'
import { ToastContainer, toast } from 'react-toastify';
import { apiUploadAvatar } from '../../../services/user'

const Profile = () => {

  

  // hiển thị preview avatar
  

  return (
    <div className='container flex flex-col items-center'>
      <div className='bg-white rounded-xl border-2 shadow-md w-[95%] px-4'>
        

        <div className="w-full flex justify-center p-3 mb-6 md:mb-0">
          <label htmlFor="avatar" className='w-1/4 text-s float-start' >Ảnh đại diện</label>
          <div className='w-3/4'>
            <img
              src={  avatardefault}
              alt='avatar'
              className='w-20 h-20 object-cover rounded-full border-2 shadow-md border-gray-800 bg-gray-500 m-2' />
            <input
              id="avatar"
              type='file'
              className=' outline-none border border-gray-400 p-2 rounded-md '
              onChange={(e) => {
               
              }}
            />
          </div>
        </div>
        <div className=' m-2 items-end justify-end flex'>
          <Button
            text={"Cập nhật"}
            textcolor={'text-white'}
            bgcolor={'bg-secondary1'}
            onClick={() => {
              
            }}
          />
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}

export default Profile