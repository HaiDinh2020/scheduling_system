import React from "react";

const Button = ({ text, textcolor, bgcolor, IcAfter, onClick, fullWidth }) => {
    return (
        <button type="button" 
            onClick={onClick}
            className={`py-2 px-4 ${textcolor} ${bgcolor} ${fullWidth && 'w-full'} outline-none rounded-md hover:underline flex items-center justify-center gap-1`}>
            <span>
                {text}
            </span>
            <span>
                {IcAfter && <IcAfter />}
            </span>
        </button>
    )
}

export default Button;