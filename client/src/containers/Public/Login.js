import React, { useEffect, useState } from 'react'
import { Button, InputForm } from '../../components'
import { json, useLocation, useNavigate } from 'react-router-dom'
import * as actions from '../../store/actions'
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import icons from '../../ultils/icons';
import TextArea from 'antd/es/input/TextArea';
import { Checkbox, Input, message, Button as ButtonAnt } from 'antd';
import { servicesOptions } from '../../ultils/constants'
import { apiGetAllGarage } from '../../services/Customer/customer';

const { BsChevronDown, FaMapMarkerAlt } = icons;
const Login = () => {

  const location = useLocation()
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const { isLoggedIn, msg, update, role } = useSelector(state => state.auth)

  const [isRegister, setIsRegister] = useState(location.state?.flag);
  const [listGarage, setListGarage] = useState([])
  const [invalidFields, setInvalidFields] = useState([])
  const [isGarage, setIsGarage] = useState(false);
  // const [exactAddress, setExactAddress] = useState('');
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
    exactAddress: ""
  })

  const [mechanicInfo, setMechanicInfo] = useState({
    garage_id: "",
    major: ''
  })

  const [errors, setErrors] = useState({
    garageName: '',
    introduce: '',
    linkWebsite: '',
    address: '',
    businessHours: '',
    services: '',
    exactAddress: '',
    garage_id: '',
    major: ''
  });

  useEffect(() => {
    const getAllGarages = async () => {
      const garages = await apiGetAllGarage()
      if (garages?.data?.err === 0) {
        setListGarage(garages?.data?.response)
      }
    }

    if (isRegister && payload.role === "mechanic") {
      getAllGarages()
    }
  }, [isRegister, payload.role])

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
    // đăng ký garage
    if (isRegister && isGarage) {
      let formValid = true;
      const newErrors = {
        garageName: '',
        introduce: '',
        linkWebsite: '',
        address: '',
        businessHours: '',
        services: '',
        exactAddress: ''
      };

      if (!garageInfo.garageName.trim()) {
        newErrors.garageName = 'Vui lòng nhập tên garage';
        formValid = false;
      }
      if (!garageInfo.introduce.trim()) {
        newErrors.introduce = 'Vui lòng nhập giới thiệu về garage';
        formValid = false;
      }
      if (!garageInfo.linkWebsite.trim()) {
        newErrors.linkWebsite = 'Vui lòng nhập link website';
        formValid = false;
      }
      if (!garageInfo.address.trim()) {
        newErrors.address = 'Vui lòng nhập địa chỉ';
        formValid = false;
      }
      if (!garageInfo.exactAddress.trim()) {
        newErrors.exactAddress = 'Vui lòng nhập tọa độ chính xác';
        formValid = false;
      } else {
        const addressRegex = /^-?\d+(\.\d+)?,\s*-?\d+(\.\d+)?$/;
        console.log(addressRegex.test(21.002964, 105.853954))
        if (!addressRegex.test(garageInfo.exactAddress.trim())) {
          newErrors.exactAddress = 'Vui lòng nhập đúng định dạng tọa độ';
          formValid = false;
        }
      }

      if (!garageInfo.businessHours.trim()) {
        newErrors.businessHours = 'Vui lòng nhập giờ làm việc';
        formValid = false;
      }
      if (!garageInfo.services.trim()) {
        newErrors.services = 'Vui lòng chọn ít nhất một loại dịch vụ';
        formValid = false;
      }
      let invalids = validate(payload);

      setErrors(newErrors);

      if (formValid && invalids === 0) {
        let finalPayload = { ...payload, ...garageInfo }

        dispatch(actions.register(finalPayload))
        console.log('Form submitted successfully!');
        console.log(finalPayload);
      } else {
        console.log('Form has errors. Please check again.');
      }
    } else if (isRegister && payload.role === 'mechanic') {
      console.log("đăng ký thợ")
      let formValid = true
      const newErrors = {
        garage_id: '',
        major: ''
      };

      if (!mechanicInfo.garage_id) {
        newErrors.garage_id = 'Vui lòng chọn chi nhánh garage';
        formValid = false;
      }

      if (!mechanicInfo.major.trim()) {
        newErrors.major = "Vui lòng nhập chuyên ngành";
        formValid = false
      }
      
      setErrors(newErrors)

      let invalids = validate(payload);

      if (formValid && invalids === 0) {
        let finalPayload = { ...payload, ...mechanicInfo }

        dispatch(actions.register(finalPayload))
      }

    } else if (isRegister) {
      let finalPayload = { ...payload }
      let invalids = validate(finalPayload);
      if (invalids === 0) {
        dispatch(actions.register(finalPayload))
      }
    } else {
      let finalPayload = {
        email: payload.email,
        password: payload.password
      }
      let invalids = validate(finalPayload);
      if (invalids === 0) dispatch(actions.login(finalPayload))
    }
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

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        console.log(position.coords)
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        const newLocation = `${latitude}, ${longitude}`;

        setGarageInfo(prev => ({ ...prev, exactAddress: newLocation }));
        setErrors(prev => ({ ...prev, exactAddress: "" }))
      }, () => {
        message.error('Không thể lấy vị trí của bạn.');
      });
    } else {
      message.error('Trình duyệt của bạn không hỗ trợ định vị.');
    }
  }

  const handleChooseGarage = (e) => {
    setMechanicInfo(prev => ({ ...prev, garage_id: e.target.value }))
    setErrors(prev => ({ ...prev, garage_id: "" }))
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setGarageInfo(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: "" }))
  };

  const handleCheckboxChange = (checkedValues) => {
    setGarageInfo(prev => ({ ...prev, services: checkedValues.join(', ') }));
  };

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
              value={garageInfo.garageName}
              onChange={handleInputChange}
            />
            {errors.garageName && <span className="text-red-500">{errors.garageName}</span>}

            <h3 className='font-medium py-4'>Giới thiệu về garage</h3>
            <TextArea
              placeholder="Thông tin giới thiệu về garage"
              autoSize={{
                minRows: 4
              }}
              name='introduce'
              value={garageInfo.introduce}
              onChange={handleInputChange}
            />
            {errors.introduce && <span className="text-red-500">{errors.introduce}</span>}

            <h3 fo className='font-medium py-4'>Link website</h3>
            <Input
              addonBefore="https://"
              addonAfter=".com"
              placeholder="mygarage"
              name='linkWebsite'
              value={garageInfo.linkWebsite}
              onChange={handleInputChange}
            />
            {errors.linkWebsite && <span className="text-red-500">{errors.linkWebsite}</span>}

            <h3 fo className='font-medium py-4'>Địa chỉ</h3>
            <Input
              placeholder="Nhập địa chỉ"
              name='address'
              onChange={handleInputChange}
            />
            {errors.address && <span className="text-red-500">{errors.address}</span>}

            <h3 fo className='font-medium py-4'>Tọa độ</h3>
            <div className='flex border border-gray-300 rounded p-2 gap-2 justify-between'>
              <Input
                placeholder="ví dụ: 21.004526, 105.860134"
                name='exactAddress'
                value={garageInfo.exactAddress}
                onChange={handleInputChange}
              />
              <ButtonAnt onClick={getLocation}><FaMapMarkerAlt /></ButtonAnt>
            </div>
            {errors.exactAddress && <span className="text-red-500">{errors.exactAddress}</span>}

            <h3 fo className='font-medium py-4'>Giờ làm việc</h3>
            <Input
              placeholder="8-20"
              name='businessHours'
              onChange={handleInputChange}
            />
            {errors.businessHours && <span className="text-red-500">{errors.businessHours}</span>}

            <h3 fo className='font-medium py-4'>Các loại dịch vụ</h3>
            <Checkbox.Group
              options={servicesOptions}
              defaultValue={['Sửa chữa']}
              name='services'
              onChange={handleCheckboxChange}
            />
            {errors.services && <span className="text-red-500">{errors.services}</span>}
          </div >
        }
        {
          isRegister && payload.role === 'mechanic' &&
          <div className="w-full px-3 mb-6 md:mb-0">
            <h2 className='font-bold py-2'>Đăng ký thông tin thợ sửa chữa</h2>
            <h3 className='font-medium py-4'>Chọn chi nhánh</h3>
            <select
              id="garage_id"
              value={mechanicInfo.garage_id}
              onChange={(e) => handleChooseGarage(e)}
              className="w-full  border border-gray-200  p-2 rounded-md leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            >
              {listGarage.length > 0 && listGarage.map((garage, index) => {
                return (
                  <option key={index} value={garage.id}>{garage.garage_name}</option>
                )
              })}
            </select>
            {errors.garage_id && <span className="text-red-500">{errors.garage_id}</span>}

            <h3 fo className='font-medium py-4'>Chuyên về</h3>
            <Input
              placeholder="Ex: Xe điện, xe bán tải,..."
              name='major'
              value={mechanicInfo.major}
              onChange={(e) => setMechanicInfo(prev => ({ ...prev, major: e.target.value }))}
            />
            {errors.major && <span className="text-red-500">{errors.major}</span>}
          </div>

        }
        <Button
          text={isRegister ? "Đăng ký" : "Đăng nhập"}
          bgcolor={'bg-secondary1'}
          textColor={'text-white'}
          fullWidth
          onClick={() => handleSubmit()}
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