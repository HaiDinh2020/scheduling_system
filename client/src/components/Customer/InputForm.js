import React, { memo } from 'react'

const InputForm = ({ label, keyValue, value, setValue, type }) => {
    return (
        <div className="w-full flex justify-center items-center p-3 mb-6 md:mb-0">
          <label htmlFor={keyValue} className='w-1/4 text-s float-start' >{label}</label>
          <input
            type={type || 'text'}
            id={keyValue}
            className=' w-3/4 outline-none border border-gray-400 p-2 rounded-md '
            value={value}
            onChange={(e) => setValue(prev => ({ ...prev, [keyValue]: e.target.value }))}
          />
        </div>
    )
}

export default memo(InputForm)