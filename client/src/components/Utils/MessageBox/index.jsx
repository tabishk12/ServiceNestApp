import { useNavigate } from "react-router-dom";


const Message = ({p1,p2,p3,NavigateLink,btnName,isLoading}) => {
    const navigate = useNavigate();
  return (
  <>{
    !isLoading &&
  <div className='bg-white p-6 rounded-2xl shadow-md max-w-2xl mx-auto mt-10 mx-3'>
      <p>{p1} </p>
      <p>{p2}</p>
      <button
       className='bg-blue-500 text-white p-2 rounded-lg mt-4 text-sm'
       onClick={() => navigate(NavigateLink)}
      >
        {btnName}
       </button>
      <p className='text-sm mt-2'> {p3} </p>  
    </div>
}  </>
  )
}

export default Message