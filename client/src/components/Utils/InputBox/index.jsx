import React from 'react'

const InputBox = ({type,label,value,placeholder,onChange ,required,name}) => {
  return (
   <>
     <div className='flex flex-col gap-2 mt-2 p-1'>
            <label className="block text-md font-medium text-slate-900 leading-6 mb-1">
             {label}
            </label>
            <input
              type={type}
             value={value}
              onChange={onChange}
              placeholder={placeholder}
              name={name? name: null}
              required= {required? true : false}
              className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>

   </>
  )
}

export default InputBox