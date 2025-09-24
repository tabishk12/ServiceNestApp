import { useSelector } from 'react-redux';
import Loader from '@components/utils/Loader';
import MessageBox from '@components/utils/MessageBox';
import Orders from './Orders';
import {useGetBookingHistoryQuery} from '@slices/Api/booking.Api';

export const OrderHistory = () => {

  const userId = useSelector((state) => state.auth.userInfo?._id);
  const { data: bookingHistory, isLoading} = useGetBookingHistoryQuery(userId, {
  refetchOnMountOrArgChange: true,
  refetchOnFocus: true,
  refetchOnReconnect: true,
});

  return (
    <>
   {isLoading && <Loader text={"Loading Orders Please wait"}/>}
   <div className={`bg-gray-200 min-h-screen text-3xl text-center mt-3 ${isLoading && 'hidden'}`}>
   {(!isLoading && !bookingHistory )?
    <MessageBox 
      p1="No Orders Yet"
      p2="Browse Services to Book" 
      p3="You can view your order history here once you have made a booking."
      NavigateLink='/browse-services'
      btnName='Browse Services' 
        />
   :<Orders userId={userId}/>}

    </div>
  
</>

  )
}
export default OrderHistory;