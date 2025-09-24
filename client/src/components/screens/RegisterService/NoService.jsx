import { useNavigate } from "react-router-dom"

const NoService = () => {
    const navigate = useNavigate();
  return (
    <>
    <div className='bg-gray-300 min-h-screen p-3'>
    <div className="flex flex-col items-center justify-center shadow gap-3 text-xl m-4 border-[1px] bg-white min-h-[20em] rounded-xl mt-7 max-w-3xl mx-auto">
      <p>You are registered with all the services</p>
      <p>No more services available</p>
      <button
        className="bg-green-600 p-2 rounded-xl text-white"
        onClick={() => navigate("/ServiceList")}
      >
        Go Back
      </button>
    </div>
    </div>
    </>
  )
}

export default NoService