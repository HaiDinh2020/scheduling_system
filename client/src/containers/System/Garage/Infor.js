import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../../../store/actions'
import avatardefault from '../../../asests/avatar_default.png'
import { Button, InputForm } from '../../../components'
import { ToastContainer, toast } from 'react-toastify';
import icons from '../../../ultils/icons'
import { apiUploadAvatar } from '../../../services/user'
import { Checkbox, Form, Input } from 'antd';
import TextArea from 'antd/es/input/TextArea'
const { BsCameraFill, ImBin } = icons

const servicesOptions = ['Sửa chữa', 'Bảo dưỡng', 'Bán phụ tùng', 'Tư vấn khách hàng'];
const Infor = () => {



    const handleFiles = async (e) => {
        e.stopPropagation()

        let images = []
        let files = e.target.files
        let formData = new FormData()
        for (let i of files) {
            formData.append('file', i)
            formData.append('upload_preset', process.env.REACT_APP_UPLOAD_ASSETS_NAME)
            // let response = await apiUploadImages(formData)
            // if (response.status === 200) images = [...images, response.data?.secure_url]
        }


    }


    return (
        <div className='container flex flex-col items-center'>
            <div className='bg-white rounded-xl border-2 shadow-md w-[95%] px-4 py-4'>
                <div className='w-full mb-6'>
                    <h2 className='font-semibold text-xl py-4'>Thông tin mô tả</h2>
                    <h3 className='font-medium py-4'>Tên garage</h3>
                    <TextArea placeholder="Tên garage" autoSize />
                    <h3 className='font-medium py-4'>Giới thiệu về garage</h3>
                    <TextArea
                        placeholder="Thông tin giới thiệu về garage"
                        autoSize={{
                            minRows: 4
                        }}
                    />
                    <h3 fo className='font-medium py-4'>Link website</h3>
                    <Input addonBefore="https://" addonAfter=".com" defaultValue="mysite" />
                    <h3 fo className='font-medium py-4'>Giờ làm việc</h3>
                    <Input defaultValue="mysite" />
                    <h3 fo className='font-medium py-4'>Các loại dịch vụ</h3>
                    <Checkbox.Group options={servicesOptions} defaultValue={['Sửa chữa']} onChange={() => { }} />

                    
                </div>

                <div className='w-full mb-6'>
                    <h2 className='font-semibold text-xl py-4'>Địa chỉ Garage</h2>
                    <Input placeholder="Nhập địa chỉ" />
                </div>

                <div className='w-full mb-6'>
                    <h2 className='font-semibold text-xl py-4'>Thông tin liên hệ</h2>
                    
                    <h3 fo className='font-medium py-4'>Chủ sở hữu</h3>
                    <Input readOnly value={"hai dinh"} disabled />
                    <h3 fo className='font-medium py-4'>Điện thoại</h3>
                    <Input type='number' value={"02020220202"} disabled />
                </div>
                
                <div className='w-full mb-6'>
                    <h2 className='font-semibold text-xl py-4'>Hình ảnh</h2>
                    <small>Cập nhật hình ảnh rõ ràng sẽ cho thuê nhanh hơn</small>
                    <div className='w-full'>
                        <label className='w-full border-2 h-[200px] my-4 gap-4 flex flex-col items-center justify-center border-gray-400 border-dashed rounded-md' htmlFor="file">

                            <div className='flex flex-col items-center justify-center'>
                                <BsCameraFill color='blue' size={50} />
                                Thêm ảnh
                            </div>
                        </label>
                        <input onChange={handleFiles} hidden type="file" id='file' multiple />
                        <div className='w-full'>
                            <h3 className='font-medium py-4'>Ảnh đã chọn</h3>
                            <div className='flex gap-4 items-center'>
                                
                            </div>
                        </div>
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

export default Infor