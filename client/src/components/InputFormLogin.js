import React, { memo } from 'react'

const InputFormLogin = ({ label, value, setValue, keyPayload, type, isRequire, isInvalid }) => {
    return (
        <div className="w-full px-3 mb-6 md:mb-0">
            <label 
                htmlFor={keyPayload} 
                className='text-xs' 
                >
                {label} {isRequire ? <span className='bg-red-500'>*</span> : <></>}
            </label>
            <input
                type={type || 'text'}
                id={keyPayload}
                className='outline-none bg-[#e8f0fe] p-2 rounded-md w-full'
                value={value}
                onChange={(e) => setValue(prev => ({ ...prev, [keyPayload]: e.target.value }))}
                onFocus={() => {}}
            />
            {isInvalid && <small className='text-red-500 italic' ></small>}
        </div>
    )
}

export default memo(InputFormLogin)