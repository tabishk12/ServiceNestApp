import Loader from "@components/Utils/Loader";
import MessageBox from "@components/Utils/MessageBox";
import { useGetBookingHistoryQuery } from "@slices/Api/booking.Api";
import { useSelector } from "react-redux";
import Orders from "./Orders";

export const OrderHistory = () => {
  const userId = useSelector((state) => state.auth.userInfo?._id);
  const { data: bookingHistory, isLoading } = useGetBookingHistoryQuery(
    userId,
    {
      refetchOnMountOrArgChange: false,
      refetchOnFocus: false,
      refetchOnReconnect: false,
    },
  );

  return (
    <>
      {isLoading && <Loader text={"Loading Orders Please wait"} />}
      <div className={`${isLoading ? "hidden" : ""}`}>
        {!isLoading && (!bookingHistory || bookingHistory.length === 0) ? (
          <div className="flex h-[70vh] items-center justify-center bg-slate-50">
            <MessageBox
              p1="No Orders Yet"
              p2="Browse Services to Book"
              p3="You can view your order history here once you have made a booking."
              NavigateLink="/browse-services"
              btnName="Browse Services"
            />
          </div>
        ) : (
          <Orders userId={userId} />
        )}
      </div>
    </>
  );
};
export default OrderHistory;
