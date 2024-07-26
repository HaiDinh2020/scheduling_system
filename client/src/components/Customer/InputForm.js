import React, { memo } from 'react'

const InputForm = ({ label, keyValue, value, setValue, type, errorForm, setErrorForm }) => {
  return (
    <div className="w-full flex justify-center items-center p-3 mb-6 md:mb-0">
      <label htmlFor={keyValue} className='w-1/4 text-s float-start' >{label}</label>
      <div className='w-3/4 flex flex-col'>
        <input
          type={type || 'text'}
          id={keyValue}
          className=' w-3/4 outline-none border border-gray-400 p-2 rounded-md '
          value={value}
          onChange={(e) => {
             setValue(prev => ({ ...prev, [keyValue]: e.target.value }))
             setErrorForm(prev => ({ ...prev, [keyValue]: "" }))
          }}
        />
        {errorForm[keyValue] && <span className="text-red-500">{errorForm[keyValue]}</span>}
      </div>
    </div>
  )
}

export default memo(InputForm)