import React, { useEffect, useState } from 'react'
import { Button, InputForm } from '../../components'
import { useLocation, useNavigate } from 'react-router-dom'
import * as actions from '../../store/actions'
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';

const Login = () => {

  const location = useLocation()
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const {isLoggedIn, msg, update} = useSelector(state => state.auth)

  const [isRegister, setIsRegister] = useState(location.state?.flag);
  const [invalidFields, setInvalidFields] = useState([])
  const [payload, setPayload] = useState({
    name: "",
    email: "",
    password: "",
    role: "user"
  })

  const notify = (msg) => toast(msg, {type: 'error' });

  useEffect(() => {
    setIsRegister(location.state?.flag)
  }, [location.state?.flag])

  useEffect(() => {
    isLoggedIn && navigate("/")
  }, [isLoggedIn])

  useEffect(() => {
    msg && notify(msg)
  }, [msg, update])

  const handleSubmit = async () => {
    let finalPayload = isRegister ? payload : {
      email: payload.email,
      password: payload.password
    }
    let invalids = validate(finalPayload);
    if(invalids === 0)  isRegister ? dispatch(actions.register(payload)) : dispatch(actions.login(payload))
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
      <div className='w-full flex flex-col gap-3'>
        <InputForm
          label={"email"}
          keyPayload={"email"}
          value={payload.email}
          setValue={setPayload}
          invalidFields={invalidFields}
          setInvalidFields={setInvalidFields}
        />
        <InputForm
          label={"password"}
          keyPayload={"password"}
          value={payload.password}
          setValue={setPayload}
          invalidFields={invalidFields}
          setInvalidFields={setInvalidFields}
          type={"password"}
        />
        <Button
          text={isRegister ? "Đăng ký" : "Đăng nhập"}
          bgcolor={'bg-secondary1'}
          textColor={'text-white'}
          fullWidth
          onClick={handleSubmit}
        />
      </div>
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
    </div>
  )
}

export default Login