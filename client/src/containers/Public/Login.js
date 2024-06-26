import React, { useEffect, useState } from 'react'
import { Button, InputForm } from '../../components'
import { json, useLocation, useNavigate } from 'react-router-dom'
import * as actions from '../../store/actions'
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import icons from '../../ultils/icons';
import TextArea from 'antd/es/input/TextArea';
import { Checkbox, Form, Input } from 'antd';
import { servicesOptions } from '../../ultils/constants'

const { BsChevronDown } = icons;
const Login = () => {

  const location = useLocation()
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const { isLoggedIn, msg, update, role } = useSelector(state => state.auth)

  const [isRegister, setIsRegister] = useState(location.state?.flag);
  const [invalidFields, setInvalidFields] = useState([])
  const [isGarage, setIsGarage] = useState(false);
  const [payload, setPayload] = useState({
    name: "",
    email: "",
    password: "",
    role: "customer"
  })

  const [garageInfo, setGarageInfo] = useState({
    garageName: "",
    introduce: "",
    address: "",
    services: "",
    businessHours: "",
    linkWebsite: "",
  })

  const notify = (msg) => toast(msg, { type: 'error' });

  useEffect(() => {
    setIsRegister(location.state?.flag)
  }, [location.state?.flag])

  useEffect(() => {
    if (isLoggedIn) {
      if (role === 'customer') {
        navigate("/")
      } else if (role === 'garage') {
        navigate('/garage')
      } else {
        navigate('/mechanic')
      }
    }
    isLoggedIn && setTimeout(() => {
      dispatch(actions.getCurrentProfile())
      if (role === 'garage') {
        dispatch(actions.getGarageInfor())
      } else {
        dispatch(actions.getAllCar())
        dispatch(actions.getAllBookingCustomer())
      }
    }, [1000])
  }, [isLoggedIn])

  useEffect(() => {
    msg && notify(msg)
  }, [msg, update])

  const handleChangRole = (e) => {
    setPayload(prev => ({ ...prev, role: e.target.value }))
    e.target.value === "garage" ? setIsGarage(true) : setIsGarage(false)
  }

  const handleSubmit = async () => {

    let finalPayload = isRegister ? isGarage ? { ...payload, ...garageInfo } : payload : {
      email: payload.email,
      password: payload.password
    }
    let invalids = validate(finalPayload);
    console.log(finalPayload)
    if (invalids === 0) isRegister ? dispatch(actions.register(finalPayload)) : dispatch(actions.login(finalPayload))
  }

  const validate = (payload) => {
    let invalids = 0;
    const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    let fields = Object.entries(payload)

    fields.forEach(item => {
      if (item[1] === "") {
        setInvalidFields(pre => [...pre, {
          name: item[0],
          message: "Bạn không được bỏ trống trường này."
        }])
        invalids++;
      }
    })
    fields.forEach(item => {
      switch (item[0]) {
        case "password":
          if (item[1].length < 6) {
            setInvalidFields(pre => [...pre, {
              name: item[0],
              message: "Mật khẩu phải tối thiểu 6 ký tự"
            }])
            invalids++;
          }
          break;

        case "email":

          if (!emailPattern.test(item[1])) {
            setInvalidFields(pre => [...pre, {
              name: item[0],
              message: "email không đúng định dạng"
            }])
            invalids++;
          }
          break;

        default:
          break;
      }
    })
    return invalids
  }

  return (
    <div className='bg-white w-[600px] p-[30px] m-2  pb-[100px] rounded-md shadow-sm'>
      <h3 className='font-semibold text-2xl mb-3'>{!isRegister ? 'Đăng nhập' : 'Đăng ký tài khoản'}</h3>
      <div className='w-full flex flex-col gap-3'>
        {
          isRegister &&
          <InputForm
            label={"Name"}
            keyPayload={"name"}
            value={payload.name}
            setValue={setPayload}
            invalidFields={invalidFields}
            setInvalidFields={setInvalidFields}
          />
        }
        <InputForm
          label={"Email"}
          keyPayload={"email"}
          value={payload.email}
          setValue={setPayload}
          invalidFields={invalidFields}
          setInvalidFields={setInvalidFields}
        />
        <InputForm
          label={"Password"}
          keyPayload={"password"}
          value={payload.password}
          setValue={setPayload}
          invalidFields={invalidFields}
          setInvalidFields={setInvalidFields}
          type={"password"}
        />
        {
          isRegister &&
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label htmlFor="role" className='text-xs' >Role</label>
            <div className="relative">
              <select
                id="role"
                value={payload.role}
                onChange={(e) => handleChangRole(e)}
                className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded-md leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              >
                <option value={"customer"}>Customer</option>
                <option value={"garage"}>Garage</option>
                <option value={"mechanic"}>Thợ sửa chữa</option>
              </select>
              <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700'>
                <BsChevronDown />
              </div>
            </div>
          </div>
        }

        {
          isRegister && isGarage &&
          <div className="w-full px-3 mb-6 md:mb-0">
            <h2 className='font-bold py-2'>Đăng ký thông tin garage</h2>
            <h3 className='font-medium py-4'>Tên garage</h3>
            <TextArea
              placeholder="Tên garage"
              autoSize
              name='garageName'
              onChange={(e) => setGarageInfo(prev => ({ ...prev, [e.target.name]: e.target.value }))}
            />
            <h3 className='font-medium py-4'>Giới thiệu về garage</h3>
            <TextArea
              placeholder="Thông tin giới thiệu về garage"
              autoSize={{
                minRows: 4
              }}
              name='introduce'
              onChange={(e) => setGarageInfo(prev => ({ ...prev, [e.target.name]: e.target.value }))}
            />

            <h3 fo className='font-medium py-4'>Link website</h3>
            <Input
              addonBefore="https://"
              addonAfter=".com"
              placeholder="mygarage"
              name='linkWebsite'
              onChange={(e) => setGarageInfo(pre => ({ ...pre, [e.target.name]: e.target.value }))}
            />
            <h3 fo className='font-medium py-4'>Địa chỉ</h3>
            <Input
              placeholder="Nhập địa chỉ"
              name='address'
              onChange={(e) => setGarageInfo(prev => ({ ...prev, [e.target.name]: e.target.value }))}
            />
            <h3 fo className='font-medium py-4'>Giờ làm việc</h3>
            <Input
              placeholder="8-20"
              name='businessHours'
              onChange={(e) => setGarageInfo(prev => ({ ...prev, [e.target.name]: e.target.value }))}
            />
            <h3 fo className='font-medium py-4'>Các loại dịch vụ</h3>
            <Checkbox.Group
              options={servicesOptions}
              defaultValue={['Sửa chữa']}
              name='services'
              onChange={(checkedValues) => setGarageInfo(prev => ({ ...prev, "services": checkedValues.join(', ') }))}
            />
          </div >
        }
        <Button
          text={isRegister ? "Đăng ký" : "Đăng nhập"}
          bgcolor={'bg-secondary1'}
          textColor={'text-white'}
          fullWidth
          onClick={handleSubmit}
        />
      </div >
      <div className='mt-7 flex items-center justify-between'>
        {isRegister ?
          <small>Bạn đã có tài khoản?
            <span
              onClick={() => {
                setIsRegister(false);
              }}
              className='text-blue-500 hover:underline cursor-pointer'
            >
              Đăng nhập ngay
            </span>
          </small>
          :
          <>
            <small className='text-[blue] hover:text-[red] cursor-pointer' >Bạn quên mật khẩu</small>
            <small
              className='text-[black] hover:text-[red] cursor-pointer'
              onClick={() => {
                setIsRegister(true);
              }}
            >
              Đăng ký ngay
            </small>
          </>
        }

      </div>
      <ToastContainer />
    </div >
  )
}

export default Login