import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Checkbox, Form, Input } from 'antd';
import TextArea from 'antd/es/input/TextArea'
import { ToastContainer, toast } from 'react-toastify';
import * as actions from '../../../store/actions'

import { Button, InputForm } from '../../../components'
import icons from '../../../ultils/icons'
import { apiUploadImages } from '../../../services/Garage/garage'
import { servicesOptions } from '../../../ultils/constants'

const { BsCameraFill, ImBin } = icons

const Infor = () => {

    const { garageInfor } = useSelector(state => state.garage)

    const parseImages = (garageInfor) => {
        if(garageInfor && garageInfor.images && typeof garageInfor.images === 'string') {
            return {
                ...garageInfor,
                images: garageInfor.images.split(", ")
            };
        } else {
            return garageInfor
        }
    }

    const dispatch = useDispatch()

    const [newGarageInfor, setNewGarageInfor] = useState(parseImages(garageInfor))
    const [imagePreviews, setImagePreviews] = useState([])

    

    console.log(newGarageInfor)
    const handleInputChange = (e) => {
        setNewGarageInfor(pre => ({ ...pre, [e.target.name]: e.target.value }))
    }

    const handleFiles = async (e) => {
        e.stopPropagation()

        let images = []
        let files = e.target.files
        let formData = new FormData()
        for (let i of files) {
            formData.append('file', i)
            formData.append('upload_preset', process.env.REACT_APP_UPLOAD_IMAGES_NAME)
            let response = await apiUploadImages(formData)
            if (response.status === 200) images = [...images, response.data?.secure_url]
        }
        console.log(images)
        setImagePreviews(pre => [...pre, ...images])
        setNewGarageInfor(prev => {
            const updateImages = prev.images != null ? [...prev.images, ...images] : images
            return ({...prev, images: updateImages})
        })
    }

    const handleDeleteImages = (image) => {
        setImagePreviews(pre => pre?.filter(item => item !== image))
        setNewGarageInfor(pre => ({ ...pre, images: pre.images?.filter(item => item !== image) }))
    }

    const handleUpdate = (e) => {
        e.preventDefault()
        const imagesString = newGarageInfor.images?.join(", ")
        const updateGarageInfor = {
            ...newGarageInfor,
            images: imagesString
        }
        dispatch(actions.updateGarageInfor(updateGarageInfor))
        console.log(updateGarageInfor)

    }



    return (
        <div className='container flex flex-col items-center'>
            <form className='bg-white rounded-xl border-2 shadow-md w-[95%] px-4 py-4'>
                <div className='w-full mb-6'>
                    <h2 className='font-semibold text-xl py-4'>Thông tin mô tả</h2>
                    <h3 className='font-medium py-4'>Tên garage  <span className='text-red-500'>*</span></h3>
                    <Input
                        name='garage_name'
                        placeholder="Tên garage"
                        autoSize value={newGarageInfor.garage_name}
                        onChange={(e) => handleInputChange(e)}
                    />
                    <h3 className='font-medium py-4'>Giới thiệu về garage  <span className='text-red-500'>*</span></h3>
                    <TextArea
                        placeholder="Thông tin giới thiệu về garage"
                        autoSize={{
                            minRows: 4
                        }}
                        name='introduce'
                        value={newGarageInfor.introduce}
                        onChange={(e) => handleInputChange(e)}
                    />
                    <h3 fo className='font-medium py-4'>Link website</h3>
                    <Input
                        addonBefore="https://"
                        addonAfter=".com"
                        placeholder="mysite"
                        name='website'
                        value={newGarageInfor.website}
                        onChange={(e) => handleInputChange(e)}
                    />
                    <h3 fo className='font-medium py-4'>Giờ làm việc  <span className='text-red-500'>*</span></h3>
                    <Input
                        placeholder="8h-20h"
                        name='business_hours'
                        value={newGarageInfor.business_hours}
                        onChange={(e) => handleInputChange(e)}
                    />
                    <h3 fo className='font-medium py-4'>Các loại dịch vụ  <span className='text-red-500'>*</span></h3>
                    <Checkbox.Group
                        options={servicesOptions}
                        defaultValue={['Sửa chữa']}
                        value={newGarageInfor?.services?.split(", ")}
                        name='services'
                        onChange={(checkedValues) => setNewGarageInfor(prev => ({ ...prev, "services": checkedValues.join(', ') }))}
                    />


                </div>

                <div className='w-full mb-6'>
                    <h2 className='font-semibold text-xl py-4'>Địa chỉ Garage  <span className='text-red-500'>*</span></h2>
                    <Input placeholder="Nhập địa chỉ" required />
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
                            <div className='flex flex-wrap items-end'>
                                {
                                    imagePreviews.map((item, index) => {
                                        return (
                                            <div key={index} className='relative w-1/3 h-1/3 p-2'>
                                                <div className=' object-cover rounded-md'>
                                                    <img src={item} alt='imagepreview' />
                                                </div>
                                                <span
                                                    title='xóa'
                                                    onClick={(e) => handleDeleteImages(item)}
                                                    className='absolute right-1 top-1 cursor-pointer p-2 bg-slate-100 border-white rounded-full hover:bg-gray-500'
                                                >
                                                    <ImBin />
                                                </span>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>


                <div className=' m-2 items-end justify-end flex'>
                    <Button
                        type={"submit"}
                        text={"Cập nhật"}
                        textcolor={'text-white'}
                        bgcolor={'bg-secondary1'}
                        onClick={(e) => handleUpdate(e)}
                    />
                </div>
            </form>
            <ToastContainer />
        </div>
    )
}

export default Infor