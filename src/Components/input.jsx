import React from 'react'

const input = ({config,value,onChange}) => {
 return (
    <input type={config.type || "text"} placeholder={config.placeholder || "enter something"} className={`  px-3 py-5 ${config.width|| "w-full"}  bg-gray-300 ${config.margin} my-2 placeholder:text-2xl`}
    value={value} onChange={onChange}/>
    
 )
}

export default input