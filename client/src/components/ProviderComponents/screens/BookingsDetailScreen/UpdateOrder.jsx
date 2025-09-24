import { useUpdateStatusMutation } from "@slices/Api/booking.Api"
import { useState } from 'react';
import { useSelector } from "react-redux";
import {useCreateNotificationMutation} from "@slices/Api/notification.Api";
const UpdateOrder = ({status,bookingId}) => {
    const userId = useSelector((state) => state.auth.userInfo?._id);
    const [createNotification] = useCreateNotificationMutation();
    const [orderStatus,setStatus]=useState(status);
    const   [updateOrderStatus] = useUpdateStatusMutation()


    const updateStatus =async (newStatus)=>{
        setStatus(newStatus)
      const updatedBooking = await updateOrderStatus({bookingId,orderStatus:newStatus}).unwrap()
        console.log(orderStatus)
        console.log(updatedBooking);
        // Create notification for Customer
        createNotification({
          userId: updatedBooking.booking.userId, // customer 
            title: "Booking Status Updated",
            message: `Your booking status has been updated to ${newStatus}.`,
            type: "booking",
            bookingId,  
        });
    }
  return (
   <>
   {status ==='pending'
   ?<div>
    <button className='bg-red-500 p-3 w-[6em] text-white m-1 rounded-xl text-[1.3em]'
    onClick={()=>{ updateStatus('Cancelled');}}
    > Cancle
    </button>
    
    <button className='bg-green-500 p-3 w-[6em] text-white m-1 rounded-xl text-[1.3em]'
    onClick={()=>{updateStatus('Confirmed');}}>
        Accept
        </button>
   </div>
   :status==='Confirmed'
   ?<div>
    <button className='bg-red-500 p-3 w-[6em] text-white m-1 rounded-xl text-[1.3em]'
    onClick={()=>{updateStatus('Cancelled');}}>
        Cancle
        </button>
    <button className='bg-blue-500 p-3 w-[6em] text-white m-1 rounded-xl text-[1.3em]'
    onClick={()=>{updateStatus('Completed');}}>Complete</button>
   </div>
   :""
   }

   </> 
  )
}

export default UpdateOrder