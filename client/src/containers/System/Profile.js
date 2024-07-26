import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../../store/actions'
import { InputForm } from '../../components/Customer'
import avatardefault from '../../asests/avatar_default.png'
import { Button } from '../../components'
import { ToastContainer, toast } from 'react-toastify';
import { apiUploadAvatar } from '../../services/user'

const Profile = () => {

  const dispatch = useDispatch();

  const { userCurentProfile } = useSelector(state => state.user)
  const [useData, setUserData] = useState(userCurentProfile)
  const [imageSrc, setImageSrc] = useState(useData.avatar);
  const [imageFile, setImageFile] = useState(null)
  const [isSubmiting, setIsSubmiting] = useState(false)
  const [errorForm, setErrorForm] = useState({
    name: '',
    email: '',
    phone: ''
  })

  // check avatar đã upload xong chưa và đang submit thì call dispatch update profile
  useEffect(() => {
    if (isSubmiting === true) {
      dispatch(actions.updateProfile(useData))
    }
    return (
      setIsSubmiting(false)
    )
  }, [useData.avatar])

  const uploadAvatar = async (file) => {
    if (file) {
      const formData = new FormData();
      formData.append("file", file)
      formData.append("upload_preset", process.env.REACT_APP_UPLOAD_AVATAR_NAME)
      const response = await apiUploadAvatar(formData)
      if (response.status === 200) {
        setUserData(prev => ({ ...prev, "avatar": response.data.secure_url }))
      } else {
        toast("error to upload avatar")
      }
    }

  }

  // hiển thị preview avatar
  const previewImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        setImageSrc(event.target.result);
      };
      setImageFile(file)
    }
  }

  const checkEmail = (email) => {
    const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    return emailPattern.test(email)
  }

  // nếu thay đổi avatar thì gọi uploadAvatar, không thì call dispatch luôn
  const handleSubmit = () => {
    let formValid = true;
    const newErrors = {
      name: '',
      email: '',
      phone: '',
    };
    if (!useData?.name?.trim()) {
      newErrors.name = "Vui lòng nhập tên";
      formValid = false;
    }

    if (!useData?.email?.trim()) {
      newErrors.email = "Email không được bỏ trống";
      formValid = false;
    } else {
      if (!checkEmail(useData?.email)) {
        newErrors.email = "Email không đúng định dạng";
        formValid = false;
      }
    }

    if (!useData?.phone?.trim()) {
      newErrors.phone = "Cần cập nhật số điện thoại";
      formValid = false;
    }

    setErrorForm(newErrors)

    if (formValid) {
      setIsSubmiting(true)
      if (imageFile) {
        uploadAvatar(imageFile)
      } else {
        dispatch(actions.updateProfile(useData))
      }
    }
  }

  return (
    <div className='container flex flex-col items-center'>
      <div className='bg-white rounded-xl border-2 shadow-md w-[95%] px-4'>
        <InputForm
          keyValue={"name"}
          label={"Tên hiển thị"}
          value={useData.name}
          setValue={setUserData}
          errorForm={errorForm}
          setErrorForm={setErrorForm}
        />
        <InputForm
          keyValue={"email"}
          type={"email"}
          label={"Email"}
          value={useData.email}
          setValue={setUserData}
          errorForm={errorForm}
          setErrorForm={setErrorForm}
        />
        <InputForm
          keyValue={"phone"}
          label={"Số điện thoại"}
          value={useData.phone || ""}
          type={"number"}
          setValue={setUserData}
          errorForm={errorForm}
          setErrorForm={setErrorForm}
        />

        <div className="w-full flex justify-center p-3 mb-6 md:mb-0">
          <label htmlFor="avatar" className='w-1/4 text-s float-start' >Ảnh đại diện</label>
          <div className='w-3/4'>
            <img
              src={imageSrc || avatardefault}
              alt='avatar'
              className='w-20 h-20 object-cover rounded-full border-2 shadow-md border-gray-800 bg-gray-500 m-2' />
            <input
              id="avatar"
              type='file'
              className=' outline-none border border-gray-400 p-2 rounded-md '
              onChange={(e) => {
                previewImageChange(e)
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
              handleSubmit()
            }}
          />
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}

export default Profile