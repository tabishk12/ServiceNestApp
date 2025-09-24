import { useSelector } from "react-redux"
import Loader from '@components/utils/Loader';
import MessageBox from "@components/Utils/MessageBox";
import {useGetBookingsQuery} from '@slices/Api/booking.Api';
import Orders from "./Orders";

const BookingsDetailScreen = () => {
    const userId = useSelector((state)=>state.auth?.userInfo?._id);
      const { data:bookings, isLoading, isError } = useGetBookingsQuery(userId);
      return (
  <>
     <div className='bg-gray-200 min-h-screen text-3xl text-center mt-3'>

{isLoading && <Loader text={`Fetching Bookings Please wait`}/>}
{!(isLoading && bookings) 
     ? <Orders bookings={bookings}/>
     : <MessageBox 
          p1="No bookings yet"
          p2="Go back to the Home Page"
          p3="If you have any bookings, they will appear here."
          btnName="Home page" 
          NavigateLink='/'
          isLoading={isLoading}
        />

            }
    </div>
    </>
  )
}

export default BookingsDetailScreen