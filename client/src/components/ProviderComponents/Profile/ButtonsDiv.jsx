import { useNavigate } from "react-router-dom"
const ButtonsDiv = () => {
    const navigate = useNavigate();
  return (
  <>
  <div className='flex lg:row justify-center p-4 mx-1 w-full gap-8 max-h-[5.3em] my-2' >
  <button className='text-sm p-4 rounded-xl bg-gray-800 text-white hover:bg-gray-900'
  onClick={()=>{navigate('/browse-services')}}
  >Browse Services</button>
  <button className='text-sm p-4 rounded-xl bg-gray-800 text-white hover:bg-gray-900'
  onClick={()=>{navigate('/bookingDetails')}}
  >Previous Orders</button>
  <button className='text-sm p-4 rounded-xl bg-gray-800 text-white hover:bg-gray-900'
  onClick={()=>{navigate('/setting')}}
  >Account Setting</button>
  </div>
  </>
  )
}

export default ButtonsDiv